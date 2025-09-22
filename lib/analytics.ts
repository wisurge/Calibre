// Analytics configuration for Routinsie
import { track } from '@vercel/analytics'

// Track theme changes
export const trackThemeChange = (themeName: string) => {
  track('theme_change', {
    theme: themeName,
    timestamp: new Date().toISOString()
  })
}

// Track habit completions
export const trackHabitCompletion = (habitName: string, streak: number) => {
  track('habit_completed', {
    habit: habitName,
    streak: streak,
    timestamp: new Date().toISOString()
  })
}

// Track task completions
export const trackTaskCompletion = (taskName: string, priority: string) => {
  track('task_completed', {
    task: taskName,
    priority: priority,
    timestamp: new Date().toISOString()
  })
}

// Track journal entries
export const trackJournalEntry = (entryLength: number, mood?: string) => {
  track('journal_entry', {
    entry_length: entryLength,
    mood: mood || 'unknown',
    timestamp: new Date().toISOString()
  })
}

// Track goal setting
export const trackGoalSet = (goalType: string, deadline?: string) => {
  track('goal_set', {
    goal_type: goalType,
    deadline: deadline || 'none',
    timestamp: new Date().toISOString()
  })
}

// Track page views for specific sections
export const trackPageView = (pageName: string, section?: string) => {
  track('page_view', {
    page: pageName,
    section: section || 'main',
    timestamp: new Date().toISOString()
  })
}

// Track user engagement
export const trackEngagement = (action: string, duration?: number) => {
  track('user_engagement', {
    action: action,
    duration: duration || 0,
    timestamp: new Date().toISOString()
  })
}
