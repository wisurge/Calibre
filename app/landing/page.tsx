'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Logo } from '@/components/atoms/Logo'
import { ArrowRight, CheckCircle, Star, Users, Zap, Heart } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export default function LandingPage() {
  const theme = useThemeStyles()

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Habit Tracking',
      description: 'Build and maintain healthy habits with our intuitive tracking system.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Goal Setting',
      description: 'Set meaningful goals and track your progress with visual indicators.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Journaling',
      description: 'Reflect on your day and capture your thoughts in a beautiful journal.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Daily Planning',
      description: 'Plan your day effectively with our smart task management system.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      content: 'Routinsie has completely transformed how I approach my daily routine. The habit tracking is incredible!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Developer',
      content: 'The goal setting feature helped me achieve my fitness goals in just 3 months. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Designer',
      content: 'The journaling feature is so beautiful and intuitive. It\'s become my favorite part of the day.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen theme-background">
      {/* Header */}
      <header className="theme-surface shadow-sm border-b border-theme-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" variant="full" />
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-h1 text-vibed theme-text">
              Your Personal Productivity Companion
            </h1>
            <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
              Build better habits, achieve your goals, and create a life you love with Routinsie's 
              comprehensive productivity platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-theme-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-vibed theme-text mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you build lasting habits and achieve your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-theme-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-h4 theme-text mb-2">{feature.title}</h3>
                <p className="text-sm theme-text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-vibed theme-text mb-4">
              Loved by thousands of users
            </h2>
            <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
              See what our community has to say about their Routinsie experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="theme-text-secondary mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold theme-text">{testimonial.name}</p>
                  <p className="text-sm theme-text-secondary">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-theme-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-h2 text-vibed theme-text">
              Ready to transform your life?
            </h2>
            <p className="text-lg theme-text-secondary">
              Join thousands of users who are already building better habits and achieving their goals.
            </p>
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="theme-surface border-t border-theme-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Logo size="sm" variant="icon" />
              <span className="theme-text-secondary">© 2024 Routinsie. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm theme-text-secondary hover:theme-text transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm theme-text-secondary hover:theme-text transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm theme-text-secondary hover:theme-text transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
