# Authentication System

This document outlines the authentication system implemented for Routinsie.

## Overview

The authentication system uses Supabase Auth for user management and provides a complete UI for login, signup, password reset, and user management.

## Features

### Authentication Pages
- **Login** (`/login`) - User sign in with email/password
- **Signup** (`/signup`) - User registration with email/password
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Password reset with token
- **Landing Page** (`/landing`) - Marketing page for unauthenticated users

### Authentication Components
- **AuthForm** - Reusable form component for login/signup
- **ProtectedRoute** - HOC for protecting authenticated routes
- **AuthContext** - Global authentication state management

### User Interface
- **Header** - Authentication-aware header with user menu
- **User Menu** - Dropdown with user info and sign out
- **Loading States** - Proper loading indicators during auth operations

## Authentication Flow

1. **Unauthenticated Users**
   - Redirected to `/landing` page
   - Can access login/signup pages
   - Can view marketing content

2. **Authenticated Users**
   - Redirected to `/dashboard` page
   - Can access all protected routes
   - See personalized header with user menu

3. **Authentication States**
   - Loading: Shows loading spinner
   - Authenticated: Shows user menu and protected content
   - Unauthenticated: Shows login/signup buttons

## Protected Routes

All main application routes are protected:
- `/dashboard` - Main dashboard
- `/journal` - Journal entries
- `/goals` - Goal management
- `/customize` - Theme customization

## User Management

- **Sign Out** - Clears session and redirects to login
- **User Profile** - Shows user name and email
- **Settings** - Placeholder for user settings

## Styling

The authentication UI follows the existing design system:
- Uses theme CSS variables for consistent colors
- Matches existing component styling patterns
- Responsive design for mobile and desktop
- Smooth transitions and animations

## Error Handling

- Form validation with real-time feedback
- Network error handling with user-friendly messages
- Toast notifications for success/error states
- Graceful fallbacks for edge cases

## Security Features

- Password strength validation
- Email format validation
- CSRF protection via Supabase
- Secure session management
- Automatic token refresh

## Integration

The authentication system integrates with:
- Supabase Auth for backend authentication
- Notification system for user feedback
- Theme system for consistent styling
- Analytics for user behavior tracking
