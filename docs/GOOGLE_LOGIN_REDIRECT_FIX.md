# Google Login Redirect Fix

## Problem
Google login was redirecting to localhost after authentication, preventing proper OAuth flow in production environments.

## Root Cause
The OAuth redirect URI was hardcoded to use `req.nextUrl.origin`, which defaults to localhost in development but should use the configured domain in production.

## Solution Applied

### 1. Updated OAuth Route (`app/api/calendar/auth/route.ts`)
- Changed redirect URI to use `process.env.NEXTAUTH_URL` with fallback to `req.nextUrl.origin`
- Applied to both token exchange and initial OAuth URL generation

```typescript
// Before
redirect_uri: `${req.nextUrl.origin}/api/calendar/auth`

// After  
redirect_uri: `${process.env.NEXTAUTH_URL || req.nextUrl.origin}/api/calendar/auth`
```

### 2. Updated Google Calendar Service (`lib/googleCalendar.ts`)
- Fixed redirect URI to use the correct endpoint (`/api/calendar/auth` instead of `/api/auth/callback/google`)
- Added fallback to localhost for development

```typescript
// Before
`${process.env.NEXTAUTH_URL}/api/auth/callback/google`

// After
`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/calendar/auth`
```

## Environment Variables Required

Create a `.env.local` file with:

```bash
# Application URL (set to your production domain when deploying)
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Google Cloud Console Configuration

### Development
Add these authorized redirect URIs:
- `http://localhost:3000/api/calendar/auth`

### Production
Add your production domain:
- `https://yourdomain.com/api/calendar/auth`

## Testing

1. **Development Testing:**
   ```bash
   npm run dev
   ```
   - Navigate to dashboard
   - Click "Connect Calendar"
   - Should redirect to Google OAuth and back to dashboard

2. **Production Testing:**
   - Set `NEXTAUTH_URL=https://yourdomain.com` in production environment
   - Ensure Google Cloud Console has production redirect URI
   - Test OAuth flow

## Verification

After the fix, the OAuth flow should:
1. Redirect to Google OAuth consent screen
2. User grants permissions
3. Redirect back to your application (not localhost)
4. Successfully exchange authorization code for tokens
5. Store tokens and redirect to dashboard

## Troubleshooting

### Still redirecting to localhost?
- Check `NEXTAUTH_URL` environment variable is set correctly
- Verify Google Cloud Console redirect URIs match your domain
- Clear browser cache and cookies
- Restart development server after environment changes

### "Invalid redirect URI" error?
- Ensure Google Cloud Console has exact redirect URI: `{your_domain}/api/calendar/auth`
- Check for typos in environment variables
- Verify no trailing slashes in URLs

### Environment variables not loading?
- Ensure `.env.local` is in project root
- Restart development server after adding variables
- Check variable names match exactly (case-sensitive)
