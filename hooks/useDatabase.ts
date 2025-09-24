import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { habitService, taskService, goalService, journalService, themeService, realtimeService } from '@/lib/database'
import { Habit, Task, Goal, JournalEntry, Theme } from '@/lib/supabase'

// Custom hook for habits
export const useHabits = () => {
  const { user } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHabits = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await habitService.getHabits(user.id)
      setHabits(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createHabit = async (habit: Omit<Habit, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    
    try {
      const newHabit = await habitService.createHabit(habit)
      setHabits(prev => [newHabit, ...prev])
      return newHabit
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    try {
      const updatedHabit = await habitService.updateHabit(id, updates)
      setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h))
      return updatedHabit
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteHabit = async (id: string) => {
    try {
      await habitService.deleteHabit(id)
      setHabits(prev => prev.filter(h => h.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const toggleHabit = async (id: string, completed: boolean) => {
    return updateHabit(id, { completed })
  }

  useEffect(() => {
    fetchHabits()
  }, [user])

  // Set up real-time subscription
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

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    refetch: fetchHabits
  }
}

// Custom hook for tasks
export const useTasks = () => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getTasks(user.id)
      setTasks(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    
    try {
      const newTask = await taskService.createTask(task)
      setTasks(prev => [newTask, ...prev])
      return newTask
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates)
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
      return updatedTask
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const toggleTask = async (id: string, completed: boolean) => {
    return updateTask(id, { completed })
  }

  useEffect(() => {
    fetchTasks()
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    const subscription = realtimeService.subscribeToTasks(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setTasks(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
      } else if (payload.eventType === 'DELETE') {
        setTasks(prev => prev.filter(t => t.id !== payload.old.id))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks
  }
}

// Custom hook for goals
export const useGoals = () => {
  const { user } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await goalService.getGoals(user.id)
      setGoals(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    
    try {
      const newGoal = await goalService.createGoal(goal)
      setGoals(prev => [newGoal, ...prev])
      return newGoal
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const updatedGoal = await goalService.updateGoal(id, updates)
      setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g))
      return updatedGoal
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      await goalService.deleteGoal(id)
      setGoals(prev => prev.filter(g => g.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateProgress = async (id: string, progress: number) => {
    return updateGoal(id, { progress })
  }

  useEffect(() => {
    fetchGoals()
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    const subscription = realtimeService.subscribeToGoals(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setGoals(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setGoals(prev => prev.map(g => g.id === payload.new.id ? payload.new : g))
      } else if (payload.eventType === 'DELETE') {
        setGoals(prev => prev.filter(g => g.id !== payload.old.id))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    goals,
    loading,
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    updateProgress,
    refetch: fetchGoals
  }
}

// Custom hook for journal entries
export const useJournalEntries = () => {
  const { user } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const data = await journalService.getJournalEntries(user.id)
      setEntries(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getEntryByDate = async (date: string) => {
    if (!user) return null
    
    try {
      return await journalService.getJournalEntryByDate(user.id, date)
    } catch (err: any) {
      setError(err.message)
      return null
    }
  }

  const createEntry = async (entry: Omit<JournalEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    
    try {
      const newEntry = await journalService.createJournalEntry(entry)
      setEntries(prev => [newEntry, ...prev])
      return newEntry
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateEntry = async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const updatedEntry = await journalService.updateJournalEntry(id, updates)
      setEntries(prev => prev.map(e => e.id === id ? updatedEntry : e))
      return updatedEntry
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      await journalService.deleteJournalEntry(id)
      setEntries(prev => prev.filter(e => e.id !== id))
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    const subscription = realtimeService.subscribeToJournalEntries(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setEntries(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setEntries(prev => prev.map(e => e.id === payload.new.id ? payload.new : e))
      } else if (payload.eventType === 'DELETE') {
        setEntries(prev => prev.filter(e => e.id !== payload.old.id))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    entries,
    loading,
    error,
    getEntryByDate,
    createEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries
  }
}

// Custom hook for themes
export const useThemes = () => {
  const { user } = useAuth()
  const [themes, setThemes] = useState<Theme[]>([])
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchThemes = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      const [themesData, activeThemeData] = await Promise.all([
        themeService.getThemes(user.id),
        themeService.getActiveTheme(user.id)
      ])
      setThemes(themesData)
      setActiveTheme(activeThemeData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTheme = async (theme: Omit<Theme, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return
    
    try {
      const newTheme = await themeService.createTheme(theme)
      setThemes(prev => [newTheme, ...prev])
      return newTheme
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateTheme = async (id: string, updates: Partial<Theme>) => {
    try {
      const updatedTheme = await themeService.updateTheme(id, updates)
      setThemes(prev => prev.map(t => t.id === id ? updatedTheme : t))
      return updatedTheme
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const setActive = async (themeId: string) => {
    if (!user) return
    
    try {
      await themeService.setActiveTheme(user.id, themeId)
      const theme = themes.find(t => t.id === themeId)
      if (theme) {
        setActiveTheme(theme)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteTheme = async (id: string) => {
    try {
      await themeService.deleteTheme(id)
      setThemes(prev => prev.filter(t => t.id !== id))
      if (activeTheme?.id === id) {
        setActiveTheme(null)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchThemes()
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    const subscription = realtimeService.subscribeToThemes(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setThemes(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setThemes(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
        if (payload.new.active) {
          setActiveTheme(payload.new)
        }
      } else if (payload.eventType === 'DELETE') {
        setThemes(prev => prev.filter(t => t.id !== payload.old.id))
        if (activeTheme?.id === payload.old.id) {
          setActiveTheme(null)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user, activeTheme])

  return {
    themes,
    activeTheme,
    loading,
    error,
    createTheme,
    updateTheme,
    setActive,
    deleteTheme,
    refetch: fetchThemes
  }
}
