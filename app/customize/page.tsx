'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { ThemeCard, Theme } from '@/components/molecules/ThemeCard'
import { ThemePreview } from '@/components/molecules/ThemePreview'
import { LivePreview } from '@/components/molecules/LivePreview'
import { Card } from '@/components/atoms/Card'
import { MintyFreshPreview, LilacDreamPreview, BlushHarmonyPreview, SkySerenePreview } from '@/components/atoms/ThemePreviews'
import { Palette } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export default function Customize() {
  const { currentTheme, setTheme, themes } = useTheme()
  const theme = useThemeStyles() // Apply theme styles
  
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id)

  const themePreviews = {
    'minty-fresh': <MintyFreshPreview />,
    'lilac-dream': <LilacDreamPreview />,
    'blush-harmony': <BlushHarmonyPreview />,
    'sky-serene': <SkySerenePreview />
  }

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setTheme(themeId)
  }

  const selectedThemeData = themes.find(t => t.id === selectedTheme)

  return (
    <div className="min-h-screen theme-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl text-heading theme-text mb-4">
                  Your Calendar Doesn&apos;t Have to Be Ugly.
                </h1>
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
                    <Palette className="w-6 h-6 theme-primary" />
                  </div>
                  <h2 className="text-2xl text-vibed theme-text">Choose Your Vibe ✨</h2>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={{
                      id: theme.id,
                      name: theme.name,
                      colors: [theme.colors.accent, theme.colors.secondary, theme.colors.primary, theme.colors.border],
                      preview: themePreviews[theme.id as keyof typeof themePreviews],
                      active: selectedTheme === theme.id
                    }}
                    isSelected={selectedTheme === theme.id}
                    onSelect={handleThemeSelect}
                  />
                ))}
              </div>

              {/* Live Preview Section */}
              <ThemePreview
                selectedThemeName={selectedThemeData?.name || ''}
                previewElements={
                  selectedThemeData ? (
                    <LivePreview themeColors={[selectedThemeData.colors.accent, selectedThemeData.colors.secondary, selectedThemeData.colors.primary, selectedThemeData.colors.border]} />
                  ) : null
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
