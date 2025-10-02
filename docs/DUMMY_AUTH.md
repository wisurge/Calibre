# Dummy Authentication System

This document explains the dummy authentication system implemented for testing the UI without Supabase setup.

## Overview

The dummy authentication system simulates real authentication behavior using localStorage and provides a complete testing environment for the authentication UI.

## How It Works

### Authentication Flow
1. **Sign Up/Login** - Accepts any email/password combination
2. **User Storage** - Stores user data in localStorage
3. **Session Persistence** - Maintains login state across page refreshes
4. **Sign Out** - Clears localStorage and redirects to login

### Dummy User Data
```typescript
interface DummyUser {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}
```

## Testing the Authentication

### 1. Test Authentication Flow
Visit `/auth-test` to see the current authentication state and test the flow.

### 2. Test Pages
- **Landing Page** (`/landing`) - Marketing page for unauthenticated users
- **Login** (`/login`) - Sign in with any email/password
- **Signup** (`/signup`) - Create account with any email/password
- **Forgot Password** (`/forgot-password`) - Password reset flow
- **Reset Password** (`/reset-password`) - Password update flow
- **Dashboard** (`/dashboard`) - Protected dashboard (requires auth)

### 3. Test Credentials
You can use any email and password combination:
- Email: `test@example.com`
- Password: `password123`
- Or any other combination you prefer

## Features

### ✅ Working Features
- **Form Validation** - Real-time validation with error messages
- **Loading States** - Proper loading indicators during auth operations
- **Success/Error Notifications** - Toast notifications for user feedback
- **Responsive Design** - Works on mobile and desktop
- **Theme Integration** - Uses existing theme system
- **Protected Routes** - Dashboard requires authentication
- **User Menu** - Header shows user info and sign out option
- **Session Persistence** - Login state persists across page refreshes

### 🔄 Simulated Features
- **API Delays** - 1-second delay to simulate network requests
- **User Data** - Generated from email address
- **Password Reset** - Shows success message (no actual email sent)
- **Account Creation** - Immediately signs in user

## File Structure

```
contexts/
  AuthContext.tsx          # Main authentication context with dummy functions
app/
  auth-test/               # Test page to verify auth state
  login/                   # Login page
  signup/                  # Signup page
  forgot-password/         # Password reset request
  reset-password/          # Password reset form
  landing/                 # Marketing landing page
  dashboard/               # Protected dashboard
components/
  molecules/AuthForm/      # Reusable authentication form
  ProtectedRoute.tsx      # Route protection component
```

## Switching to Real Authentication

When ready to implement real Supabase authentication:

1. **Update AuthContext** - Replace dummy functions with Supabase calls
2. **Update Pages** - Replace `dummyAuth` imports with `supabase` imports
3. **Environment Variables** - Add Supabase URL and keys
4. **Database Setup** - Configure Supabase database schema

## Testing Checklist

- [ ] Landing page loads for unauthenticated users
- [ ] Login form accepts any credentials
- [ ] Signup form creates account and signs in
- [ ] Dashboard is protected (redirects to login when not authenticated)
- [ ] User menu shows correct user information
- [ ] Sign out clears session and redirects to login
- [ ] Password reset flow works (shows success message)
- [ ] Form validation works correctly
- [ ] Loading states display properly
- [ ] Notifications show success/error messages
- [ ] Theme switching works on all auth pages
- [ ] Mobile responsive design works

## Notes

- All authentication is client-side only (localStorage)
- No actual email sending for password reset
- User data is generated from email address
- Session persists across browser tabs
- No server-side validation or security
