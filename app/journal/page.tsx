'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Card } from '@/components/atoms/Card'
import { ReflectionComponent } from '@/components/molecules/ReflectionComponent'
import { JournalEntry, JournalEntry as JournalEntryType } from '@/components/molecules/JournalEntry'
import { MessageCircle, CheckCircle, Cloud, Heart, Sparkles, Sun, Leaf, Loader2, Plus } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useJournalEntries } from '@/hooks/useDatabase'
import { useNotifications } from '@/contexts/NotificationContext'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/atoms/Button'

export default function Journal() {
  useThemeStyles() // Apply theme styles
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  
  // Use Supabase data hooks
  const { entries, loading, createEntry, updateEntry, deleteEntry } = useJournalEntries()
  
  const [isCreating, setIsCreating] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null)

  // Convert Supabase entries to JournalEntry format
  const convertToJournalEntry = (entry: any): JournalEntryType => {
    const icons = [CheckCircle, Cloud, Heart, Sparkles, Sun, Leaf]
    const colors = ['green', 'blue', 'pink', 'purple', 'yellow', 'green']
    
    // Use mood to determine icon/color, or random if no mood
    const moodIndex = entry.mood ? Math.abs(entry.mood.charCodeAt(0)) % icons.length : 0
    const icon = icons[moodIndex]
    const color = colors[moodIndex]
    
    return {
      id: entry.id, // Use the actual UUID from database instead of parseInt
      date: new Date(entry.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content: entry.content,
      icon,
      color
    }
  }

  const pastReflections = entries.map(convertToJournalEntry)

  const handleReflectionSave = async (content: string) => {
    if (!user) return
    
    setIsCreating(true)
    try {
      await createEntry({
        content,
        mood: 'reflective', // Default mood
        date: new Date().toISOString().split('T')[0],
      })
      
      addNotification({
        type: 'success',
        title: 'Reflection saved!',
        message: 'Your thoughts have been saved to your journal.',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Save failed',
        message: 'Failed to save your reflection. Please try again.',
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleEntryClick = (entry: JournalEntryType) => {
    setSelectedEntry(entry)
    console.log('Opening entry:', entry)
    // Here you would typically open a detailed view or modal
  }

  const handleDeleteEntry = async (entryId: string) => {
    try {
      await deleteEntry(entryId)
      addNotification({
        type: 'success',
        title: 'Entry deleted',
        message: 'Your journal entry has been removed.',
      })
      setSelectedEntry(null)
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Delete failed',
        message: 'Failed to delete the entry. Please try again.',
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
            <div className="max-w-6xl mx-auto">
              <div className="space-y-8">
                {/* Today's Reflection Section */}
                <ReflectionComponent 
                  onSave={handleReflectionSave} 
                  variant="journal"
                  isLoading={isCreating}
                />

                {/* Past Reflections Section */}
                <Card className="theme-surface rounded-2xl shadow-sm border-0 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 theme-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl text-vibed theme-text">Your Past Reflections</h2>
                        <p className="theme-text-secondary text-playful">Look back on your journey and see how far you've come.</p>
                      </div>
                    </div>
                    
                    {loading && (
                      <div className="flex items-center space-x-2 text-theme-text-secondary">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    )}
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 theme-primary mx-auto mb-4 animate-spin" />
                        <p className="theme-text-secondary">Loading your reflections...</p>
                      </div>
                    </div>
                  ) : pastReflections.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 theme-primary" />
                      </div>
                      <h3 className="text-lg font-semibold theme-text mb-2">No reflections yet</h3>
                      <p className="theme-text-secondary mb-6">Start your journaling journey by writing your first reflection above.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastReflections.map((reflection) => (
                        <JournalEntry
                          key={reflection.id}
                          entry={reflection}
                          onClick={handleEntryClick}
                        />
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
