import { google } from 'googleapis'
import { MeetingData } from '@/types/calendar'

export interface GoogleCalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  attendees?: Array<{
    email: string
    displayName?: string
    responseStatus?: string
  }>
  organizer?: {
    email: string
    displayName?: string
  }
  location?: string
  meetingLink?: string
  htmlLink?: string
}

export interface CalendarSyncConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

export class GoogleCalendarService {
  private oauth2Client: any
  private calendar: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/calendar/auth`
    )
  }

  // Generate OAuth URL for user authorization
  generateAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar'
    ]

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    })
  }

  // Set credentials from tokens
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens)
    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
  }

  // Refresh access token if needed
  async refreshTokenIfNeeded(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth2Client.refreshAccessToken((err: any, tokens: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(tokens)
        }
      })
    })
  }

  // Fetch today's events
  async getTodaysEvents(): Promise<GoogleCalendarEvent[]> {
    if (!this.calendar) {
      throw new Error('Calendar not initialized. Please authenticate first.')
    }

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      })

      return response.data.items || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }

  // Fetch events for date range
  async getEventsForDateRange(startDate: Date, endDate: Date): Promise<GoogleCalendarEvent[]> {
    if (!this.calendar) {
      throw new Error('Calendar not initialized. Please authenticate first.')
    }

    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      })

      return response.data.items || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }

  // Convert Google Calendar Event to MeetingData format
  transformEventToMeetingData(event: GoogleCalendarEvent): MeetingData {
    const startTime = event.start?.dateTime || event.start?.date
    const time = startTime ? new Date(startTime).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }) : 'Unknown'

    // Extract participants
    const participants = event.attendees?.map(attendee => ({
      name: attendee.displayName || attendee.email.split('@')[0],
      role: 'Participant', // Default role, could be enhanced
      company: attendee.email.split('@')[1]?.split('.')[0] || 'Unknown'
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
    const checklist = this.generateChecklistForEventType(type, event)

    return {
      id: event.id,
      time,
      type,
      title: summary,
      participants,
      company: this.extractCompanyFromParticipants(participants),
      companyDescription: event.description || '',
      fundingStage: 'Unknown', // Would need additional API calls or manual input
      checklist,
      isPrepped: false,
      contributesToGoal: this.isGoalContribution(summary, type),
      agenda: this.extractAgenda(event),
      keyTopics: this.generateKeyTopics(summary, type),
      myQuestions: this.generateQuestions(type),
      preparationTime: this.calculatePrepTime(type),
      successCriteria: this.generateSuccessCriteria(type)
    }
  }

  private extractCompanyFromParticipants(participants: any[]): string {
    if (participants.length === 0) return 'Unknown'
    
    // Look for participants from known companies
    const companies = participants.map(p => p.company).filter(Boolean)
    return companies[0] || 'Unknown'
  }

  private isGoalContribution(summary: string, type: string): boolean {
    const goalKeywords = ['interview', 'technical', 'engineer', 'developer', 'coding', 'engineering']
    return goalKeywords.some(keyword => 
      summary.toLowerCase().includes(keyword) || 
      type.toLowerCase().includes(keyword)
    )
  }

  private generateChecklistForEventType(type: string, event: GoogleCalendarEvent): string[] {
    const baseChecklist = [
      'Review meeting agenda',
      'Check participant backgrounds',
      'Prepare relevant questions'
    ]

    const typeSpecificChecks = {
      'Technical Interview': [
        'Review company technical blog',
        ' Review recent funding announcements',
        'Prepare coding examples'
      ],
      'Intro Call': [
        'Research company mission',
        'Understand team structure',
        'Prepare elevator pitch'
      ],
      'Networking Coffee': [
        'Research mutual connections',
        'Prepare conversation topics',
        'Update LinkedIn profile'
      ]
    }

    return [...baseChecklist, ...(typeSpecificChecks[type as keyof typeof typeSpecificChecks] || [])]
  }

  private extractAgenda(event: GoogleCalendarEvent): string[] {
    const description = event.description || ''
    const agendaPattern = /agenda|topics|items|discussion|points/i
    if (agendaPattern.test(description)) {
      // Try to extract agenda items from description
      return description.split(/[•\-\*\n]/).map(item => item.trim()).filter(Boolean).slice(0, 5)
    }
    return ['General discussion', 'Q&A session', 'Next steps']
  }

  private generateKeyTopics(summary: string, type: string): string[] {
    const topics = {
      'Technical Interview': ['Technical Skills', 'System Design', 'Problem Solving'],
      'Intro Call': ['Background', 'Company Culture', 'Role Overview'],
      'Networking Coffee': ['Industry Trends', 'Career Development', 'Mutual Connections']
    }
    return topics[type as keyof typeof topics] || ['General discussion']
  }

  private generateQuestions(type: string): string[] {
    const questions = {
      'Technical Interview': [
        'What technical challenges are you currently facing?',
        'How does your engineering team collaborate?',
        'What does success look like in this role?'
      ],
      'Intro Call': [
        'Can you tell me about the team culture?',
        'What attracted you to this company?',
        'What are the growth opportunities?'
      ],
      'Networking Coffee': [
        'What trends are you seeing in the industry?',
        'How do you stay current with new technologies?',
        'Any advice for someone looking to grow in this field?'
      ]
    }
    return questions[type as keyof typeof questions] || ['How can I contribute to your success?']
  }

  private calculatePrepTime(type: string): string {
    const prepTimes = {
      'Technical Interview': '60 minutes',
      'Intro Call': '30 minutes',
      'Networking Coffee': '15 minutes'
    }
    return prepTimes[type as keyof typeof prepTimes] || '30 minutes'
  }

  private generateSuccessCriteria(type: string): string[] {
    const criteria = {
      'Technical Interview': [
        'Demonstrate technical competence',
        'Ask insightful questions',
        'Show cultural fit'
      ],
      'Intro Call': [
        'Build rapport with recruiter',
        'Understand the role clearly',
        'Express genuine interest'
      ],
      'Networking Coffee': [
        'Make genuine connection',
        'Learn about the industry',
        'Exchange valuable insights'
      ]
    }
    return criteria[type as keyof typeof criteria] || ['Have meaningful conversation']
  }
}

// Utility functions for token management
export const calendarTokenManager = {
  // Store tokens in localStorage (consider using more secure storage in production)
  setTokens(tokens: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('google_calendar_tokens', JSON.stringify(tokens))
    }
  },

  getTokens() {
    if (typeof window !== 'undefined') {
      const tokens = localStorage.getItem('google_calendar_tokens')
      return tokens ? JSON.parse(tokens) : null
    }
    return null
  },

  clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('google_calendar_tokens')
    }
  },

  // Check if tokens are expired (expires_in gives seconds, add expired timestamp)
  isTokenExpired(tokens: any) {
    if (!tokens.expiry_date) return false
    return Date.now() >= tokens.expiry_date
  }
}

export const googleCalendarService = new GoogleCalendarService()






