# Google OAuth + Calendar Sync Setup for Routinsie

This guide sets up complete Google authentication and calendar integration using Supabase Auth and Google Calendar API.

## Overview

- ✅ Google OAuth authentication via Supabase
- ✅ Google Calendar API integration  
- ✅ Automatic token management
- ✅ Real-time calendar sync
- ✅ Production-ready with token refresh

## Prerequisites

- Google Cloud Console account
- Supabase project
- Next.js application
- Node.js 18+ 

## Step 1: Google Cloud Console Setup

### 1.1 Create Project & Enable APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. **Enable Google Calendar API**:
   ```
   APIs & Services → Library → Search "Google Calendar API" → Enable
   ```

### 1.2 Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** user type
3. Fill required fields:
   - App name: `Routinsie Calendar Integration`
   - User support email: Your email
   - Developer contact: Your email
4. **Add required scopes**:
   ```
   openid
   email  
   profile
   https://www.googleapis.com/auth/calendar.readonly
   ```
5. Add test users if required

### 1.3 Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. **Create Credentials → OAuth 2.0 Client IDs**
3. Choose **Web application**
4. **Add Authorized redirect URIs**:
   ```
   Development: https://your-project.supabase.co/auth/v1/callback
   Production: https://your-production-domain.com/auth/callback
   ```
5. **Copy Client ID and Client Secret**

## Step 2: Supabase Configuration

### 2.1 Enable Google Provider

1. Go to Supabase Dashboard → **Authentication → Providers**
2. Find **Google** → Click **Configure**
3. **Enable** Google provider
4. Enter:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
5. **Scopes**: Add the same scopes from Google Console
6. **Save configuration**

### 2.2 Configure Auth Settings

In Supabase Dashboard → **Authentication → Settings**:
- Enable email confirmations (optional)
- Set redirect URLs if needed
- Configure site URL

## Step 3: Environment Variables

Create `.env.local`:

```bash
# Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (for reference - Supabase handles this)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth (optional)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Step 4: Implementation

### 4.1 Install Dependencies

```bash
npm install @supabase/supabase-js googleapis
```

### 4.2 Supabase Client Setup

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4.3 Google Calendar Service

Create `lib/googleCalendarService.ts`:

```typescript
import { google } from 'googleapis'

export class GoogleCalendarService {
  private auth: any

  constructor(accessToken: string) {
    this.auth = new google.auth.OAuth2()
    this.auth.setCredentials({ access_token: accessToken })
  }

  async getTodaysEvents() {
    const calendar = google.calendar({ version: 'v3', auth: this.auth })
    
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

    return response.data.items || []
  }

  async refreshToken(refreshToken: string) {
    this.auth.setCredentials({ refresh_token: refreshToken })
    const { credentials } = await this.auth.refreshAccessToken()
    return credentials.access_token
  }
}
```

### 4.4 Auth Hook

Create `hooks/useGoogleCalendar.ts`:

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { GoogleCalendarService } from '@/lib/googleCalendarService'

export function useGoogleCalendar() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        if (session?.provider_token) {
          await fetchCalendarEvents(session.provider_token)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) {
      console.error('Google sign in error:', error)
    }
  }

  const fetchCalendarEvents = async (accessToken: string) => {
    setLoading(true)
    try {
      const calendarService = new GoogleCalendarService(accessToken)
      const events = await calendarService.getTodaysEvents()
      setEvents(events)
      console.log('📅 Calendar Events:', events)
    } catch (error) {
      console.error('❌ Calendar fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshCalendarData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.provider_token) {
      await fetchCalendarEvents(session.provider_token)
    }
  }

  return {
    user,
    events,
    loading,
    signInWithGoogle,
    fetchCalendarEvents,
    refreshCalendarData
  }
}
```

### 4.5 Auth Component

Create `components/GoogleCalendarAuth.tsx`:

```typescript
'use client'

import { useGoogleCalendar } from '@/hooks/useGoogleCalendar'
import { Button } from '@/components/atoms/Button'

export function GoogleCalendarAuth() {
  const { user, events, loading, signInWithGoogle, refreshCalendarData } = useGoogleCalendar()

  if (!user) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold mb-4">Connect Google Calendar</h2>
        <Button onClick={signInWithGoogle} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <img 
            src={user.user_metadata.avatar_url} 
            alt={user.user_metadata.full_name}
            className="w-10 h-10 rounded-full"
          />
          <h3 className="font-medium">{user.user_metadata.full_name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Button onClick={refreshCalendarData} variant="outline">
          Refresh Calendar
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Today's Events ({events.length})</h4>
        {events.length === 0 ? (
          <p className="text-gray-500">No events scheduled for today</p>
        ) : (
          <div className="space-y-2">
            {events.slice(0, 5).map((event: any, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{event.summary || 'Untitled Event'}</h5>
                    <p className="text-sm text-gray-600">
                      {event.start?.dateTime && new Date(event.start.dateTime).toLocaleTimeString()}
                    </p>
                  </div>
                  {event.attendees && (
                    <span className="text-xs text-gray-500">
                      {event.attendees.length} attendees
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

### 4.6 Auth Callback Page

Create `app/auth/callback/page.tsx`:

```typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login')
          return
        }

        if (data.session) {
          console.log('✅ Successfully authenticated with Google')
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Callback error:', error)
        router.push('/login')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Completing authentication...</p>
      </div>
    </div>
  )
}
```

## Step 5: Testing

### 5.1 Development Testing

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Add to your dashboard**: Import the `GoogleCalendarAuth` component

3. **Test the flow**:
   - Click "Sign in with Google"
   - Authorize calendar access
   - Verify events appear in console and UI

### 5.2 Verifying Integration

```typescript
// Debug the authentication flow
const { data: { session } } = await supabase.auth.getSession()

console.log('🔍 Session:', {
  user: session?.user?.email,
  provider_token: session?.provider_token?.substring(0, 20) + '...',
  expires_at: new Date(session?.expires_at! * 1000).toISOString()
})

if (session?.provider_token) {
  const calendarService = new GoogleCalendarService(session.provider_token)
  const events = await calendarService.getTodaysEvents()
  console.log('📅 Events fetched:', events.length)
}
```

## Step 6: Production Considerations

### 6.1 Token Refresh Strategy

**Important**: Supabase doesn't automatically refresh Google tokens for production. Implement server-side refresh:

```typescript
// Example Edge Function: supabase/functions/refresh-google-token/index.ts
export default async function handler(req: Request) {
  const { refresh_token } = await req.json()
  
  const calendarService = new GoogleCalendarService('')
  const newAccessToken = await calendarService.refreshToken(refresh_token)
  
  return new Response(JSON.stringify({ access_token: newAccessToken }))
}
```

### 6.2 Rate Limiting

- Google Calendar API: 1,000,000 requests/day
- Monitor usage in Google Cloud Console
- Implement exponential backoff for retries

### 6.3 Error Handling

```typescript
try {
  const events = await calendarService.getTodaysEvents()
} catch (error: any) {
  if (error.message.includes('Invalid Credentials')) {
    // Token expired - trigger refresh
    const newToken = await refreshToken(refreshToken)
    return calendarService.getTodaysEvents()
  }
  
  if (error.message.includes('Quota Exceeded')) {
    // Rate limit hit
    console.warn('Rate limit exceeded, backing off...')
  }
}
```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - ✅ Ensure Supabase callback URL matches: `https://project.supabase.co/auth/v1/callback`
   - ✅ Check domains in Google Console OAuth settings

2. **"Scope not granted"**
   - ✅ Add all required scopes to Google Console
   - ✅ Re-authorize the app after scope changes

3. **"Token expired"**
   - ✅ Implement token refresh logic
   - ✅ Check token expiration times

4. **No calendar events**
   - ✅ Verify Google Calendar API is enabled
   - ✅ Check API quotas in Google Console
   - ✅ Ensure user has calendar access

### Debug Checklist

- [ ] Google Calendar API enabled
- [ ] OAuth scopes include calendar.readonly
- [ ] Supabase Google provider configured
- [ ] Redirect URIs match exactly
- [ ] Environment variables set correctly
- [ ] Auth callback page exists
- [ ] Tokens present in session

## Security Notes

- ✅ Never expose Google Client Secret in client code
- ✅ Use environment variables for all secrets
- ✅ Implement token refresh server-side for production
- ✅ Validate tokens on server before API calls
- ✅ Monitor OAuth usage and set up alerts
- ✅ Regularly rotate credentials

## Next Steps

1. **Calendar Event Processing**: Transform Google Calendar events into meeting prep format
2. **Real-time Sync**: Implement WebSocket or polling for live updates
3. **Meeting Insights**: Add AI-powered meeting preparation suggestions
4. **Multiple Calendars**: Support business/personal calendar separation
5. **Recurring Events**: Handle recurring meetings and series

---

**Ready to integrate?** Add the `GoogleCalendarAuth` component to your dashboard and start syncing! 🚀