'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { GoalCard, Goal } from '@/components/molecules/GoalCard'
import { QuoteCard, Quote } from '@/components/molecules/QuoteCard'
import { Target, Laptop, BookOpen, User, Zap, Lightbulb, Sparkles, Plus, Loader2 } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useGoals } from '@/hooks/useDatabase'
import { useNotifications } from '@/contexts/NotificationContext'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Goals() {
  useThemeStyles() // Apply theme styles
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  
  // Use Supabase data hooks
  const { goals: supabaseGoals, loading, createGoal, updateGoal, deleteGoal } = useGoals()
  
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Personal',
    color: 'purple',
    target_value: 100
  })

  // Convert Supabase goals to Goal format
  const convertToGoal = (goal: any): Goal => {
    const icons = [Target, Laptop, BookOpen, User, Zap, Lightbulb]
    const colors = ['blue', 'green', 'yellow', 'purple', 'orange', 'pink']
    
    // Use category to determine icon/color
    const categoryIndex = goal.category ? Math.abs(goal.category.charCodeAt(0)) % icons.length : 0
    const icon = icons[categoryIndex]
    const color = colors[categoryIndex]
    
    return {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      progress: goal.progress,
      icon,
      color,
      completed: goal.completed
    }
  }

  const goals = supabaseGoals.map(convertToGoal)

  const quotes: Quote[] = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    }
  ]

  const handlePeekProgress = (id: string | number) => {
    console.log('Peeking progress for goal:', id)
    // Here you would typically show a detailed progress modal
  }

  const handleMarkComplete = async (id: string | number) => {
    try {
      const goal = supabaseGoals.find(g => g.id === id)
      if (goal) {
        await updateGoal(id.toString(), { 
          completed: !goal.completed,
          progress: !goal.completed ? 100 : goal.progress
        })
        
        addNotification({
          type: 'success',
          title: goal.completed ? 'Goal reopened!' : 'Goal completed!',
          message: goal.completed ? 'You can continue working on this goal.' : 'Congratulations on completing your goal!',
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update failed',
        message: 'Failed to update goal. Please try again.',
      })
    }
  }

  const handleCreateGoal = async () => {
    if (!user || !newGoal.title.trim()) return
    
    setIsCreating(true)
    try {
      await createGoal({
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        color: newGoal.color,
        target_value: newGoal.target_value,
        progress: 0,
        completed: false
      })
      
      addNotification({
        type: 'success',
        title: 'Goal created!',
        message: 'Your new goal has been added successfully.',
      })
      
      // Reset form
      setNewGoal({
        title: '',
        description: '',
        category: 'Personal',
        color: 'purple',
        target_value: 100
      })
      setShowCreateForm(false)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Creation failed',
        message: 'Failed to create goal. Please try again.',
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateProgress = async (id: string | number, progress: number) => {
    try {
      await updateGoal(id.toString(), { progress })
      addNotification({
        type: 'success',
        title: 'Progress updated!',
        message: 'Your goal progress has been updated.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update failed',
        message: 'Failed to update progress. Please try again.',
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen theme-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-theme-secondary rounded-xl flex items-center justify-center">
                    <Target className="w-8 h-8 theme-primary" />
                  </div>
                  <h1 className="text-4xl text-heading theme-text">Your Goals, Your Journey</h1>
                </div>
                <p className="text-xl theme-text-secondary mb-8 text-playful">
                  Let&apos;s track your progress and celebrate every win, big or small!
                </p>
                <Button 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-theme-primary text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Grow a New Goal</span>
                </Button>
              </div>

              {/* Create Goal Form */}
              {showCreateForm && (
                <Card className="theme-surface rounded-2xl shadow-sm border-0 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
                      <Plus className="w-6 h-6 theme-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-vibed theme-text">Create New Goal</h2>
                      <p className="theme-text-secondary text-playful">Set a new goal and start tracking your progress.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2">Goal Title</label>
                      <input
                        type="text"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        placeholder="Enter your goal title..."
                        className="w-full p-3 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium theme-text mb-2">Description</label>
                      <textarea
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        placeholder="Describe your goal..."
                        rows={3}
                        className="w-full p-3 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">Category</label>
                        <select
                          value={newGoal.category}
                          onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                          className="w-full p-3 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Professional">Professional</option>
                          <option value="Health">Health</option>
                          <option value="Learning">Learning</option>
                          <option value="Creative">Creative</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">Color</label>
                        <select
                          value={newGoal.color}
                          onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
                          className="w-full p-3 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface"
                        >
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="yellow">Yellow</option>
                          <option value="purple">Purple</option>
                          <option value="orange">Orange</option>
                          <option value="pink">Pink</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">Target Value</label>
                        <input
                          type="number"
                          value={newGoal.target_value}
                          onChange={(e) => setNewGoal({ ...newGoal, target_value: parseInt(e.target.value) || 100 })}
                          min="1"
                          max="1000"
                          className="w-full p-3 border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleCreateGoal}
                        disabled={!newGoal.title.trim() || isCreating}
                        className="bg-theme-primary text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
                      >
                        {isCreating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Create Goal</span>
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => setShowCreateForm(false)}
                        variant="outline"
                        className="px-6 py-3 rounded-lg font-medium"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Current Missions Section */}
              <Card className="theme-surface rounded-2xl shadow-sm border-0 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 theme-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-vibed theme-text">My Current Missions</h2>
                    <p className="theme-text-secondary text-playful">Track your progress and stay motivated on your journey.</p>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-6 h-6 animate-spin theme-primary" />
                      <span className="theme-text">Loading your goals...</span>
                    </div>
                  </div>
                ) : goals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-theme-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 theme-primary" />
                    </div>
                    <h3 className="text-xl font-medium theme-text mb-2">No goals yet</h3>
                    <p className="theme-text-secondary mb-6">Create your first goal to start tracking your progress!</p>
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-theme-primary text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Your First Goal</span>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        onPeekProgress={handlePeekProgress}
                        onMarkComplete={handleMarkComplete}
                      />
                    ))}
                  </div>
                )}
              </Card>

              {/* Fuel Your Growth Section */}
              <Card className="theme-surface rounded-2xl shadow-sm border-0 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-theme-accent rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 theme-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-vibed theme-text">Fuel Your Growth</h2>
                    <p className="theme-text-secondary text-playful">Inspirational quotes to keep you motivated on your journey.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quotes.map((quote, index) => (
                    <QuoteCard
                      key={index}
                      quote={quote}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  )
}
