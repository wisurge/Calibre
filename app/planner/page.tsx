'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Checkbox } from '@/components/atoms/Checkbox'
import { MoodSelector, Mood } from '@/components/molecules/MoodSelector'
import { ChevronLeft, ChevronRight, Sun, Plus, Calendar, Heart, Dumbbell, BookOpen } from 'lucide-react'
import { format, addDays, subDays } from 'date-fns'

export default function Planner() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMood, setSelectedMood] = useState<string>('')

  const [tasks, setTasks] = useState([
    // Morning Routine
    { id: 1, name: 'Meditation & Journaling', time: '07:00 AM - 07:30 AM', category: 'Mindfulness', completed: false, streak: 7 },
    { id: 2, name: 'Brew Coffee & Light Breakfast', time: '07:30 AM - 08:00 AM', category: 'Personal', subcategory: 'Nutrition', completed: true },
    { id: 3, name: 'Walk Dogs', time: '08:00 AM - 08:30 AM', category: 'Pet Care', completed: false },
    { id: 4, name: 'Morning Workout', time: '08:30 AM - 09:30 AM', category: 'Fitness', completed: false },
    
    // Afternoon Tasks
    { id: 5, name: 'Check & Respond to Emails', time: '10:00 AM - 11:00 AM', category: 'Work', completed: false },
    { id: 6, name: 'Team Standup Meeting', time: '11:00 AM - 12:00 PM', category: 'Work', subcategory: 'Meeting', completed: false },
    { id: 7, name: 'Lunch Break & Read', time: '12:00 PM - 01:00 PM', category: 'Personal', subcategory: 'Break', completed: true },
    { id: 8, name: 'Project Analytics Review', time: '01:00 PM - 03:00 PM', category: 'Work', subcategory: 'Focus', completed: false },
    
    // Evening Reflection
    { id: 9, name: 'Prepare Dinner', time: '06:00 PM - 07:00 PM', category: 'Cooking', completed: false },
    { id: 10, name: 'Read a Book', time: '07:00 PM - 08:00 PM', category: 'Leisure', subcategory: 'Personal', completed: false },
    { id: 11, name: 'Review Day & Plan Tomorrow', time: '08:00 PM - 08:30 PM', category: 'Planning', completed: false },
    { id: 12, name: 'Prepare for Sleep', time: '09:00 PM - 09:30 PM', category: 'Wellness', completed: false },
  ])

  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', icon: Heart, color: 'blue', completed: true },
    { id: 2, name: 'Exercise', icon: Dumbbell, color: 'green', completed: true },
    { id: 3, name: 'Read', icon: BookOpen, color: 'purple', completed: true },
  ])

  const moods: Mood[] = [
    { id: 'calm', emoji: '😊', label: 'Calm', color: 'blue' },
    { id: 'happy', emoji: '😄', label: 'Happy', color: 'yellow' },
    { id: 'energetic', emoji: '⚡', label: 'Energetic', color: 'orange' },
    { id: 'focused', emoji: '🧠', label: 'Focused', color: 'purple' },
    { id: 'creative', emoji: '🎨', label: 'Creative', color: 'pink' },
    { id: 'tired', emoji: '😩', label: 'Tired', color: 'gray' },
  ]

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'Mindfulness': '🧘',
      'Personal': '☕',
      'Pet Care': '🐕',
      'Fitness': '💪',
      'Work': '💻',
      'Cooking': '🍳',
      'Leisure': '📚',
      'Planning': '⭐',
      'Wellness': '😴',
    }
    return icons[category] || '📝'
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Mindfulness': 'bg-purple-100 text-purple-600',
      'Personal': 'bg-blue-100 text-blue-600',
      'Pet Care': 'bg-orange-100 text-orange-600',
      'Fitness': 'bg-red-100 text-red-600',
      'Work': 'bg-gray-100 text-gray-600',
      'Cooking': 'bg-yellow-100 text-yellow-600',
      'Leisure': 'bg-green-100 text-green-600',
      'Planning': 'bg-pink-100 text-pink-600',
      'Wellness': 'bg-indigo-100 text-indigo-600',
    }
    return colors[category] || 'bg-gray-100 text-gray-600'
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1))
  }

  const morningTasks = tasks.filter(task => task.time.includes('AM') && !task.time.includes('12:00'))
  const afternoonTasks = tasks.filter(task => task.time.includes('12:00') || (task.time.includes('PM') && !task.time.includes('06:00')))
  const eveningTasks = tasks.filter(task => task.time.includes('06:00') || task.time.includes('07:00') || task.time.includes('08:00') || task.time.includes('09:00'))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateDate('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    {format(currentDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <button
                  onClick={() => navigateDate('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Sun className="w-5 h-5 text-gray-600" />
                </button>
                <Button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content - Daily Schedule */}
              <div className="lg:col-span-3 space-y-8">
                {/* Morning Routine */}
                <Card className="bg-white rounded-2xl shadow-sm border-0 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h3 theme-text">Morning Routine</h2>
                    {morningTasks.some(task => task.streak) && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {morningTasks.find(task => task.streak)?.streak} Day Streak!
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {morningTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          color="purple"
                        />
                        <div className="text-2xl">{getCategoryIcon(task.category)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.name}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                            {task.subcategory && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                                {task.subcategory}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Afternoon Tasks */}
                <Card className="bg-white rounded-2xl shadow-sm border-0 p-6">
                  <h2 className="text-h3 theme-text mb-6">Afternoon Tasks</h2>
                  <div className="space-y-3">
                    {afternoonTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          color="purple"
                        />
                        <div className="text-2xl">{getCategoryIcon(task.category)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.name}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                            {task.subcategory && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                                {task.subcategory}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Evening Reflection */}
                <Card className="bg-white rounded-2xl shadow-sm border-0 p-6">
                  <h2 className="text-h3 theme-text mb-6">Evening Reflection</h2>
                  <div className="space-y-3">
                    {eveningTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          color="purple"
                        />
                        <div className="text-2xl">{getCategoryIcon(task.category)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.name}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                            {task.subcategory && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                                {task.subcategory}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Mood Selector */}
                <MoodSelector
                  moods={moods}
                  selectedMood={selectedMood}
                  onMoodSelect={setSelectedMood}
                />

                {/* Habit Tracker */}
                <Card className="bg-white rounded-2xl shadow-sm border-0 p-6">
                  <h3 className="text-h4 theme-text mb-4">Habit Tracker</h3>
                  <div className="space-y-4">
                    {habits.map((habit) => {
                      const IconComponent = habit.icon
                      return (
                        <div key={habit.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            habit.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            habit.color === 'green' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{habit.name}</span>
                          <Checkbox 
                            checked={habit.completed} 
                            onChange={() => toggleHabit(habit.id)} 
                            size="sm" 
                            color={habit.color as any}
                          />
                        </div>
                      )
                    })}
                  </div>
                </Card>

                {/* Motivational Quote */}
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm border-0 p-6">
                  <blockquote className="text-center">
                    <p className="text-gray-700 italic mb-2">
                      "The best way to predict the future is to create it."
                    </p>
                    <cite className="text-sm text-gray-500">— Peter Drucker</cite>
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

