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
import { Heart, Dumbbell, BookOpen } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { trackPageView } from '@/lib/analytics'

export default function Dashboard() {
  const theme = useThemeStyles() // Apply theme styles
  
  // Track page view
  React.useEffect(() => {
    trackPageView('dashboard', 'main')
  }, [])
  
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Morning Meditation', time: '7:00 AM', completed: true },
    { id: 2, name: 'Journal Entry', time: '7:30 AM', completed: true },
    { id: 3, name: 'Plan My Day', time: '8:00 AM', completed: false },
    { id: 4, name: 'Read for 30 mins', time: '9:00 AM', completed: false },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Research new productivity app', priority: 'High', completed: false },
    { id: 2, name: 'Draft weekly reflection email', priority: 'Medium', completed: false },
    { id: 3, name: 'Water my plants', priority: 'Low', completed: true },
  ])

  const [selectedMood, setSelectedMood] = useState<string>('')

  const moods: Mood[] = [
    { id: 'calm', emoji: '😊', label: 'Calm', color: 'blue' },
    { id: 'happy', emoji: '😄', label: 'Happy', color: 'yellow' },
    { id: 'energetic', emoji: '⚡', label: 'Energetic', color: 'orange' },
    { id: 'focused', emoji: '🧠', label: 'Focused', color: 'purple' },
    { id: 'creative', emoji: '🎨', label: 'Creative', color: 'pink' },
    { id: 'tired', emoji: '😩', label: 'Tired', color: 'gray' },
  ]

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleReflectionSave = (content: string) => {
    console.log('Saving reflection:', content)
    // Here you would typically save to your backend
  }

  return (
    <div className="min-h-screen theme-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Crush Your Day Card */}
                <HabitCard
                  habits={habits}
                  onToggleHabit={toggleHabit}
                />

                {/* What Needs Love Today Card */}
                <TaskCard
                  tasks={tasks}
                  onToggleTask={toggleTask}
                />

                {/* Today's Reflection Card */}
                <ReflectionComponent
                  onSave={handleReflectionSave}
                  variant="dashboard"
                />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
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
  )
}
