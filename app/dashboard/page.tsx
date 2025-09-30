'use client'

import React, { useState, useEffect, memo, useMemo, useCallback, Suspense } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useLocalCalendar } from '@/hooks/useLocalCalendar'
import { GoogleCalendarAuth } from '@/components/GoogleCalendarAuth'
import { 
  Clock, 
  Users, 
  Building2, 
  Calendar as CalendarIcon, 
  Filter, 
  Plus, 
  CheckCircle, 
  Circle,
  Coffee,
  Briefcase,
  UserCheck,
  Star,
  Target,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { trackPageView } from '@/lib/analytics'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'

interface MeetingParticipantLocal {
  name: string
  role: string
  company: string
}

interface MeetingDataLocal {
  id: string
  time: string
  type: string
  title: string
  participants: MeetingParticipantLocal[]
  company: string
  companyDescription: string
  fundingStage?: string
  checklist: string[]
  isPrepped: boolean
  contributesToGoal?: boolean
  agenda?: string[]
  keyTopics?: string[]
  myQuestions?: string[]
  companyNews?: string[]
  linkedinInsights?: string[]
  competitorInfo?: string
  roleExpectations?: string
  technicalFocus?: string[]
  preparationTime?: string
  successCriteria?: string[]
  followUpActions?: string[]
}

const mockMeetings: MeetingDataLocal[] = [
  {
    id: '1',
    time: '09:30',
    type: 'Intro Call',
    title: 'Introduction with Ashby Talent Team',
    participants: [
      { name: 'Jane Doe', role: 'Recruiter', company: 'Ashby' },
      { name: 'Mike Chen', role: 'Head of Engineering', company: 'Ashby' }
    ],
    company: 'Ashby',
    companyDescription: 'Modern recruiting platform solving talent acquisition challenges',
    fundingStage: 'Series B',
    checklist: [
      'Review Ashby\'s recent funding announcement',
      'Check Jane\'s LinkedIn for background',
      'Prepare questions about technical challenges',
      'Research Ashby\'s product roadmap'
    ],
    isPrepped: false,
    contributesToGoal: true
  },
  {
    id: '2',
    time: '14:00',
    type: 'Technical Interview',
    title: 'Engineering Leadership Assessment',
    participants: [
      { name: 'Mike Lee', role: 'Engineering Lead', company: 'Maze' },
      { name: 'Sarah Wilson', role: 'CTO', company: 'Maze' }
    ],
    company: 'Maze',
    companyDescription: 'User research and feedback platform for product teams',
    fundingStage: 'Series A',
    checklist: [
      'Review Maze\'s technical blog posts',
      'Practice system design problem',
      'Prepare leadership stories',
      'Research Sarah\'s background'
    ],
    isPrepped: false,
    contributesToGoal: true
  },
  {
    id: '3',
    time: '16:00',
    type: 'Networking Coffee',
    title: 'Founder Introduction',
    participants: [
      { name: 'Sarah Khan', role: 'Founder & CEO', company: 'StartupX' }
    ],
    company: 'StartupX',
    companyDescription: 'Early-stage marketplace platform',
    fundingStage: 'Seed',
    checklist: [
      'Review StartupX\'s mission and product',
      'Check Sarah\'s founder story',
      'Prepare networking conversation topics',
      'Research marketplace industry trends'
    ],
    isPrepped: false,
    contributesToGoal: false
  }
]

// Memoized Dashboard Content Component
const DashboardContent = React.memo(() => {
  const { user } = useAuth()
  const currentTheme = useThemeStyles()
  
  // Local Calendar integration
  const { 
    user: googleUser,
    meetings: calendarMeetings, 
    isLoading: calendarLoading,
    isCalendarConnected,
    error: calendarError,
    refreshCalendarData,
    markAsPrepped: calendarMarkPrepped,
    toggleChecklistItem: calendarToggleChecklist
  } = useLocalCalendar()
  
  const [meetings, setMeetings] = useState<MeetingDataLocal[]>(mockMeetings)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedChecklists, setSelectedChecklists] = useState<Set<string>>(new Set())
  const [activeMeetingIndex, setActiveMeetingIndex] = useState(0)
  const [isUsingRealCalendar, setIsUsingRealCalendar] = useState(false)
  
  // Track page view
  React.useEffect(() => {
    trackPageView('dashboard', 'meeting_prep')
  }, [])
  
  // Handle calendar data updates
  useEffect(() => {
    if (calendarMeetings.length > 0 && isCalendarConnected) {
      setMeetings(calendarMeetings as MeetingDataLocal[])
      setIsUsingRealCalendar(true)
    } else if (isCalendarConnected && calendarMeetings.length === 0) {
      // Calendar connected but no meetings today - show empty state
      setMeetings([])
      setIsUsingRealCalendar(true)
    }
  }, [calendarMeetings, isCalendarConnected])
  
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Darden'
  const today = new Date()
  
  const filteredMeetings = useMemo(() => {
    return meetings.filter(meeting => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'interviews') return meeting.type.toLowerCase().includes('interview')
      if (activeFilter === 'intros') return meeting.type.toLowerCase().includes('intro')
      if (activeFilter === 'networking') return meeting.type.toLowerCase().includes('networking')
      if (activeFilter === 'personal') return !meeting.contributesToGoal
      return meeting.type.toLowerCase().includes(activeFilter)
    })
  }, [meetings, activeFilter])

  // Reset to first meeting when filter changes
  React.useEffect(() => {
    setActiveMeetingIndex(0)
  }, [activeFilter])

  const currentMeeting = filteredMeetings[activeMeetingIndex]
  const hasNextMeeting = activeMeetingIndex < filteredMeetings.length - 1
  const hasPrevMeeting = activeMeetingIndex > 0

  const nextMeeting = () => {
    if (hasNextMeeting) {
      setActiveMeetingIndex(prev => prev + 1)
    }
  }

  const prevMeeting = () => {
    if (hasPrevMeeting) {
      setActiveMeetingIndex(prev => prev - 1)
    }
  }

  const meetingStats = useMemo(() => ({
    total: meetings.length,
    prepTime: meetings.length > 0 ? '3h 30m' : '0m',
    biggestMeeting: meetings.length > 0 
      ? meetings.reduce((max, meeting) => 
          meeting.participants.length > max.participants.length ? meeting : max
        )
      : { title: 'None scheduled', participants: [] }
  }), [meetings])

  const allParticipants = useMemo(() => meetings.flatMap(m => m.participants), [meetings])
  const uniqueCompanies = useMemo(() => Array.from(new Set(meetings.map(m => m.company))), [meetings])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const markAsPrepped = useCallback((meetingId: string) => {
    if (isUsingRealCalendar && calendarMarkPrepped) {
      calendarMarkPrepped(meetingId)
    } else {
      setMeetings(prev => prev.map(meeting => 
        meeting.id === meetingId 
          ? { ...meeting, isPrepped: true }
          : meeting
      ))
    }
  }, [isUsingRealCalendar, calendarMarkPrepped])

  const toggleChecklistItem = useCallback((meetingId: string, itemIndex: number) => {
    if (isUsingRealCalendar && calendarToggleChecklist) {
      calendarToggleChecklist(meetingId, itemIndex)
    } else {
      const key = `${meetingId}-${itemIndex}`
      setSelectedChecklists(prev => {
        const newSet = new Set(prev)
        if (newSet.has(key)) {
          newSet.delete(key)
        } else {
          newSet.add(key)
        }
        return newSet
      })
    }
  }, [isUsingRealCalendar, calendarToggleChecklist])

  const getTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('interview')) return <UserCheck className="w-4 h-4" />
    if (type.toLowerCase().includes('networking')) return <Coffee className="w-4 h-4" />
    if (type.toLowerCase().includes('intro')) return <Briefcase className="w-4 h-4" />
    return <CalendarIcon className="w-4 h-4" />
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative" style={{ backgroundColor: currentTheme.colors.background }}>
        <Header />
        <div className="flex">
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 px-6 py-4 relative">
            {/* Top Bar */}
            <div className="mb-6">
              <div 
                className="rounded-xl p-4 shadow-sm"
                style={{ 
                  backgroundColor: currentTheme.colors.surface,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 
                      className="text-xl font-semibold mb-1"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {getGreeting()}, {userName} — here's what's on your plate today.
                    </h1>
                    <p 
                      className="text-sm"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      {today.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-4 text-sm"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{meetingStats.total} meetings today</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{meetingStats.prepTime} prep time</span>
                    </div>
                    {meetingStats.total > 0 && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>Biggest: {meetingStats.biggestMeeting.title}</span>
                      </div>
                     )}
                  </div>
                </div>
              </div>

              {/* Calendar Status Bar */}
              <div 
                className="mt-4 p-4 rounded-xl"
                style={{ 
                  backgroundColor: isCalendarConnected ? currentTheme.colors.secondary : currentTheme.colors.accent,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    ></div>
                    <div>
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {isCalendarConnected ? 'Google Calendar Connected' : 'Calendar Status'}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {isCalendarConnected 
                          ? `${isUsingRealCalendar ? 'Live calendar data' : 'Mock data'} • ${googleUser?.email || 'User'}`
                          : 'Connect to sync real calendar data'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={refreshCalendarData}
                      disabled={calendarLoading}
                      variant="outline"
                      size="sm"
                      style={{ 
                        color: currentTheme.colors.primary,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      {calendarLoading ? 'Syncing...' : 'Refresh'}
                    </Button>
                    
                    {!isCalendarConnected ? (
                      <Button 
                        onClick={() => window.location.href = '/api/calendar/auth'}
                        variant="outline"
                        size="sm"
                        className="theme-text hover:theme-primary hover:border-theme-primary"
                      >
                        Connect Calendar
                      </Button>
                    ) : (
                      <span className="text-sm text-green-600">✅ Connected</span>
                    )}
                  </div>
                </div>

                {calendarError && (
                  <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{calendarError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* Left Sidebar */}
              <div className="col-span-3 space-y-3">
                <Card className="p-3">
                  <div className="space-y-3">
                    {/* Time Toggle */}
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="sm" className="flex-1">Today</Button>
                      <Button variant="ghost" size="sm" className="flex-1">Week</Button>
                    </div>
                    
                    {/* Filters */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium" style={{ color: currentTheme.colors.textSecondary }}>Filter</h3>
                      <div className="space-y-1">
                        {['All', 'Interviews', 'Intros', 'Networking', 'Personal'].map((filter) => (
                          <Button
                            key={filter}
                            variant={activeFilter === filter.toLowerCase() ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveFilter(filter.toLowerCase())}
                            className="w-full justify-start"
                          >
                            {filter}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Add Notes */}
                    <Button variant="outline" size="sm" className="w-full flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Notes</span>
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Main Section - Card Flip Horizontal */}
              <div className="col-span-6">
                {filteredMeetings.length === 0 ? (
                  <Card className="p-8 text-center min-h-[500px] flex flex-col items-center justify-center">
                    <CalendarIcon className="w-16 h-16 mb-4" style={{ color: currentTheme.colors.textSecondary }} />
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: currentTheme.colors.text }}
                    >
                      No meetings scheduled today
                    </h3>
                    <p 
                      className="mb-6 max-w-md"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      You have a free day ahead! Time to work on personal projects or take a well-deserved break.
                    </p>
                  </Card>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 
                        className="text-lg font-semibold"
                        style={{ color: currentTheme.colors.text }}
                      >
                        Meeting Focus
                      </h2>
                      
                      {/* Meeting Navigation Controls */}
                      <div className="flex items-center space-x-4">
                        {/* Progress Indicator */}
                        <div className="flex items-center space-x-2">
                          <span 
                            className="text-sm"
                            style={{ color: currentTheme.colors.textSecondary }}
                          >
                            {activeMeetingIndex + 1} of {filteredMeetings.length}
                          </span>
                          <div className="flex space-x-1">
                            {filteredMeetings.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === activeMeetingIndex ? '' : 'opacity-30'
                                }`}
                                style={{
                                  backgroundColor: index === activeMeetingIndex 
                                    ? currentTheme.colors.primary 
                                    : currentTheme.colors.textSecondary
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={prevMeeting}
                            disabled={!hasPrevMeeting}
                            className="px-3"
                          >
                            ← Prev
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={nextMeeting}
                            disabled={!hasNextMeeting}
                            className="px-3"
                          >
                            Next →
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Current Meeting Card */}
                    {currentMeeting && (
                      <div 
                        className="p-8 transition-all duration-300 hover:shadow-lg min-h-[500px] flex flex-col border-l-4 rounded-xl shadow-sm"
                        style={{
                          borderLeftColor: currentMeeting.isPrepped ? currentTheme.colors.primary : currentTheme.colors.accent,
                          backgroundColor: currentMeeting.isPrepped ? currentTheme.colors.secondary : currentTheme.colors.surface,
                          border: `1px solid ${currentTheme.colors.border}`
                        }}
                      >
                        {/* Meeting Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="p-3 rounded-xl"
                              style={{ backgroundColor: currentTheme.colors.accent }}
                            >
                              {getTypeIcon(currentMeeting.type)}
                            </div>
                            <div>
                              <h2 
                                className="text-xl font-semibold"
                                style={{ color: currentTheme.colors.text }}
                              >
                                {currentMeeting.title}
                              </h2>
                              <p style={{ color: currentTheme.colors.textSecondary }}>
                                {currentMeeting.time} • {currentMeeting.type}
                              </p>
                            </div>
                          </div>
                </div>

                        {/* Pre-Meeting Action Items */}
                        <div className="mb-8 flex-grow">
                          <h4 
                            className="text-lg font-semibold mb-3"
                            style={{ color: currentTheme.colors.text }}
                          >
                            Pre-Meeting Action Items
                          </h4>
                          <div className="space-y-3">
                            {currentMeeting.checklist.map((item, index) => {
                              const key = `${currentMeeting.id}-${index}`
                              const isChecked = selectedChecklists.has(key)
                              return (
                                <label key={index} className="flex items-start space-x-4 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleChecklistItem(currentMeeting.id, index)}
                                    className="mt-1 w-5 h-5 rounded border-2 focus:ring-2"
                                    style={{
                                      borderColor: currentTheme.colors.border,
                                      backgroundColor: currentTheme.colors.accent }}
                                  />
                                  <span 
                                    className={`text-base leading-relaxed group-hover:opacity-80 transition-opacity ${
                                      isChecked ? 'opacity-60 line-through' : ''
                                    }`}
                                    style={{ color: currentTheme.colors.text }}
                                  >
                                    {item}
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto pt-6">
                          {!currentMeeting.isPrepped ? (
                            <Button 
                              onClick={() => markAsPrepped(currentMeeting.id)}
                              className="w-full py-4 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
                              style={{
                                backgroundColor: currentTheme.colors.primary,
                                color: 'white'
                              }}
                            >
                              <CheckCircle className="w-6 h-6 mr-3" />
                              I'm Ready for This Meeting! ✅
                            </Button>
                          ) : (
                            <div 
                              className="flex items-center justify-center space-x-3 font-semibold text-lg py-4 rounded-xl"
                              style={{ 
                                color: currentTheme.colors.primary,
                                backgroundColor: currentTheme.colors.accent
                              }}
                            >
                              <CheckCircle className="w-6 h-6" />
                              <span>You're completely prepped! 🚀</span>
                            </div>
                          )}
                        </div>
                        </div>
                    )}

                    {/* Quick Meeting Timeline (Minimal) - Only show if there are meetings */}
                    {filteredMeetings.length > 0 && (
                      <Card 
                        className="mt-4 p-4"
                        style={{ backgroundColor: currentTheme.colors.accent }}
                      >
                        <h4 
                          className="text-sm font-medium mb-3"
                          style={{ color: currentTheme.colors.text }}
                        >
                          Today's Schedule
                        </h4>
                        <div className="flex space-x-2 overflow-x-auto">
                          {filteredMeetings.map((meeting) => (
                            <button
                              key={meeting.id}
                              onClick={() => setActiveMeetingIndex(filteredMeetings.findIndex(m => m.id === meeting.id))}
                              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                filteredMeetings.findIndex(m => m.id === meeting.id) === activeMeetingIndex
                                  ? 'shadow-md'
                                  : 'hover:opacity-80'
                              } ${meeting.isPrepped ? 'ring-2' : ''}`}
                              style={{
                                backgroundColor: filteredMeetings.findIndex(m => m.id === meeting.id) === activeMeetingIndex 
                                  ? currentTheme.colors.primary 
                                  : currentTheme.colors.surface,
                                color: filteredMeetings.findIndex(m => m.id === meeting.id) === activeMeetingIndex 
                                  ? 'white' 
                                  : currentTheme.colors.textSecondary,
                                ...(meeting.isPrepped && {
                                  boxShadow: `0 0 0 2px ${currentTheme.colors.accent}`
                                })
                              }}
                            >
                              <div className="text-center">
                                <div className="font-medium">{meeting.time}</div>
                                <div className="text-xs opacity-75">{meeting.type}</div>
                                {meeting.isPrepped && <div className="text-xs">✅</div>}
                      </div>
                            </button>
                          ))}
                        </div>
                      </Card>
                    )}
                  </>
                )}
                      </div>

              {/* Right Sidebar */}
              <div className="col-span-3 space-y-4">
                
                {/* People You're Meeting */}
                <Card className="p-3">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
                    People Today
                  </h3>
                  {allParticipants.length > 0 ? (
                    <div className="space-y-3">
                      {allParticipants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentTheme.colors.accent }}
                          >
                            <span 
                              className="text-sm font-medium"
                              style={{ color: currentTheme.colors.primary }}
                            >
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                          <div>
                            <p className="font-medium" style={{ color: currentTheme.colors.text }}>
                              {participant.name}
                            </p>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                              {participant.role}
                            </p>
                      </div>
                    </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users className="w-12 h-12 mx-auto mb-3" style={{ color: currentTheme.colors.textSecondary }} />
                      <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                        No meetings scheduled
                      </p>
                    </div>
                  )}
                  </Card>

                {/* Companies */}
                <Card className="p-3">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
                    Companies
                  </h3>
                  {uniqueCompanies.length > 0 ? (
                    <div className="space-y-3">
                      {uniqueCompanies.map((company) => {
                        const meeting = meetings.find(m => m.company === company)
                        return (
                          <div key={company} className="flex items-center space-x-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: currentTheme.colors.accent }}
                            >
                              <Building2 
                                className="w-4 h-4" 
                                style={{ color: currentTheme.colors.primary }}
                              />
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: currentTheme.colors.text }}>
                                {company}
                              </p>
                              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                                {meeting?.fundingStage}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Building2 className="w-12 h-12 mx-auto mb-3" style={{ color: currentTheme.colors.textSecondary }} />
                      <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                        No companies scheduled
                      </p>
                    </div>
                  )}
                  </Card>

                {/* Smart Suggestions */}
                <Card 
                  className="p-3"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary,
                    border: `1px solid ${currentTheme.colors.border}`
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <Target 
                      className="w-5 h-5 mt-1" 
                      style={{ color: currentTheme.colors.primary }}
                    />
                    <div>
                      <h3 
                        className="font-semibold mb-2"
                        style={{ color: currentTheme.colors.text }}
                      >
                        Smart Suggestions
                      </h3>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        Research shows mentioning your MVP work resonates well with Series A companies. 
                        Your experience with scalability challenges will be highly relevant.
                      </p>
                      <div 
                        className="space-y-2 text-xs"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        <div>• Prepare LinkedIn connection requests</div>
                        <div>• Review recent company funding rounds</div>
                        <div>• Bring examples of technical leadership</div>
                </div>
              </div>
                  </div>
                </Card>
              </div>

              {/* Bottom Section - Personal Goal Alignment */}
              <Card 
                className="p-4 col-span-12 mt-6"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${currentTheme.colors.secondary}, ${currentTheme.colors.accent})`,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                <div className="flex items-start space-x-4">
                  <Target 
                    className="w-6 h-6 mt-1" 
                    style={{ color: currentTheme.colors.primary }}
                  />
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: currentTheme.colors.text }}
                    >
                      Personal Career Goal
                    </h3>
                    <p 
                      className="mb-4"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      "Land founding engineer role in 3 months"
                    </p>
                    
                    <div className="space-y-2">
                      <h4 
                        className="font-medium"
                        style={{ color: currentTheme.colors.text }}
                      >
                        Today's Contributing Meetings:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {meetings.filter(m => m.contributesToGoal).map((meeting, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 text-sm rounded-full"
                            style={{ 
                              backgroundColor: currentTheme.colors.primary,
                              color: 'white'
                            }}
                          >
                            {meeting.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
})

DashboardContent.displayName = 'DashboardContent'

// Loading component
const DashboardLoading = () => (
  <div className="min-h-screen theme-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="w-8 h-8 theme-primary animate-spin mx-auto" />
      <p className="text-sm theme-text-secondary">Loading dashboard...</p>
    </div>
  </div>
)

// Main Dashboard Page Component
export default function Dashboard() {
  const theme = useThemeStyles()
  
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}