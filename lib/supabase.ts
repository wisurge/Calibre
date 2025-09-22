import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  description?: string
  time: string
  completed: boolean
  streak: number
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  name: string
  description?: string
  priority: 'High' | 'Medium' | 'Low'
  completed: boolean
  due_date?: string
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  progress: number
  target_value: number
  completed: boolean
  category: string
  color: string
  created_at: string
  updated_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  content: string
  mood?: string
  date: string
  created_at: string
  updated_at: string
}

export interface Theme {
  id: string
  user_id: string
  name: string
  colors: string[]
  active: boolean
  created_at: string
  updated_at: string
}

