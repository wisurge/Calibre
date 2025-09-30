# Google Calendar Integration Setup

This guide will help you set up Google Calendar integration for the Routinsie meeting prep dashboard.

## Prerequisites

- Google Cloud Platform account
- Google Calendar API enabled
- Next.js development environment

## Step 1: Google Cloud Console Setup

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID for later use

### 1.2 Enable Google Calendar API
1. Navigate to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### 1.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required fields:
   - App name: `Routinsie Calendar Integration`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `../auth/calendar.readonly`
   - `../auth/calendar`
5. Add your domain to authorized domains if using production

### 1.4 Create OAuth 2.0 Credentials
1. Go to "APIs & SERVICES" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Configure the consent screen
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

## Step 2: Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Calendar Integration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000

# NextAuth Configuration (optional)
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## Step 3: Installation

The required dependencies are already installed:

```bash
npm install googleapis
```

## Step 4: Testing the Integration

### 4.1 Start the Development Server
```bash
npm run dev
```

### 4.2 Connect Your Calendar
1. Navigate to the dashboard
2. Click "Connect Calendar" in the sync status bar
3. Authorize the app in the popup window
4. Your calendar events will be synced automatically

### 4.3 Features Available

- **Real-time Sync**: Automatically fetches today's meetings
- **Smart Meeting Detection**: Identifies interviews, intros, and networking events
- **Meeting Preps**: Generates prep checklists based on meeting type
- **Data Toggle**: Switch between real calendar data and mock data
- **Manual Sync**: Refresh calendar data on demand

## Features

### Automatic Meeting Detection
The system automatically categorizes meetings:

- **Technical Interviews**: Coding interviews, technical discussions
- **Intro Calls**: Initial recruiter/HR conversations  
- **Networking**: Coffee meetings, networking events
- **General Meetings**: All other calendar events

### Meeting Preps Generated
For each detected meeting, the system creates:

- **Pre-meeting checklists** tailored to meeting type
- **Strategic questions** to ask during the meeting
- **Success criteria** for the conversation
- **Technical focus areas** for technical interviews
- **Company intelligence** gathering suggestions

### Calendar Sync Status
The dashboard shows:

- ✅ Connected status with last sync time
- 🔄 Sync progress indicators
- 🔄 Manual refresh option
- ⚠️ Error handling and troubleshooting
- 🔌 One-click disconnect functionality

## Troubleshooting

### Common Issues

1. **"Calendar not connected" Error**
   - Check environment variables are set correctly
   - Verify Google Client ID and Secret
   - Ensure redirect URI matches exactly

2. **"Invalid redirect URI" Error**
   - Update authorized redirect URIs in Google Console
   - Check NEXTAUTH_URL matches your domain

3. **"Scope not authorized" Error**
   - Add required scopes to OAuth consent screen
   - Re-authorize the app

4. **No meetings showing**
   - Check if you have meetings scheduled for today
   - Verify events have proper start times (not all-day events)
   - Check meeting titles don't contain "busy" or "out of office"

### API Limits
Google Calendar API has usage limits:
- 100,000 requests per 100 seconds per user
- 1,000 requests per 100 seconds
  
The app implements automatic token refresh to handle expired credentials.

## Production Deployment

### Environment Setup
1. Create production Google OAuth credentials
2. Add production domain to authorized redirect URIs
3. Update environment variables:
   ```bash
   NEXTAUTH_URL=https://yourdomain.com
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=production_client_id
   GOOGLE_CLIENT_SECRET=production_client_secret
   ```

### Security Considerations
- Store OAuth credentials securely (environment variables)
- Use HTTPS in production
- Regularly rotate client secrets
- Monitor API usage and set up alerts

## Advanced Configuration

### Custom Meeting Types
You can extend the meeting detection by modifying `lib/googleCalendar.ts`:

```typescript
const generateChecklistForEventType = (type: string, event: GoogleCalendarEvent): string[] => {
  // Add custom meeting types and their generated prep items
}
```

### Additional Calendar Providers
To add Outlook or Apple Calendar support:

1. Create new service classes similar to `GoogleCalendarService`
2. Implement OAuth flows for each provider
3. Add provider selection UI
4. Update the sync hook to handle multiple providers

## Support

For questions or issues:
1. Check the console logs for error messages
2. Verify Google Cloud Console configuration
3. Test with simple calendar events first
4. Review Google Calendar API documentation

The integration follows OAuth 2.0 best practices and includes comprehensive error handling for a smooth user experience.


