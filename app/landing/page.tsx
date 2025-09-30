'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Logo } from '@/components/atoms/Logo'
import { ArrowRight, CheckCircle, Star, Users, Zap, Heart, Target, Clock, TrendingUp, Shield, Sparkles, Calendar, BookOpen, Award, Coffee, Moon, Sunrise, PenTool, Palette, Lightbulb, Compass } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { Inter, Poppins, Space_Grotesk } from 'next/font/google'

// Fun and productive fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export default function LandingPage() {
  const theme = useThemeStyles()

  const heroStats = [
    { number: '847K', label: 'Life Moments Captured', icon: '⏰' },
    { number: '156', label: 'Days Since Last Breakthrough', icon: '🚀' },
    { number: '∞', label: 'Potential Unlocked', icon: '💎' }
  ]

  const identityPillars = [
    {
      icon: <Sunrise className="w-8 h-8" />,
      title: 'Your Morning Rituals',
      description: 'How you start your day defines who you become. Track the small moments that shape your character.',
      gradient: 'from-amber-500 to-orange-600',
      quote: "The way you wake up is the way you live your life"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Your Sacred Commitments',
      description: 'Not just goals, but promises you make to yourself. What you prioritize reveals your true values.',
      gradient: 'from-emerald-500 to-teal-600',
      quote: "Your calendar is your autobiography"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Your Emotional Landscape',
      description: 'Track the ebb and flow of your inner world. Your feelings are data points in your growth story.',
      gradient: 'from-rose-500 to-pink-600',
      quote: "Feelings are the language of the soul"
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: 'Your Evening Reflections',
      description: 'How you end your day determines how you dream. Capture the wisdom of each sunset.',
      gradient: 'from-purple-500 to-violet-600',
      quote: "The day is done, but the learning never stops"
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Startup Founder',
      avatar: 'SC',
      content: 'My calendar used to be a prison. Now it\'s my autobiography. Every block tells the story of who I\'m becoming.',
      rating: 5,
      achievement: 'Raised $2M Series A',
      calendarInsight: '47 morning walks this month'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Artist & Designer',
      avatar: 'MR',
      content: 'I discovered my creative rhythm through my evening reflections. Calibre helped me see that my best ideas come at 11 PM.',
      rating: 5,
      achievement: 'Gallery exhibition opening',
      calendarInsight: '23 creative breakthroughs logged'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Physician & Mother',
      avatar: 'PP',
      content: 'Between saving lives and raising kids, I learned that my calendar reveals my values. Calibre helped me align my time with my heart.',
      rating: 5,
      achievement: 'Work-life harmony achieved',
      calendarInsight: '156 bedtime stories read'
    }
  ]

  const socialProof = [
    { icon: <Shield className="w-5 h-5" />, text: 'Enterprise-grade security' },
    { icon: <TrendingUp className="w-5 h-5" />, text: '98% user retention rate' },
    { icon: <Award className="w-5 h-5" />, text: 'Product of the Year 2024' },
    { icon: <Users className="w-5 h-5" />, text: 'Trusted by 50K+ professionals' }
  ]

  return (
    <div className="min-h-screen theme-background">
      {/* Header */}
      <header className="theme-surface shadow-sm border-b border-theme-border sticky top-0 z-50 backdrop-blur-sm bg-theme-surface/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" variant="full" />
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" className="relative overflow-hidden group">
                  <span className="relative z-10">Start Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-emerald-50/20"></div>
        <div className="absolute top-16 left-8 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-8 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl"></div>
        
        {/* Doodle Elements */}
        <div className="absolute top-28 left-6 w-14 h-14 opacity-25 animate-bounce">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
            <span className="text-xl">📅</span>
          </div>
        </div>
        
        <div className="absolute top-40 right-10 w-10 h-10 opacity-30 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform rotate-12">
            <span className="text-lg">✨</span>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-12 w-16 h-16 opacity-20 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center transform -rotate-12">
            <span className="text-xl">💭</span>
          </div>
        </div>
        
        <div className="absolute top-56 right-20 w-12 h-12 opacity-25 animate-bounce">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center transform rotate-45">
            <span className="text-lg">🎯</span>
          </div>
        </div>
        
        {/* Floating Doodle Lines */}
        <div className="absolute top-36 left-1/4 w-28 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-25 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-48 right-1/3 w-20 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-25 transform -rotate-12 animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Main Headline */}
            <div className="space-y-6 relative">
              {/* Doodle Elements around headline */}
              <div className="absolute -top-6 -left-6 w-6 h-6 opacity-30 animate-bounce">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">🎨</span>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-8 w-5 h-5 opacity-25 animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-xs">💫</span>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -left-12 w-8 h-8 opacity-20 animate-bounce">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center transform -rotate-12">
                  <span className="text-xs">🌟</span>
                </div>
              </div>
              
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-vibed theme-text leading-tight relative ${spaceGrotesk.className}`}>
                Your calendar is
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative">
                  who you are
                  {/* Doodle underline */}
                  <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40 transform -skew-y-1 animate-pulse"></div>
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl relative">
                  and what you do
                  {/* Doodle decoration */}
                  <div className="absolute -top-2 -right-4 w-4 h-4 opacity-30 animate-pulse">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-full"></div>
                  </div>
                </span>
              </h1>
              
              <p className={`text-xl sm:text-2xl theme-text-secondary max-w-4xl mx-auto leading-relaxed relative ${inter.className}`}>
                Every appointment reveals your priorities. Every habit shapes your character. Every choice in your calendar 
                is a vote for the person you're becoming. <span className="font-semibold text-blue-600 relative">
                  This is your life, not just your schedule.
                  {/* Doodle highlight */}
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-orange-200/30 to-amber-200/30 rounded-full transform -skew-y-1 animate-pulse"></div>
                </span>
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                  Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl sm:text-4xl font-bold theme-text ${poppins.className}`}>{stat.number}</div>
                  <div className={`text-sm theme-text-secondary font-medium ${inter.className}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Identity Pillars Section */}
      <section className="py-24 bg-gradient-to-b from-theme-surface to-theme-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/15 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-800/40 dark:to-blue-800/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-orange-300/60 dark:border-orange-600/40 shadow-sm ${poppins.className}`}>
              <span className="animate-bounce">🌅</span>
              <span>The Four Pillars of Your Identity</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold text-vibed theme-text mb-6 ${spaceGrotesk.className}`}>
              Your calendar reveals
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">your true self</span>
            </h2>
            <p className={`text-xl theme-text-secondary max-w-4xl mx-auto leading-relaxed ${inter.className}`}>
              Every moment you choose to block out is a declaration of who you are. 
              These four pillars form the foundation of your identity through time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {identityPillars.map((pillar, index) => (
              <Card key={index} className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Doodle Elements */}
                <div className="absolute top-4 right-4 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-xs">🎨</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 w-4 h-4 opacity-15 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform -rotate-12">
                    <span className="text-xs">✨</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                    {pillar.icon}
                    {/* Doodle decoration on icon */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 opacity-60 animate-pulse">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs">💫</span>
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold theme-text mb-4 group-hover:theme-primary transition-colors relative ${spaceGrotesk.className}`}>
                    {pillar.title}
                    {/* Doodle underline */}
                    <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 transform -skew-y-1"></div>
                  </h3>
                  <p className={`text-lg theme-text-secondary leading-relaxed mb-4 ${inter.className}`}>
                    {pillar.description}
                  </p>
                  <div className="relative">
                    <div className={`border-l-4 border-gradient-to-b from-blue-500 to-indigo-600 pl-4 italic text-blue-600 dark:text-blue-400 font-medium ${poppins.className}`}>
                      "{pillar.quote}"
                    </div>
                    {/* Doodle quote decoration */}
                    <div className="absolute -left-2 top-2 w-2 h-2 opacity-30">
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Philosophy Section */}
          <div className="mt-20 text-center relative">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl border border-blue-200/50 relative overflow-hidden">
              {/* Doodle Elements */}
              <div className="absolute top-6 left-6 w-8 h-8 opacity-20 animate-bounce">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">🎨</span>
                </div>
              </div>
              
              <div className="absolute top-8 right-8 w-6 h-6 opacity-25 animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-xs">✨</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-8 w-10 h-10 opacity-15 animate-bounce">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center transform -rotate-12">
                  <span className="text-sm">💭</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-6 w-4 h-4 opacity-30 animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">🌟</span>
                </div>
              </div>
              
              {/* Doodle Lines */}
              <div className="absolute top-1/2 left-4 w-16 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30 transform rotate-12 animate-pulse"></div>
              <div className="absolute top-1/3 right-4 w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform -rotate-12 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className={`text-3xl font-bold theme-text mb-6 relative ${spaceGrotesk.className}`}>
                  The Calendar Philosophy
                  {/* Doodle underline */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40 transform -skew-y-1 animate-pulse"></div>
                </h3>
                <p className={`text-xl theme-text-secondary leading-relaxed mb-6 relative ${inter.className}`}>
                  Most people think a calendar is just a tool to manage time. We believe your calendar is 
                  <span className="font-bold text-blue-600 relative">
                    the most honest mirror of your soul
                    {/* Doodle highlight */}
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-orange-200/30 to-amber-200/30 rounded-full transform -skew-y-1 animate-pulse"></div>
                  </span>. 
                  It shows what you truly value, who you're becoming, and where your heart leads you.
                </p>
                <div className="flex items-center justify-center space-x-2 text-2xl relative">
                  <span className="animate-bounce">⏰</span>
                  <span className="text-blue-600 font-semibold">=</span>
                  <span className="animate-pulse">💎</span>
                  <span className="text-blue-600 font-semibold">=</span>
                  <span className="animate-bounce">🌟</span>
                  
                  {/* Doodle decorations around equation */}
                  <div className="absolute -top-2 -left-8 w-3 h-3 opacity-30">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-8 w-3 h-3 opacity-30">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-theme-background to-theme-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-800/40 dark:to-teal-800/40 text-emerald-800 dark:text-emerald-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-300/60 dark:border-emerald-600/40 shadow-sm ${poppins.className}`}>
              <span className="animate-pulse">💫</span>
              <span>Stories from the Calendar</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold text-vibed theme-text mb-6 ${spaceGrotesk.className}`}>
              Real people,
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> real calendars</span>
            </h2>
            <p className={`text-xl theme-text-secondary max-w-4xl mx-auto leading-relaxed ${inter.className}`}>
              These are the stories of people who discovered that their calendar wasn't just a schedule—
              it was the key to unlocking their authentic self and deepest values.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
                
                {/* Doodle Elements */}
                <div className="absolute top-6 right-6 w-5 h-5 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-xs">💫</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 w-4 h-4 opacity-15 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform -rotate-12">
                    <span className="text-xs">✨</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                  
                  {/* Quote */}
                  <blockquote className={`text-lg theme-text-secondary mb-6 leading-relaxed italic ${inter.className}`}>
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg ${poppins.className}`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className={`font-bold theme-text ${spaceGrotesk.className}`}>{testimonial.name}</p>
                      <p className={`text-sm theme-text-secondary ${inter.className}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Calendar Insight */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-700/50 dark:to-teal-700/50 rounded-lg border-2 border-emerald-400 dark:border-emerald-500 shadow-md">
                    <div className={`flex items-center space-x-2 text-emerald-900 dark:text-emerald-100 ${poppins.className}`}>
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-bold">Calendar Insight:</span>
                    </div>
                    <p className={`text-sm text-gray-900 dark:text-white mt-1 font-bold ${inter.className}`}>
                      {testimonial.calendarInsight}
                    </p>
                  </div>
                  
                  {/* Achievement Badge */}
                  <div className={`mt-3 inline-flex items-center space-x-2 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-700/50 dark:to-orange-700/50 text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-amber-400 dark:border-amber-500 shadow-md ${poppins.className}`}>
                    <Award className="w-3 h-3" />
                    <span>{testimonial.achievement}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Social Proof */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-8 opacity-60">
              {socialProof.map((proof, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm theme-text-secondary">
                  {proof.icon}
                  <span>{proof.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-8">
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight ${spaceGrotesk.className}`}>
                Ready to discover
                <br />
                <span className="text-blue-200">who you really are?</span>
              </h2>
              <p className={`text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed ${inter.className}`}>
                Your calendar is waiting to tell your story. Every moment you block out is a choice about 
                who you're becoming. <span className="font-semibold text-blue-200">What will your calendar say about you?</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup">
                <Button variant="primary" size="lg" className={`bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold relative overflow-hidden group ${poppins.className}`}>
                  <span className="relative z-10 flex items-center">
                    Start Your Calendar Story
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Sign In
              </Button>
            </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className={`flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 text-blue-200 ${inter.className}`}>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Setup in under 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="theme-surface border-t border-theme-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Logo size="md" variant="full" />
              <p className={`text-lg theme-text-secondary mt-4 max-w-md leading-relaxed ${inter.className}`}>
                Your calendar is your autobiography. Every appointment, every habit, every choice 
                reveals who you truly are. This is your life, not just your schedule.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className={`flex items-center space-x-2 text-sm theme-text-secondary ${inter.className}`}>
                  <Calendar className="w-4 h-4" />
                  <span>Your story in time</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm theme-text-secondary ${inter.className}`}>
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Made with intention</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold theme-text mb-4">Product</h4>
              <div className="space-y-3">
                <Link href="/features" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Pricing
                </Link>
                <Link href="/integrations" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Integrations
                </Link>
                <Link href="/api" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  API
                </Link>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold theme-text mb-4">Company</h4>
              <div className="space-y-3">
                <Link href="/about" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  About
                </Link>
                <Link href="/careers" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Careers
                </Link>
                <Link href="/blog" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="block text-sm theme-text-secondary hover:theme-text transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-theme-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm theme-text-secondary">
                <span>© 2025 Calibre. All rights reserved.</span>
                <Link href="/privacy" className="hover:theme-text transition-colors">
                Privacy Policy
              </Link>
                <Link href="/terms" className="hover:theme-text transition-colors">
                Terms of Service
              </Link>
              </div>
              <div className={`flex items-center space-x-2 text-sm theme-text-secondary ${inter.className}`}>
                <span>Built for</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
                  your story
                </span>
                <span>⏰</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
