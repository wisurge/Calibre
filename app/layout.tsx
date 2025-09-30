import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from '@/components/molecules/Toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppContent } from '@/components/AppContent'
import { RouteTransitionProvider, RouteTransitionIndicator } from '@/components/RouteTransition'
import React from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap'
})


export const metadata: Metadata = {
  title: 'Calibre - Your Personal Standards, Your Growth',
  description: 'A modern productivity app built with Next.js, featuring habit tracking, goal setting, journaling, and daily planning.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check for old routinsie-theme key and migrate to calibre-theme
                  let savedTheme = localStorage.getItem('calibre-theme');
                  if (!savedTheme) {
                    const oldTheme = localStorage.getItem('routinsie-theme');
                    if (oldTheme) {
                      localStorage.setItem('calibre-theme', oldTheme);
                      localStorage.removeItem('routinsie-theme');
                      savedTheme = oldTheme;
                    }
                  }
                  const themes = {
                    'minty-fresh': {
                      primary: '#10B981',
                      secondary: '#F3E8FF',
                      accent: '#A7F3D0',
                      background: '#F0FDF4',
                      surface: '#FFFFFF',
                      text: '#064E3B',
                      textSecondary: '#6B7280',
                      border: '#D1FAE5'
                    },
                    'lilac-dream': {
                      primary: '#8B5CF6',
                      secondary: '#FDE2E7',
                      accent: '#E9D5FF',
                      background: '#FAF5FF',
                      surface: '#FFFFFF',
                      text: '#4C1D95',
                      textSecondary: '#6B7280',
                      border: '#DDD6FE'
                    },
                    'blush-harmony': {
                      primary: '#EC4899',
                      secondary: '#DBEAFE',
                      accent: '#FDE2E7',
                      background: '#FDF2F8',
                      surface: '#FFFFFF',
                      text: '#831843',
                      textSecondary: '#6B7280',
                      border: '#FBCFE8'
                    },
                    'sky-serene': {
                      primary: '#3B82F6',
                      secondary: '#A7F3D0',
                      accent: '#DBEAFE',
                      background: '#EFF6FF',
                      surface: '#FFFFFF',
                      text: '#1E3A8A',
                      textSecondary: '#6B7280',
                      border: '#BFDBFE'
                    }
                  };
                  
                  const themeId = savedTheme || 'minty-fresh';
                  const theme = themes[themeId] || themes['minty-fresh'];
                  
                  const root = document.documentElement;
                  root.style.setProperty('--theme-primary', theme.primary);
                  root.style.setProperty('--theme-secondary', theme.secondary);
                  root.style.setProperty('--theme-accent', theme.accent);
                  root.style.setProperty('--theme-background', theme.background);
                  root.style.setProperty('--theme-surface', theme.surface);
                  root.style.setProperty('--theme-text', theme.text);
                  root.style.setProperty('--theme-text-secondary', theme.textSecondary);
                  root.style.setProperty('--theme-border', theme.border);
                  
                  // Add loaded class to enable transitions
                  setTimeout(() => {
                    root.classList.add('loaded');
                  }, 0);
                } catch (e) {
                  // Fallback to default theme if localStorage fails
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans overflow-x-hidden`}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <NotificationProvider>
                <RouteTransitionProvider>
                  <AppContent>
                    {children}
                  </AppContent>
                  <ToastContainer />
                </RouteTransitionProvider>
              </NotificationProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
