# Supabase Integration Documentation

## Overview

The Routinsie project has been fully integrated with Supabase to provide real-time authentication, database operations, and live data synchronization. This document outlines the implementation details and usage.

## Features Implemented

### ✅ Authentication System
- **Real Supabase Authentication**: Replaced dummy authentication with Supabase Auth
- **User Management**: Sign up, sign in, password reset, and sign out
- **Session Management**: Automatic session handling and persistence
- **Protected Routes**: Route protection based on authentication status

### ✅ Database Operations
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for all entities
- **Data Types**: Habits, Tasks, Goals, Journal Entries, Themes
- **Row Level Security**: User-specific data access with RLS policies
- **Real-time Subscriptions**: Live updates across all connected clients

### ✅ Custom Hooks
- **useHabits**: Manage habit data with real-time updates
- **useTasks**: Manage task data with real-time updates  
- **useGoals**: Manage goal data with real-time updates
- **useJournalEntries**: Manage journal entries with real-time updates
- **useThemes**: Manage theme data with real-time updates

### ✅ Error Handling & Loading States
- **Comprehensive Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during data operations
- **Notification System**: Success and error notifications
- **Optimistic Updates**: Immediate UI updates with rollback on errors

## File Structure

```
lib/
├── supabase.ts          # Supabase client configuration and types
├── database.ts          # Database service functions and real-time subscriptions
hooks/
├── useDatabase.ts       # Custom hooks for data management
contexts/
├── AuthContext.tsx      # Authentication context with Supabase integration
app/
├── login/page.tsx       # Login page with Supabase auth
├── signup/page.tsx      # Signup page with Supabase auth
├── forgot-password/page.tsx  # Password reset with Supabase
├── reset-password/page.tsx   # Password update with Supabase
├── dashboard/page.tsx   # Dashboard with real Supabase data
```

## Database Schema

The Supabase database includes the following tables:

### Users Table
- Extends Supabase Auth users
- Stores user profile information
- Automatic creation via trigger

### Habits Table
- User-specific habit tracking
- Time-based scheduling
- Completion status and streaks

### Tasks Table  
- User-specific task management
- Priority levels (High, Medium, Low)
- Due dates and completion status

### Goals Table
- User-specific goal tracking
- Progress tracking (0-100%)
- Categories and custom colors

### Journal Entries Table
- User-specific journal entries
- Mood tracking
- Date-based organization

### Themes Table
- User-specific theme customization
- Color palette storage
- Active theme management

## Usage Examples

### Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, isLoading, signOut } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return <div>Welcome, {user.email}!</div>
}
```

### Data Management

```typescript
import { useHabits } from '@/hooks/useDatabase'

function HabitsComponent() {
  const { habits, loading, createHabit, updateHabit, deleteHabit } = useHabits()
  
  const handleCreateHabit = async () => {
    try {
      await createHabit({
        user_id: user.id,
        name: 'Morning Exercise',
        time: '7:00 AM',
        completed: false,
        streak: 0
      })
    } catch (error) {
      console.error('Failed to create habit:', error)
    }
  }
  
  return (
    <div>
      {loading ? <div>Loading habits...</div> : (
        habits.map(habit => (
          <div key={habit.id}>{habit.name}</div>
        ))
      )}
    </div>
  )
}
```

### Real-time Updates

The custom hooks automatically set up real-time subscriptions. When data changes in the database, all connected clients receive updates instantly:

```typescript
// This happens automatically in useHabits hook
useEffect(() => {
  if (!user) return

  const subscription = realtimeService.subscribeToHabits(user.id, (payload) => {
    if (payload.eventType === 'INSERT') {
      setHabits(prev => [payload.new, ...prev])
    } else if (payload.eventType === 'UPDATE') {
      setHabits(prev => prev.map(h => h.id === payload.new.id ? payload.new : h))
    } else if (payload.eventType === 'DELETE') {
      setHabits(prev => prev.filter(h => h.id !== payload.old.id))
    }
  })

  return () => subscription.unsubscribe()
}, [user])
```

## Environment Setup

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Run the SQL schema in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the contents of `supabase-schema.sql`
4. Verify all tables and policies are created

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Policies prevent unauthorized data access

### Authentication Policies
- User-specific data access
- Automatic user ID injection
- Secure data isolation

## Performance Optimizations

### Real-time Efficiency
- Selective subscriptions per user
- Event-based updates only
- Automatic cleanup on unmount

### Data Fetching
- Optimistic updates for better UX
- Error rollback mechanisms
- Loading state management

### Caching
- React state management
- Automatic refetching on auth changes
- Efficient re-rendering

## Error Handling

### Database Errors
- User-friendly error messages
- Automatic retry mechanisms
- Fallback UI states

### Authentication Errors
- Clear sign-in/sign-up feedback
- Password reset flow
- Session management

### Network Errors
- Offline state handling
- Connection retry logic
- Graceful degradation

## Testing

### Authentication Flow
1. Sign up with email/password
2. Verify email (if enabled)
3. Sign in with credentials
4. Access protected routes
5. Sign out and verify redirect

### Data Operations
1. Create new habits/tasks/goals
2. Update existing items
3. Delete items
4. Verify real-time updates across tabs

### Error Scenarios
1. Invalid credentials
2. Network failures
3. Database errors
4. Permission denied

## Troubleshooting

### Common Issues

**Authentication not working:**
- Check environment variables
- Verify Supabase project settings
- Check browser console for errors

**Real-time updates not working:**
- Verify RLS policies
- Check subscription setup
- Monitor network tab for WebSocket connections

**Database operations failing:**
- Check user authentication status
- Verify table permissions
- Review error messages in console

### Debug Tools

```typescript
// Enable Supabase debug mode
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
})

// Check authentication state
const { data: { session } } = await supabase.auth.getSession()
console.log('Current session:', session)

// Test database connection
const { data, error } = await supabase.from('habits').select('*')
console.log('Database test:', { data, error })
```

## Future Enhancements

### Planned Features
- **File Uploads**: Profile pictures and attachments
- **Advanced Analytics**: Data visualization and insights
- **Collaboration**: Shared goals and team features
- **Mobile App**: React Native integration
- **Offline Support**: PWA capabilities

### Performance Improvements
- **Data Pagination**: Large dataset handling
- **Caching Strategy**: Redis integration
- **CDN Integration**: Asset optimization
- **Database Indexing**: Query optimization

## Support

For issues or questions regarding the Supabase integration:

1. Check this documentation first
2. Review Supabase documentation
3. Check browser console for errors
4. Verify environment configuration
5. Test with a fresh Supabase project

## Migration from Dummy Auth

The project has been successfully migrated from dummy authentication to real Supabase integration. All dummy authentication code has been removed and replaced with proper Supabase implementations.

### Changes Made:
- ✅ Updated AuthContext to use Supabase Auth
- ✅ Replaced dummy auth functions with Supabase methods
- ✅ Added real database operations
- ✅ Implemented real-time subscriptions
- ✅ Added proper error handling
- ✅ Created custom hooks for data management
- ✅ Updated all authentication pages
- ✅ Added loading states and notifications

The application now provides a complete, production-ready authentication and data management system powered by Supabase.
