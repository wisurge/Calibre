'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Card } from '@/components/atoms/Card'
import { ReflectionComponent } from '@/components/molecules/ReflectionComponent'
import { JournalEntry, JournalEntry as JournalEntryType } from '@/components/molecules/JournalEntry'
import { MessageCircle, CheckCircle, Cloud, Heart, Sparkles, Sun, Leaf } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export default function Journal() {
  useThemeStyles() // Apply theme styles
  
  const [pastReflections, setPastReflections] = useState<JournalEntryType[]>([
    {
      id: 1,
      date: 'July 23, 2025',
      content: 'Had a really productive morning tackling my to-do list. Felt a sense of calm accomplishment.',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 2,
      date: 'July 22, 2025',
      content: 'Feeling a bit overwhelmed with work lately. Took a long walk in the park to clear my head, and it...',
      icon: Cloud,
      color: 'blue'
    },
    {
      id: 3,
      date: 'July 21, 2025',
      content: 'A wonderful day spent with friends, laughing and sharing stories. It\'s so important to nurture these...',
      icon: Heart,
      color: 'pink'
    },
    {
      id: 4,
      date: 'July 20, 2025',
      content: 'Discovered a new healthy recipe that was surprisingly delicious! Feeling inspired to try...',
      icon: Sparkles,
      color: 'purple'
    },
    {
      id: 5,
      date: 'July 19, 2025',
      content: 'Managed to finish that challenging project. It was tough, but the satisfaction of seeing it through is...',
      icon: Sun,
      color: 'yellow'
    },
    {
      id: 6,
      date: 'July 18, 2025',
      content: 'Spent some time gardening today, watching the plants grow. It\'s so therapeutic and grounding.',
      icon: Leaf,
      color: 'green'
    },
  ])

  const handleReflectionSave = (content: string) => {
    const newEntry: JournalEntryType = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content,
      icon: CheckCircle,
      color: 'green'
    }
    setPastReflections(prev => [newEntry, ...prev])
  }

  const handleEntryClick = (entry: JournalEntryType) => {
    console.log('Opening entry:', entry)
    // Here you would typically open a detailed view or modal
  }

  return (
    <div className="min-h-screen theme-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Today's Reflection Section */}
              <ReflectionComponent 
                onSave={handleReflectionSave} 
                variant="journal"
              />

              {/* Past Reflections Section */}
              <Card className="theme-surface rounded-2xl shadow-sm border-0 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 theme-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-vibed theme-text">Your Past Reflections</h2>
                    <p className="theme-text-secondary text-playful">Look back on your journey and see how far you've come.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastReflections.map((reflection) => (
                    <JournalEntry
                      key={reflection.id}
                      entry={reflection}
                      onClick={handleEntryClick}
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
