# Google OAuth Environment Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth Configuration (same as Supabase uses)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## How to Get Google OAuth Credentials

### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Calendar API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the **Authorized redirect URI** to:
   ```
   http://localhost:3000/api/calendar/auth
   ```
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

### Step 3: Update Environment Variables
Replace the placeholder values in your `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

### Step 4: Restart Development Server
After updating the environment variables, restart your development server:

```bash
npm run dev
```

## Testing the Integration

1. Go to your dashboard at `http://localhost:3000/dashboard`
2. Click "Connect Calendar" in the sidebar
3. You should be redirected to Google's OAuth consent screen
4. Grant permissions for calendar access
5. You'll be redirected back to the dashboard with your calendar connected

## Troubleshooting

### "Missing required parameter: client_id"
- Make sure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in `.env.local`
- Restart the development server after adding environment variables

### "Access blocked" error
- This local OAuth flow bypasses Google's domain verification
- Make sure you're using `localhost:3000` as the redirect URI

### "Invalid redirect URI"
- Ensure the redirect URI in Google Cloud Console exactly matches:
  `http://localhost:3000/api/calendar/auth`
- Check for typos or extra spaces

## Production Setup

For production deployment, you'll need to:
1. Add your production domain to authorized redirect URIs in Google Cloud Console
2. Update the redirect URI in the code to use your production domain
3. Consider using a more secure token storage method than cookies
