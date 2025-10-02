# Fix: Trigger Already Exists Error

## 🚨 **Issue Identified**
The error `"trigger "on_auth_user_created" for relation "users" already exists"` occurs when trying to create a trigger that already exists.

## ✅ **Fixed SQL Script**

Run this **updated SQL** in your Supabase SQL Editor (it handles existing triggers properly):

```sql
-- 1. Ensure tables exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can insert own journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can update own journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Users can delete own journal entries" ON public.journal_entries;

DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- 4. Create proper RLS policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own journal entries" ON public.journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON public.journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
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

-- 6. Drop existing trigger first, then recreate (this prevents the error)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create triggers for updated_at (with IF NOT EXISTS equivalent)
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_journal_entries_updated_at ON public.journal_entries;
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON public.journal_entries(date);
```

## 🔧 **Key Changes Made**

### **1. Proper Trigger Handling**
```sql
-- Drop existing trigger first, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### **2. Comprehensive Policy Management**
- Drops all existing policies first
- Creates all necessary policies for both tables
- Ensures no conflicts

### **3. Safe Function Creation**
```sql
-- CREATE OR REPLACE ensures no conflicts
CREATE OR REPLACE FUNCTION public.handle_new_user()
```

## 🧪 **Test the Fix**

After running the updated SQL:

1. **Check for success message** - Should see "Success" in SQL editor
2. **Refresh your application**
3. **Try creating a journal entry**
4. **Check browser console** for success logs

## 🔍 **Verify Setup**

Run this query to check if everything is set up correctly:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'journal_entries')
ORDER BY table_name;

-- Check if policies exist
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'journal_entries')
ORDER BY tablename, policyname;

-- Check if triggers exist
SELECT trigger_name, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY trigger_name;
```

## ✅ **Expected Result**

After running this SQL:
- ✅ No trigger errors
- ✅ All tables created/verified
- ✅ All RLS policies in place
- ✅ Triggers working properly
- ✅ Journal entries will save successfully

The trigger error should be completely resolved!
