# Goals 403 Forbidden Error Fix

## 🚨 **Issue Identified**
The error `403 Forbidden` indicates that the Row Level Security (RLS) policy is blocking the insert operation for the `goals` table.

## 🔍 **Root Cause**
The RLS policy `auth.uid() = user_id` is failing because:
1. The `user_id` field is not being set correctly
2. The user profile doesn't exist in the `public.users` table
3. The RLS policy can't match the authenticated user with the `user_id`

## ✅ **Complete Fix**

### **Step 1: Run This SQL in Supabase**

```sql
-- 1. Ensure tables exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  target_value INTEGER DEFAULT 100,
  completed BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'Personal',
  color TEXT DEFAULT 'purple',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

DROP POLICY IF EXISTS "Users can view own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can update own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can delete own goals" ON public.goals;

-- 4. Create comprehensive RLS policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own goals" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON public.goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON public.goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON public.goals
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Create function to auto-create user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Manually create profiles for existing users
INSERT INTO public.users (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;
```

### **Step 2: Updated Database Service**

The database service has been updated to:
1. **Ensure user profile exists** before creating goals
2. **Add detailed logging** for debugging
3. **Handle profile creation** automatically
4. **Include user_id checks** in update and delete operations

## 🧪 **Test the Fix**

### **1. Check Console Logs**
After the fix, you should see these logs in the browser console:
```
Creating goal: {title: '...', description: '...', ...}
Current user ID: [user-uuid]
Goal with user_id: {title: '...', description: '...', ..., user_id: '[user-uuid]'}
Goal created successfully: {...}
```

### **2. Verify User Profile**
Run this query to check if your user profile exists:
```sql
SELECT * FROM public.users WHERE id = auth.uid();
```

### **3. Test Goal Creation**
1. **Refresh your application**
2. **Go to Goals page**
3. **Click "Grow a New Goal"**
4. **Fill in the form and submit**
5. **Check for success** - should see success notification
6. **Verify goal appears** in goals list

## 🔍 **Debugging Steps**

### **Step 1: Check Authentication**
```typescript
// Add this to your component for debugging
useEffect(() => {
  const debugAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Current user:', user)
    console.log('User ID:', user?.id)
    console.log('User email:', user?.email)
  }
  debugAuth()
}, [])
```

### **Step 2: Check User Profile**
```sql
-- Run this in Supabase SQL Editor
SELECT 
  u.id,
  u.email,
  u.created_at,
  au.email as auth_email
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE au.id = auth.uid();
```

### **Step 3: Test RLS Policy**
```sql
-- Test if RLS policy allows insert
INSERT INTO public.goals (user_id, title, description, category, color, target_value)
VALUES (auth.uid(), 'Test Goal', 'Test Description', 'Personal', 'blue', 100);
```

## 🚨 **Common Issues and Solutions**

### **Issue 1: User Profile Missing**
**Symptoms**: RLS policy violation persists
**Solution**: Run the manual profile creation SQL:
```sql
INSERT INTO public.users (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;
```

### **Issue 2: RLS Policy Not Working**
**Symptoms**: Still getting policy violations
**Solution**: Verify policies exist:
```sql
SELECT tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'goals';
```

### **Issue 3: Authentication Issues**
**Symptoms**: No user ID in logs
**Solution**: Sign out and sign back in to refresh authentication

## ✅ **Expected Result After Fix**

After implementing the fix:
- ✅ User profiles will be created automatically
- ✅ RLS policies will work correctly
- ✅ Goals will save successfully
- ✅ Real-time updates will work
- ✅ Users will only see their own goals

## 🎯 **Key Changes Made**

1. **Enhanced Database Service**: Now ensures user profile exists before creating goals
2. **Better Error Handling**: More detailed logging for debugging
3. **Automatic Profile Creation**: Uses `upsert` to create profiles if missing
4. **Comprehensive RLS Policies**: All necessary policies for both tables
5. **User ID Validation**: All operations now include user_id checks

The 403 Forbidden error should be completely resolved!
