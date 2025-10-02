'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Logo } from '@/components/atoms/Logo'
import { ArrowRight, CheckCircle, Star, Users, Zap, Heart, Target, Clock, TrendingUp, Shield, Sparkles, Calendar, BookOpen, Award, Coffee, Moon, Sunrise, PenTool, Palette, Lightbulb, Compass } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useGsapAnimations } from '@/hooks/useGsapAnimations'
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

export default function LandingPageGSAP() {
  const theme = useThemeStyles()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Use our custom GSAP animations hook
  const {
    heroRef,
    headlineRef,
    subtitleRef,
    ctaRef,
    featuresRef,
    testimonialsRef,
    footerRef
  } = useGsapAnimations({ prefersReducedMotion })

  const heroStats = [
    { number: '847K', label: 'Life Moments Captured', icon: '⏰' },
    { number: '156', label: 'Days Since Last Breakthrough', icon: '🚀' },
    { number: '∞', label: 'Potential Unlocked', icon: '💎' }
  ]

  const features = [
    {
      title: 'Dashboard Overview',
      subtitle: 'Your Life at a Glance',
      description: 'See your entire life in one beautiful dashboard. Track habits, goals, mood, and progress all in one place. Your personal command center for growth.',
      image: '/images/dashboard-screenshot.png',
      features: ['Habit tracking', 'Goal progress', 'Mood insights', 'Productivity metrics'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Smart Calendar',
      subtitle: 'Time That Reflects Your Values',
      description: 'Your calendar becomes a reflection of who you are. Block time for what matters, track patterns, and see how you\'re spending your most precious resource.',
      image: '/images/calendar-screenshot.png',
      features: ['Time blocking', 'Pattern analysis', 'Value alignment', 'Smart scheduling'],
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Journal & Reflection',
      subtitle: 'Capture Your Growth Story',
      description: 'Turn your thoughts into insights. Our intelligent journaling helps you reflect, track patterns, and understand your emotional landscape.',
      image: '/images/journal-screenshot.png',
      features: ['Smart prompts', 'Mood tracking', 'Pattern recognition', 'Growth insights'],
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Goals & Habits',
      subtitle: 'Build Your Future Self',
      description: 'Transform aspirations into achievements. Track habits, set meaningful goals, and watch your progress unfold with beautiful visualizations.',
      image: '/images/goals-screenshot.png',
      features: ['Habit streaks', 'Goal tracking', 'Progress visualization', 'Achievement rewards'],
      gradient: 'from-orange-500 to-amber-600'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      avatar: 'SC',
      content: 'My calendar used to be a prison. Now it\'s my autobiography. Every block tells the story of who I\'m becoming.',
      rating: 5,
      calendarInsight: '47 morning walks this month',
      achievement: 'Raised $2M Series A'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Developer',
      avatar: 'MR',
      content: 'I discovered my creative rhythm through my evening reflections. Calibre helped me see that my best ideas come at 11 PM.',
      rating: 5,
      calendarInsight: '23 late-night coding sessions',
      achievement: 'Launched 3 successful apps'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Designer',
      avatar: 'PP',
      content: 'Between saving lives and raising kids, I learned that my calendar reveals my values. Calibre helped me align my time with my heart.',
      rating: 5,
      calendarInsight: '156 hours with family',
      achievement: 'Published medical research'
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
      <section ref={heroRef} className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-emerald-50/20"></div>
        <div className="absolute top-16 left-8 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl bg-blur-1"></div>
        <div className="absolute bottom-16 right-8 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl bg-blur-2"></div>
        
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content - Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div ref={headlineRef} className="text-center lg:text-left">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold theme-text leading-tight mb-6 ${spaceGrotesk.className}`}>
                  Your calendar is who you are and what you do
                </h1>
                
                <p ref={subtitleRef} className={`text-lg sm:text-xl theme-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 ${inter.className}`}>
                  Transform your schedule into a reflection of your values and goals. 
                  Track habits, set meaningful goals, and build the life you want.
                </p>
                
                {/* CTA Buttons - Horizontal Layout */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg font-semibold">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3 text-lg">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Side - Professional Dashboard Mockup */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  {/* Dashboard Screenshot Mockup */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Calibre Dashboard</div>
                      </div>
                    </div>
                    
                    {/* Dashboard Content */}
                    <div className="p-4 space-y-4">
                      {/* Calendar Widget */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Today's Schedule</h3>
                          <div className="text-xs text-blue-600 dark:text-blue-400">9:00 AM</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-600 dark:text-gray-300">Morning Workout</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600 dark:text-gray-300">Team Meeting</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Widget */}
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Habit Streak</h3>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400">7 days</div>
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Goals Widget */}
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Weekly Goals</h3>
                          <div className="text-xs text-purple-600 dark:text-purple-400">3/5</div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements - Subtle */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
                    <div className="text-white text-xs">📊</div>
                  </div>
                  
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center">
                    <div className="text-white text-xs">✅</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center group stat-item">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl sm:text-4xl font-bold theme-text stat-number ${poppins.className}`}>{stat.number}</div>
                  <div className={`text-sm theme-text-secondary font-medium ${inter.className}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-theme-surface to-theme-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/15 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/40 dark:to-indigo-800/40 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-300/60 dark:border-blue-600/40 shadow-sm ${poppins.className}`}>
              <span className="animate-bounce">✨</span>
              <span>See Calibre in Action</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold text-vibed theme-text mb-6 ${spaceGrotesk.className}`}>
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">transform your life</span>
            </h2>
            <p className={`text-xl theme-text-secondary max-w-4xl mx-auto leading-relaxed ${inter.className}`}>
              From habit tracking to goal achievement, Calibre provides all the tools you need 
              to build the life you want, one day at a time.
            </p>
          </div>
          
          {/* Feature Showcases */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card max-w-7xl mx-auto ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex flex-col lg:flex items-center gap-12 lg:gap-20`}>
                {/* Feature Image */}
                <div className="feature-image flex-1 relative group">
                  <div className={`w-full h-96 lg:h-[500px] bg-gradient-to-br ${feature.gradient} rounded-3xl shadow-2xl overflow-hidden relative`}>
                    {/* Placeholder for screenshot - replace with actual images */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {index === 0 ? '📊' : index === 1 ? '📅' : index === 2 ? '📝' : '🎯'}
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${spaceGrotesk.className}`}>{feature.title}</h3>
                        <p className={`text-lg opacity-90 ${inter.className}`}>{feature.subtitle}</p>
                        <div className="mt-4 text-sm opacity-75">
                          Screenshot placeholder - Replace with actual {feature.title.toLowerCase()} image
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-sm">✨</span>
                    </div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xs">💫</span>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-20 -z-10 scale-105`}></div>
                </div>
                
                {/* Feature Content */}
                <div className="feature-content flex-1 space-y-6">
                  <div className="space-y-4">
                    <div className={`feature-icon inline-flex items-center space-x-2 bg-gradient-to-r ${feature.gradient} bg-opacity-10 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium`}>
                      <span>Feature {index + 1}</span>
                    </div>
                    <h3 className={`feature-title text-3xl lg:text-4xl font-bold theme-text ${spaceGrotesk.className}`}>
                      {feature.title}
                    </h3>
                    <h4 className={`feature-subtitle text-xl text-blue-600 dark:text-blue-400 font-semibold ${poppins.className}`}>
                      {feature.subtitle}
                    </h4>
                    <p className={`feature-description text-lg theme-text-secondary leading-relaxed ${inter.className}`}>
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Feature List */}
                  <div className="grid grid-cols-2 gap-3">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-theme-surface rounded-lg border border-theme-border">
                        <div className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-sm font-medium theme-text ${inter.className}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA for each feature */}
                  <div className="pt-4">
                    <Link href="/signup">
                      <Button variant="outline" className={`feature-button border-2 border-gradient-to-r ${feature.gradient} bg-transparent hover:bg-gradient-to-r ${feature.gradient} hover:text-white transition-all duration-300`}>
                        Try {feature.title.split(' ')[0]}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl border border-blue-200/50">
              <h3 className={`text-3xl font-bold theme-text mb-6 ${spaceGrotesk.className}`}>
                Ready to see it all in action?
              </h3>
              <p className={`text-xl theme-text-secondary leading-relaxed mb-8 ${inter.className}`}>
                Join thousands of users who are already transforming their lives with Calibre.
              </p>
              <Link href="/signup">
                <Button variant="primary" size="lg" className="px-8 py-4 text-lg font-semibold">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-theme-background to-theme-surface">
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
              <Card key={index} className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden testimonial-card">
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
                      <Star key={i} className="star-rating w-5 h-5 text-yellow-400 fill-current" />
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

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="space-y-8">
              <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight ${spaceGrotesk.className}`}>
                Ready to transform
                <br />
                <span className="text-blue-200">your life today?</span>
              </h2>
              <p className={`text-2xl sm:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed ${inter.className}`}>
                Join thousands of users who are already building the life they want.
                <br />
                <span className="font-semibold text-blue-200">Your journey starts with a single click.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/signup">
                <Button variant="primary" size="lg" className={`bg-white text-blue-700 hover:bg-blue-50 px-16 py-6 text-2xl font-bold relative overflow-hidden group shadow-2xl ${poppins.className}`}>
                  <span className="relative z-10 flex items-center">
                    Start Free Trial Now
                    <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white/20 px-12 py-6 text-xl font-semibold backdrop-blur-sm">
                  I already have an account
                </Button>
              </Link>
            </div>
            
            {/* Enhanced Trust Indicators */}
            <div className={`flex flex-col sm:flex-row justify-center items-center gap-12 pt-12 text-blue-200 ${inter.className}`}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">100% Free</div>
                  <div className="text-sm opacity-80">No credit card required</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Quick Setup</div>
                  <div className="text-sm opacity-80">Ready in under 2 minutes</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">No Commitment</div>
                  <div className="text-sm opacity-80">Cancel anytime</div>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="pt-8">
              <p className={`text-lg text-blue-200/80 ${inter.className}`}>
                Trusted by <span className="font-bold text-white">10,000+</span> users worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 mt-4 opacity-60">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white ml-2 font-semibold">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="theme-surface border-t border-theme-border py-16">
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
