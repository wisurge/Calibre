import { supabase, Habit, Task, Goal, JournalEntry, Theme } from './supabase'

// Database service functions for CRUD operations

// Habits
export const habitService = {
  // Get all habits for a user
  async getHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create a new habit
  async createHabit(habit: Omit<Habit, 'id' | 'created_at' | 'updated_at'>): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .insert(habit)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update a habit
  async updateHabit(id: string, updates: Partial<Habit>): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete a habit
  async deleteHabit(id: string): Promise<void> {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Toggle habit completion
  async toggleHabit(id: string, completed: boolean): Promise<Habit> {
    return this.updateHabit(id, { completed })
  }
}

// Tasks
export const taskService = {
  // Get all tasks for a user
  async getTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create a new task
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update a task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Toggle task completion
  async toggleTask(id: string, completed: boolean): Promise<Task> {
    return this.updateTask(id, { completed })
  }
}

// Goals
export const goalService = {
  // Get all goals for a user
  async getGoals(userId: string): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create a new goal
  async createGoal(goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Goal> {
    console.log('Creating goal:', goal)
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    console.log('Current user ID:', user.id)
    
    // Ensure user profile exists in public.users table
    const { error: profileError } = await supabase
      .from('users')
      .upsert({ id: user.id, email: user.email }, { onConflict: 'id' })
    
    if (profileError) {
      console.error('Profile creation error:', profileError)
      throw new Error('Failed to create user profile')
    }
    
    const goalWithUserId = {
      ...goal,
      user_id: user.id
    }
    
    console.log('Goal with user_id:', goalWithUserId)
    
    const { data, error } = await supabase
      .from('goals')
      .insert(goalWithUserId)
      .select()
      .single()

    if (error) {
      console.error('Goal creation error:', error)
      throw error
    }
    
    console.log('Goal created successfully:', data)
    return data
  },

  // Update a goal
  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    // Get current user to ensure they can only update their own goals
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user can only update their own goals
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete a goal
  async deleteGoal(id: string): Promise<void> {
    // Get current user to ensure they can only delete their own goals
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user can only delete their own goals

    if (error) throw error
  },

  // Update goal progress
  async updateProgress(id: string, progress: number): Promise<Goal> {
    return this.updateGoal(id, { progress })
  }
}

// Journal Entries
export const journalService = {
  // Get all journal entries for a user
  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get journal entries for a specific date
  async getJournalEntryByDate(userId: string, date: string): Promise<JournalEntry | null> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return data || null
  },

  // Create a new journal entry
  async createJournalEntry(entry: Omit<JournalEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<JournalEntry> {
    console.log('Creating journal entry:', entry)
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    console.log('Current user ID:', user.id)
    
    // Ensure user profile exists in public.users table
    const { error: profileError } = await supabase
      .from('users')
      .upsert({ id: user.id, email: user.email }, { onConflict: 'id' })
    
    if (profileError) {
      console.error('Profile creation error:', profileError)
      throw new Error('Failed to create user profile')
    }
    
    const entryWithUserId = {
      ...entry,
      user_id: user.id
    }
    
    console.log('Entry with user_id:', entryWithUserId)
    
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entryWithUserId)
      .select()
      .single()

    if (error) {
      console.error('Journal entry creation error:', error)
      throw error
    }
    
    console.log('Journal entry created successfully:', data)
    return data
  },

  // Update a journal entry
  async updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<JournalEntry> {
    // Get current user to ensure they can only update their own entries
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user can only update their own entries
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete a journal entry
  async deleteJournalEntry(id: string): Promise<void> {
    // Get current user to ensure they can only delete their own entries
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // Ensure user can only delete their own entries

    if (error) throw error
  }
}

// Themes
export const themeService = {
  // Get all themes for a user
  async getThemes(userId: string): Promise<Theme[]> {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get active theme for a user
  async getActiveTheme(userId: string): Promise<Theme | null> {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data || null
  },

  // Create a new theme
  async createTheme(theme: Omit<Theme, 'id' | 'created_at' | 'updated_at'>): Promise<Theme> {
    const { data, error } = await supabase
      .from('themes')
      .insert(theme)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update a theme
  async updateTheme(id: string, updates: Partial<Theme>): Promise<Theme> {
    const { data, error } = await supabase
      .from('themes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Set theme as active (deactivates others)
  async setActiveTheme(userId: string, themeId: string): Promise<void> {
    // First, deactivate all themes for the user
    await supabase
      .from('themes')
      .update({ active: false })
      .eq('user_id', userId)

    // Then activate the selected theme
    const { error } = await supabase
      .from('themes')
      .update({ active: true })
      .eq('id', themeId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Delete a theme
  async deleteTheme(id: string): Promise<void> {
    const { error } = await supabase
      .from('themes')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to habits changes
  subscribeToHabits(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('habits')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'habits', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe()
  },

  // Subscribe to tasks changes
  subscribeToTasks(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe()
  },

  // Subscribe to goals changes
  subscribeToGoals(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('goals')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe()
  },

  // Subscribe to journal entries changes
  subscribeToJournalEntries(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('journal_entries')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'journal_entries', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe()
  },

  // Subscribe to themes changes
  subscribeToThemes(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('themes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'themes', filter: `user_id=eq.${userId}` },
        callback
      )
      .subscribe()
  }
}
