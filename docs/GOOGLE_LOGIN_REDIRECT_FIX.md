# Google Login Redirect Fix

## Problem
Google login was redirecting to localhost after authentication, preventing proper OAuth flow in production environments.

## Root Cause
The OAuth redirect URI was hardcoded to use `req.nextUrl.origin`, which defaults to localhost in development but should use the configured domain in production.

## Solution Applied

### 1. Updated OAuth Route (`app/api/calendar/auth/route.ts`)
- Created `getRedirectUri()` helper function with environment-aware logic
- **Production**: Requires `NEXTAUTH_URL` environment variable (fails fast if missing)
- **Development**: Uses `NEXTAUTH_URL` if set, otherwise falls back to `req.nextUrl.origin`
- Applied to both token exchange and initial OAuth URL generation

```typescript
// Helper function with environment-aware logic
function getRedirectUri(req: NextRequest): string {
  // In production, NEXTAUTH_URL should be set
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_URL) {
      throw new Error('NEXTAUTH_URL environment variable is required in production')
    }
    return process.env.NEXTAUTH_URL
  }
  
  // In development, use NEXTAUTH_URL if set, otherwise fall back to request origin
  return process.env.NEXTAUTH_URL || req.nextUrl.origin
}

// Usage
redirect_uri: `${getRedirectUri(req)}/api/calendar/auth`
```

### 2. Updated Google Calendar Service (`lib/googleCalendar.ts`)
- Added same `getRedirectUri()` helper function
- Fixed redirect URI to use the correct endpoint (`/api/calendar/auth` instead of `/api/auth/callback/google`)
- **Production**: Requires `NEXTAUTH_URL` (fails fast if missing)
- **Development**: Uses `NEXTAUTH_URL` if set, otherwise falls back to localhost

```typescript
// Helper function with environment-aware logic
function getRedirectUri(): string {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_URL) {
      throw new Error('NEXTAUTH_URL environment variable is required in production')
    }
    return process.env.NEXTAUTH_URL
  }
  
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
}

// Usage
`${getRedirectUri()}/api/calendar/auth`
```

### 3. Updated Supabase Auth Context (`contexts/AuthContext.tsx`)
- Fixed Supabase OAuth redirect to use environment-aware logic
- **Production**: Requires `NEXT_PUBLIC_NEXTAUTH_URL` (fails fast if missing)
- **Development**: Uses `NEXT_PUBLIC_NEXTAUTH_URL` if set, otherwise falls back to `window.location.origin`
- Redirects to `/auth/callback` (Supabase's callback endpoint)

```typescript
// Helper function with environment-aware logic
const getRedirectUri = () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_NEXTAUTH_URL) {
      throw new Error('NEXT_PUBLIC_NEXTAUTH_URL environment variable is required in production')
    }
    return process.env.NEXT_PUBLIC_NEXTAUTH_URL
  }
  
  return process.env.NEXT_PUBLIC_NEXTAUTH_URL || window.location.origin
}

// Usage
redirectTo: `${getRedirectUri()}/auth/callback`
```

## Environment Variables Required

Create a `.env.local` file with:

```bash
# Application URLs (set to your production domain when deploying)
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: Both `NEXTAUTH_URL` (server-side) and `NEXT_PUBLIC_NEXTAUTH_URL` (client-side) are needed for the different OAuth flows.

## Google Cloud Console Configuration

### Development
Add these authorized redirect URIs:
- `http://localhost:3000/api/calendar/auth` (for custom Google Calendar OAuth)
- `http://localhost:3000/auth/callback` (for Supabase OAuth)

### Production
Add your production domain:
- `https://yourdomain.com/api/calendar/auth` (for custom Google Calendar OAuth)
- `https://yourdomain.com/auth/callback` (for Supabase OAuth)

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
