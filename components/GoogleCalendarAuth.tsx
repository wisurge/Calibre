'use client'

import { useGoogleCalendar } from '@/hooks/useGoogleCalendar'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { 
  Calendar, 
  RefreshCw, 
  LogOut, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  User,
  Clock
} from 'lucide-react'

export function GoogleCalendarAuth() {
  const { 
    user, 
    meetings,
    isLoading, 
    isCalendarConnected, 
    error,
    signInWithGoogle, 
    signOut,
    fetchCalendarEvents, 
    markAsPrepped 
  } = useGoogleCalendar()

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Connect Google Calendar
            </h2>
            <p className="text-gray-600 mb-4">
              Sync your calendar to automatically prepare for meetings
            </p>
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <Button 
            onClick={signInWithGoogle} 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Sign in with Google
              </>
            )}
          </Button>

          <div className="text-xs text-gray-500">
            We'll only access your calendar to help you prepare for meetings
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* User Info Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {user.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt={user.user_metadata.full_name || user.email}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {user.user_metadata?.full_name || user.email}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={fetchCalendarEvents} variant="outline" size="sm" disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </>
              )}
            </Button>
            
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center space-x-2 pt-2 border-t">
          <div className={`w-2 h-2 rounded-full ${isCalendarConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm font-medium">
            {isCalendarConnected ? 'Calendar connected' : 'Connection pending...'}
          </span>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Today's Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Today's Events ({meetings.length})
            </h4>
            {meetings.length > 0 && (
              <Button 
                onClick={fetchCalendarEvents} 
                variant="ghost" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Syncing...' : 'Sync Calendar'}
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-500">Fetching calendar events...</p>
            </div>
          ) : meetings.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <Calendar className="w-6 h-6 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No events scheduling for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {meetings.slice(0, 5).map((meeting, index) => (
                <div key={meeting.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{meeting.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">{meeting.title}</h5>
                        <p className="text-sm text-gray-600">{meeting.type}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!meeting.isPrepped ? (
                          <Button 
                            onClick={() => markAsPrepped(meeting.id)}
                            size="sm"
                            variant="outline"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Prepared
                          </Button>
                        ) : (
                          <div className="flex items-center space-x-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Prepared</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {meeting.participants.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {meetings.length > 5 && (
                <div className="text-center text-sm text-gray-500 pt-2">
                  And {meetings.length - 5} more events...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Calendar Integration Info */}
        <div className="border-t pt-4">
          <div className="text-xs text-gray-500 space-y-1">
            <p>📅 <strong>Calendar Integration:</strong> Real-time sync with Google Calendar</p>
            <p>🔄 <strong>Auto-refresh:</strong> Latest events fetched automatically</p>
            <p>🎯 <strong>Smart prep:</strong> Meeting types detected for preparation</p>
            <p>📋 <strong>Track progress:</strong> Mark meetings as prepared</p>
          </div>
        </div>
      </div>
    </Card>
  )
}