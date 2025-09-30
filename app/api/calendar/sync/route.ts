import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    // Get tokens from cookies
    const cookieStore = cookies()
    const accessToken = cookieStore.get('google_access_token')?.value
    const refreshToken = cookieStore.get('google_refresh_token')?.value
    const userInfo = cookieStore.get('google_user_info')?.value

    if (!accessToken) {
      console.log('❌ No valid Google access token')
      return NextResponse.json({ error: 'No valid Google token' }, { status: 401 })
    }

    // Set up Google OAuth client
    const auth = new google.auth.OAuth2()
    auth.setCredentials({ 
      access_token: accessToken,
      refresh_token: refreshToken 
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Get today's events
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []
    
    // Filter out all-day events and personal events
    const filteredEvents = events.filter(event => {
      return event.start?.dateTime && 
             !event.summary?.toLowerCase().includes('busy') &&
             !event.summary?.toLowerCase().includes('out of office') &&
             !event.summary?.toLowerCase().includes('free')
    })

    // Transform events to meeting format
    const meetingData = filteredEvents.map(event => {
      const startTime = event.start?.dateTime || event.start?.date
      const time = startTime ? new Date(startTime).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }) : 'Unknown'

      // Extract participants
      const participants = event.attendees?.map(attendee => ({
        name: attendee.displayName || attendee.email?.split('@')[0] || 'Unknown',
        role: 'Participant',
        company: attendee.email?.split('@')[1]?.split('.')[0] || 'Unknown'
      })) || []

      // Determine meeting type based on summary
      const summary = event.summary || 'Untitled Event'
      let type = 'General Meeting'
      if (summary.toLowerCase().includes('interview')) {
        type = 'Technical Interview'
      } else if (summary.toLowerCase().includes('intro')) {
        type = 'Intro Call'
      } else if (summary.toLowerCase().includes('networking') || summary.toLowerCase().includes('coffee')) {
        type = 'Networking Coffee'
      }

      // Generate checklist items based on event type
      const checklist = generateChecklistForEventType(type, event)

      return {
        id: event.id,
        time,
        type,
        title: summary,
        participants,
        company: extractCompanyFromParticipants(participants),
        companyDescription: event.description || '',
        fundingStage: 'Unknown',
        checklist,
        isPrepped: false,
        contributesToGoal: summary.toLowerCase().includes('interview') || summary.toLowerCase().includes('technical'),
        agenda: ['General discussion', 'Q&A session', 'Next steps'],
        keyTopics: ['General discussion'],
        myQuestions: ['How can I contribute to your success?'],
        preparationTime: type === 'Technical Interview' ? '60 minutes' : '30 minutes',
        successCriteria: ['Have meaningful conversation', 'Build relationship'],
        followUpActions: ['Follow up appropriately', 'Maintain connection']
      }
    })

    console.log(`📅 Fetched ${meetingData.length} calendar events`)
    
    // Parse user info from cookie
    let parsedUserInfo: any = {}
    try {
      parsedUserInfo = userInfo ? JSON.parse(userInfo) : {}
    } catch (e) {
      console.warn('Failed to parse user info from cookie')
    }

    return NextResponse.json({ 
      success: true, 
      events: meetingData,
      count: filteredEvents.length,
      user: {
        email: parsedUserInfo.email || 'Unknown',
        name: parsedUserInfo.name || parsedUserInfo.email || 'Unknown'
      }
    })

  } catch (error: any) {
    console.error('❌ Calendar sync error:', error)
    
    if (error.message.includes('Invalid Credentials')) {
      return NextResponse.json({ error: 'ACCESS_TOKEN_EXPIRED' }, { status: 401 })
    }
    
    if (error.message.includes('Quota Exceeded')) {
      return NextResponse.json({ error: 'QUOTA_EXCEEDED' }, { status: 429 })
    }
    
    return NextResponse.json({ error: error.message || 'Failed to fetch calendar' }, { status: 500 })
  }
}

function extractCompanyFromParticipants(participants: Array<{company: string}>): string {
  if (participants.length === 0) return 'Unknown'
  const companies = participants.map(p => p.company).filter(Boolean)
  return companies[0] || 'Unknown'
}

function generateChecklistForEventType(type: string, event: any): string[] {
  const baseChecklist = [
    'Review meeting agenda',
    'Check participant backgrounds',
    'Prepare relevant questions'
  ]

  const typeSpecificChecks = {
    'Technical Interview': [
      'Review company technical blog',
      'Review recent funding announcements',
      'Prepare coding examples',
      'Practice system design problems'
    ],
    'Intro Call': [
      'Research company mission',
      'Understand team structure',
      'Prepare elevator pitch',
      'Review recruiter background'
    ],
    'Networking Coffee': [
      'Research mutual connections',
      'Prepare conversation topics',
      'Update LinkedIn profile',
      'Review industry trends'
    ]
  }

  return [...baseChecklist, ...(typeSpecificChecks[type as keyof typeof typeSpecificChecks] || [])]
}