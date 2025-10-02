import { NextRequest, NextResponse } from 'next/server'

// Use the same Google OAuth credentials that Supabase uses
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      console.error('❌ OAuth error:', error)
      return NextResponse.redirect(new URL('/dashboard?error=oauth_cancelled', req.url))
    }

    if (code) {
      // Exchange authorization code for tokens
      console.log('🔄 Processing Google OAuth callback with code')
      
      try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.NEXTAUTH_URL || req.nextUrl.origin}/api/calendar/auth`,
          }),
        })

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.text()
          console.error('❌ Token exchange failed:', errorData)
          return NextResponse.redirect(new URL('/dashboard?error=token_exchange_failed', req.url))
        }

        const tokens = await tokenResponse.json()
        console.log('✅ Successfully obtained tokens')

        // Get user info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
          },
        })

        const userInfo = await userResponse.json()

        // Store tokens in a cookie (in production, use secure storage)
        const response = NextResponse.redirect(new URL('/dashboard?connected=true', req.url))
        
        // Set secure cookies with tokens
        response.cookies.set('google_access_token', tokens.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: tokens.expires_in || 3600
        })
        
        if (tokens.refresh_token) {
          response.cookies.set('google_refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
        }

        response.cookies.set('google_user_info', JSON.stringify(userInfo), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })

        return response

      } catch (tokenError) {
        console.error('❌ Token exchange error:', tokenError)
        return NextResponse.redirect(new URL('/dashboard?error=token_error', req.url))
      }
    }

    // If no code, initiate OAuth flow
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/calendar.readonly'
    ].join(' ')

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID)
    authUrl.searchParams.set('redirect_uri', `${process.env.NEXTAUTH_URL || req.nextUrl.origin}/api/calendar/auth`)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')

    console.log('🚀 Redirecting to Google OAuth:', authUrl.toString())
    return NextResponse.redirect(authUrl.toString())

  } catch (error: any) {
    console.error('❌ Auth route error:', error)
    return NextResponse.redirect(new URL('/dashboard?error=auth_error', req.url))
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'signout') {
      // Clear Google Calendar cookies
      const response = NextResponse.json({ success: true })
      response.cookies.delete('google_access_token')
      response.cookies.delete('google_refresh_token')
      response.cookies.delete('google_user_info')
      
      return response
    }

    return NextResponse.json({ error: 'Request not supported' }, { status: 400 })

  } catch (error: any) {
    console.error('❌ Auth POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}