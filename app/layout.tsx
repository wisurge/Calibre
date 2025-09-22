import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/organisms/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SidebarProvider } from '@/contexts/SidebarContext'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Routinsie - Your Personal Productivity Companion',
  description: 'A modern productivity app built with Next.js, featuring habit tracking, goal setting, journaling, and daily planning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans overflow-x-hidden`}>
        <ThemeProvider>
          <SidebarProvider>
            {children}
            <Footer />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
