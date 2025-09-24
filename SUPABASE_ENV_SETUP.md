# Supabase Environment Setup Guide

## 🚨 **Current Issue**
Your `.env.local` file contains placeholder values instead of actual Supabase credentials, causing the error:
```
Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

## 🔧 **How to Fix**

### Step 1: Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your project

2. **Get Project URL**
   - Go to **Settings** → **API**
   - Copy the **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)

3. **Get Anon Key**
   - In the same **Settings** → **API** page
   - Copy the **anon/public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Step 2: Update Your Environment File

**File**: `.env.local`

Replace the placeholder values with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here

# Optional: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 3: Restart Your Development Server

After updating the environment file:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
```

## 📋 **Example of Correct Format**

```env
# ✅ CORRECT - Replace with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2ODAwMCwiZXhwIjoyMDE0MzQ0MDAwfQ.example_signature_here

# ❌ WRONG - These are placeholder values
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔍 **How to Verify Your Setup**

### 1. Check Environment Variables
The updated `lib/supabase.ts` now provides better error messages:

- **Missing URL**: "Missing NEXT_PUBLIC_SUPABASE_URL environment variable"
- **Missing Key**: "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"  
- **Invalid URL**: "Invalid NEXT_PUBLIC_SUPABASE_URL: [value]. Must be a valid HTTP or HTTPS URL."

### 2. Test Connection
After updating your credentials, you should be able to:
- Start the development server without errors
- Access the signup/login pages
- See proper Supabase connection

## 🛠️ **Troubleshooting**

### Issue: "Missing environment variable"
**Solution**: Make sure your `.env.local` file exists and contains the correct variable names

### Issue: "Invalid URL format"
**Solution**: Ensure your Supabase URL starts with `https://` and ends with `.supabase.co`

### Issue: "Invalid anon key"
**Solution**: Make sure you copied the complete anon key (it's very long, starts with `eyJ`)

### Issue: Still getting errors after updating
**Solution**: 
1. Restart your development server
2. Clear browser cache
3. Check for typos in the environment file

## 📁 **File Locations**

- **Environment file**: `.env.local` (in your project root)
- **Supabase config**: `lib/supabase.ts`
- **Example file**: `supabase.env.example`

## 🔐 **Security Notes**

- ✅ `.env.local` is already in `.gitignore` (safe to commit)
- ✅ Never commit your actual Supabase credentials
- ✅ The anon key is safe to use in client-side code
- ⚠️ Service role key should only be used server-side

## 🎯 **Next Steps**

After fixing your environment variables:

1. **Test Authentication**: Try signing up with a real email
2. **Check Email Verification**: Verify the email verification flow works
3. **Test Database Operations**: Create some habits/tasks to test the database
4. **Verify Real-time Updates**: Open multiple tabs to test real-time sync

## 📞 **Need Help?**

If you're still having issues:

1. **Check Supabase Dashboard**: Make sure your project is active
2. **Verify API Keys**: Double-check you copied the correct keys
3. **Check Network**: Ensure you can access supabase.com
4. **Review Logs**: Check browser console for additional error details

The error should be resolved once you update your `.env.local` file with the correct Supabase credentials!
