'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { GoalCard, Goal } from '@/components/molecules/GoalCard'
import { QuoteCard, Quote } from '@/components/molecules/QuoteCard'
import { Target, Laptop, BookOpen, User, Zap, Lightbulb, Sparkles } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export default function Goals() {
  useThemeStyles() // Apply theme styles
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Master React Hooks',
      description: 'Deepen understanding and practical application of advanced React Hooks like useContext and useReducer.',
      progress: 85,
      icon: Laptop,
      color: 'blue',
      completed: false
    },
    {
      id: 2,
      title: 'Read "Atomic Habits"',
      description: 'Complete reading "Atomic Habits" and apply at least three key principles to daily routines.',
      progress: 100,
      icon: BookOpen,
      color: 'green',
      completed: true
    },
    {
      id: 3,
      title: 'Daily Meditation Practice',
      description: 'Establish a consistent 10-minute daily meditation practice for mental clarity and focus.',
      progress: 60,
      icon: User,
      color: 'yellow',
      completed: false
    },
    {
      id: 4,
      title: 'Learn a New Language',
      description: 'Dedicate 30 minutes daily to learning Spanish using language learning apps and resources.',
      progress: 45,
      icon: Target,
      color: 'purple',
      completed: false
    },
    {
      id: 5,
      title: 'Complete a Marathon',
      description: 'Follow a 16-week training plan to prepare for and complete a full marathon.',
      progress: 20,
      icon: Zap,
      color: 'orange',
      completed: false
    },
    {
      id: 6,
      title: 'Start a Side Project',
      description: 'Launch a small web application to showcase new skills and generate passive income.',
      progress: 70,
      icon: Lightbulb,
      color: 'yellow',
      completed: false
    },
  ])

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

  const handlePeekProgress = (id: number) => {
    console.log('Peeking progress for goal:', id)
    // Here you would typically show a detailed progress modal
  }

  const handleMarkComplete = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  return (
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
                <Button className="bg-theme-primary text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center space-x-2 mx-auto">
                  <Target className="w-5 h-5" />
                  <span>Grow a New Goal</span>
                </Button>
              </div>

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
  )
}
