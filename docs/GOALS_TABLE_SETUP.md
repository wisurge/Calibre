# Goals Table Setup for Supabase

## 🚨 **404 Error Fix**

The 404 error occurs because the `goals` table doesn't exist in your Supabase database. Run this SQL script to create it with all necessary policies and triggers.

## ✅ **Complete SQL Script**

```sql
-- 1. Ensure users table exists first
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create goals table
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

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON public.goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_category ON public.goals(category);
CREATE INDEX IF NOT EXISTS idx_goals_completed ON public.goals(completed);

-- 4. Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies (if any)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

DROP POLICY IF EXISTS "Users can view own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can update own goals" ON public.goals;
DROP POLICY IF EXISTS "Users can delete own goals" ON public.goals;

-- 6. Create comprehensive RLS policies for users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. Create comprehensive RLS policies for goals
CREATE POLICY "Users can view own goals" ON public.goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON public.goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON public.goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON public.goals
  FOR DELETE USING (auth.uid() = user_id);

-- 8. Create function to auto-create user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_goals_updated_at ON public.goals;
CREATE TRIGGER update_goals_updated_at 
  BEFORE UPDATE ON public.goals 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 12. Manually create profiles for existing users
INSERT INTO public.users (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 13. Verify the setup
SELECT 
  'goals' as table_name,
  COUNT(*) as row_count
FROM public.goals
UNION ALL
SELECT 
  'users' as table_name,
  COUNT(*) as row_count
FROM public.users;
```

## 🧪 **Test the Setup**

After running the SQL, test with these queries:

### **1. Check if tables exist**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'goals');
```

### **2. Check RLS policies**
```sql
SELECT tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'goals');
```

### **3. Test goal creation**
```sql
-- This should work if you're authenticated
INSERT INTO public.goals (title, description, category, color, target_value)
VALUES ('Test Goal', 'This is a test goal', 'Personal', 'blue', 100);
```

## 🔍 **Troubleshooting**

### **If you still get 404 errors:**

1. **Check table exists:**
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_name = 'goals';
   ```

2. **Check RLS is enabled:**
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'goals';
   ```

3. **Check policies exist:**
   ```sql
   SELECT policyname FROM pg_policies 
   WHERE tablename = 'goals';
   ```

4. **Test with authenticated user:**
   ```sql
   SELECT auth.uid(); -- Should return your user ID
   ```

### **Common Issues:**

- **Table doesn't exist**: Run the CREATE TABLE statements
- **RLS not enabled**: Run ALTER TABLE ENABLE ROW LEVEL SECURITY
- **No policies**: Run the CREATE POLICY statements
- **User profile missing**: Run the INSERT INTO users statement

## ✅ **Expected Result**

After running this SQL:
- ✅ `goals` table will exist with proper structure
- ✅ RLS policies will allow authenticated users to manage their goals
- ✅ User profiles will be created automatically
- ✅ Goals can be created, updated, and deleted
- ✅ Real-time subscriptions will work

The 404 error should be completely resolved!
