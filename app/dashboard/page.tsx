'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Card } from '@/components/atoms/Card'
import { Checkbox } from '@/components/atoms/Checkbox'
import { MoodSelector, Mood } from '@/components/molecules/MoodSelector'
import { HabitCard, Habit } from '@/components/molecules/HabitCard'
import { TaskCard, Task } from '@/components/molecules/TaskCard'
import { ReflectionComponent } from '@/components/molecules/ReflectionComponent'
import { Heart, Dumbbell, BookOpen, Plus, Loader2 } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { trackPageView } from '@/lib/analytics'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useHabits, useTasks, useJournalEntries } from '@/hooks/useDatabase'
import { useNotifications } from '@/contexts/NotificationContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/atoms/Button'

export default function Dashboard() {
  const theme = useThemeStyles() // Apply theme styles
  const { addNotification } = useNotifications()
  const { user } = useAuth()
  
  // Track page view
  React.useEffect(() => {
    trackPageView('dashboard', 'main')
  }, [])
  
  // Use Supabase data hooks
  const { habits, loading: habitsLoading, toggleHabit, createHabit } = useHabits()
  const { tasks, loading: tasksLoading, toggleTask, createTask } = useTasks()
  const { createEntry } = useJournalEntries()
  
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [isCreatingHabit, setIsCreatingHabit] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isCreatingReflection, setIsCreatingReflection] = useState(false)

  const moods: Mood[] = [
    { id: 'calm', emoji: '😊', label: 'Calm', color: 'blue' },
    { id: 'happy', emoji: '😄', label: 'Happy', color: 'yellow' },
    { id: 'energetic', emoji: '⚡', label: 'Energetic', color: 'orange' },
    { id: 'focused', emoji: '🧠', label: 'Focused', color: 'purple' },
    { id: 'creative', emoji: '🎨', label: 'Creative', color: 'pink' },
    { id: 'tired', emoji: '😩', label: 'Tired', color: 'gray' },
  ]

  const handleToggleHabit = async (id: string | number) => {
    try {
      const habit = habits.find(h => h.id === id)
      if (habit) {
        await toggleHabit(id.toString(), !habit.completed)
        addNotification({
          type: 'success',
          title: 'Habit updated',
          message: `Habit "${habit.name}" marked as ${!habit.completed ? 'completed' : 'incomplete'}.`,
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update habit. Please try again.',
      })
    }
  }

  const handleToggleTask = async (id: string | number) => {
    try {
      const task = tasks.find(t => t.id === id)
      if (task) {
        await toggleTask(id.toString(), !task.completed)
        addNotification({
          type: 'success',
          title: 'Task updated',
          message: `Task "${task.name}" marked as ${!task.completed ? 'completed' : 'incomplete'}.`,
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update task. Please try again.',
      })
    }
  }

  const handleCreateHabit = async () => {
    setIsCreatingHabit(true)
    try {
      await createHabit({
        user_id: '', // Will be set by the service
        name: 'New Habit',
        description: 'A new habit to track',
        time: '9:00 AM',
        completed: false,
        streak: 0,
      })
      addNotification({
        type: 'success',
        title: 'Habit created',
        message: 'New habit has been added to your list.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to create habit. Please try again.',
      })
    } finally {
      setIsCreatingHabit(false)
    }
  }

  const handleCreateTask = async () => {
    setIsCreatingTask(true)
    try {
      await createTask({
        user_id: '', // Will be set by the service
        name: 'New Task',
        description: 'A new task to complete',
        priority: 'Medium',
        completed: false,
      })
      addNotification({
        type: 'success',
        title: 'Task created',
        message: 'New task has been added to your list.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to create task. Please try again.',
      })
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleReflectionSave = async (content: string) => {
    if (!user) return
    
    setIsCreatingReflection(true)
    try {
      await createEntry({
        content,
        mood: selectedMood || 'reflective',
        date: new Date().toISOString().split('T')[0],
      })
      addNotification({
        type: 'success',
        title: 'Reflection saved!',
        message: 'Your thoughts have been saved successfully.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to save reflection. Please try again.',
      })
    } finally {
      setIsCreatingReflection(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen theme-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Crush Your Day Card */}
                  <HabitCard
                    habits={habits}
                    onToggleHabit={handleToggleHabit}
                  />

                  {/* What Needs Love Today Card */}
                  <TaskCard
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                  />

                  {/* Today's Reflection Card */}
                  <ReflectionComponent
                    onSave={handleReflectionSave}
                    variant="dashboard"
                    isLoading={isCreatingReflection}
                  />
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Mood Selector */}
                  <MoodSelector
                    moods={moods}
                    selectedMood={selectedMood}
                    onMoodSelect={setSelectedMood}
                  />

                  {/* Habit Tracker */}
                  <Card className="theme-surface rounded-2xl shadow-sm border-0 p-6">
                    <h3 className="text-h4 theme-text mb-4">Habit Tracker</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-theme-secondary rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 theme-primary" />
                        </div>
                        <span className="text-sm font-medium theme-text-secondary">Drink Water</span>
                        <Checkbox checked={true} onChange={() => {}} size="sm" color="blue" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-theme-accent rounded-full flex items-center justify-center">
                          <Dumbbell className="w-4 h-4 theme-primary" />
                        </div>
                        <span className="text-sm font-medium theme-text-secondary">Exercise</span>
                        <Checkbox checked={true} onChange={() => {}} size="sm" color="green" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-theme-secondary rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 theme-primary" />
                        </div>
                        <span className="text-sm font-medium theme-text-secondary">Read</span>
                        <Checkbox checked={true} onChange={() => {}} size="sm" color="purple" />
                      </div>
                    </div>
                  </Card>

                  {/* Motivational Quote */}
                  <Card className="bg-theme-accent rounded-2xl shadow-sm border-0 p-6">
                    <blockquote className="text-center">
                      <p className="theme-text-secondary italic mb-2">
                        &ldquo;The best way to predict the future is to create it.&rdquo;
                      </p>
                      <cite className="text-sm theme-text-secondary">— Peter Drucker</cite>
                    </blockquote>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
