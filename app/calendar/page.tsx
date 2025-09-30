'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Calendar } from '@/components/molecules/Calendar'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Bell, Clock, CheckCircle, Circle, Loader2 } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { trackPageView } from '@/lib/analytics'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouteTransition } from '@/components/RouteTransition'

// Memoized Calendar Content Component
const CalendarContent = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  
  // Track page view
  useEffect(() => {
    trackPageView('calendar', 'main')
  }, [])

  // Memoized events calculation
  const events = useMemo(() => {
    const day = selectedDate.getDate()
    const eventsList = []
    
    if (day % 3 === 0) {
      eventsList.push({
        id: 1,
        title: 'Morning Workout',
        time: '7:00 AM',
        completed: day % 6 === 0
      })
    }
    if (day % 4 === 0) {
      eventsList.push({
        id: 2,
        title: 'Team Meeting',
        time: '2:00 PM',
        completed: false
      })
    }
    if (day % 5 === 0) {
      eventsList.push({
        id: 3,
        title: 'Journal Entry',
        time: '8:00 PM',
        completed: day % 10 === 0
      })
    }
    
    return eventsList
  }, [selectedDate])
  
  const formatSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [selectedDate])

  return (
    <ProtectedRoute>
      <div className="min-h-screen theme-background relative">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold theme-text mb-4">
                    Calendar View
                  </h1>
                  <p className="text-lg theme-text-secondary">
                    Schedule and track your daily activities
                  </p>
                </div>

                {/* Main Calendar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendar Component */}
                  <div className="lg:col-span-2">
                    <Calendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                    />
                  </div>

                  {/* Events Panel */}
                  <div className="space-y-6">
                    {/* Selected Date Info */}
                    <Card className="theme-surface rounded-2xl shadow-sm border-0 p-6">
                      <h3 className="text-lg font-semibold theme-text mb-3">
                        {formatSelectedDate}
                      </h3>
                      <div className="text-sm theme-text-secondary">
                        {events.length > 0 
                          ? `${events.length} event${events.length === 1 ? '' : 's'} scheduled`
                          : 'No events scheduled for this date'
                        }
                      </div>
                    </Card>

                    {/* Events List */}
                    <Card className="theme-surface rounded-2xl shadow-sm border-0 p-6">
                      <h4 className="text-lg font-semibold theme-text mb-4">
                        Today's Events
                      </h4>
                      {events.length > 0 ? (
                        <div className="space-y-3">
                          {events.map((event) => (
                            <div
                              key={event.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                event.completed
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-theme-accent'
                              }`}
                            >
                              <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                                event.completed ? 'bg-green-500' : 'bg-theme-secondary'
                              }`}>
                                {event.completed ? (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                ) : (
                                  <Circle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                  event.completed ? 'line-through theme-text-secondary' : 'theme-text'
                                }`}>
                                  {event.title}
                                </p>
                                <p className="text-xs theme-text-secondary flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                   <span>{event.time}</span>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Bell className="w-12 h-12 theme-text-secondary mx-auto mb-3 opacity-50" />
                          <p className="text-sm theme-text-secondary">
                            No events scheduled
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3"
                          >
                            Add Event
                          </Button>
                        </div>
                      )}
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-theme-accent rounded-2xl shadow-sm border-0 p-6">
                      <h4 className="text-lg font-semibold theme-text mb-4">
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedDate(new Date())}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Go to Today
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark All Complete
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Circle className="w-4 h-4 mr-2" />
                          Add New Event
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
})

CalendarContent.displayName = 'CalendarContent'

// Loading component
const CalendarLoading = () => (
  <div className="min-h-screen theme-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="w-8 h-8 theme-primary animate-spin mx-auto" />
      <p className="text-sm theme-text-secondary">Loading calendar...</p>
    </div>
  </div>
)

// Main Calendar Page Component
export default function CalendarPage() {
  const theme = useThemeStyles()
  
  return (
    <Suspense fallback={<CalendarLoading />}>
      <CalendarContent />
    </Suspense>
  )
}


