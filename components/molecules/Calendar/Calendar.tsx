'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/atoms/Card'

export interface CalendarProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  className?: string
}

export const Calendar = ({ selectedDate, onDateSelect, className }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const today = new Date()
  const selected = selectedDate || today

  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth)
      if (direction === 'prev') {
        newMonth.setMonth(prevMonth.getMonth() - 1)
      } else {
        newMonth.setMonth(prevMonth.getMonth() + 1)
      }
      return newMonth
    })
  }

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selected.toDateString()
  }

  const isHovered = (date: Date | null) => {
    return hoveredDate && date && date.toDateString() === hoveredDate.toDateString()
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className={`theme-surface rounded-2xl shadow-sm border-0 p-4 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 theme-text-secondary hover:theme-primary hover:bg-theme-accent rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h3 className="text-h5 theme-text font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 theme-text-secondary hover:theme-primary hover:bg-theme-accent transition-colors rounded"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-xs font-medium theme-text-secondary text-center py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => date && handleDateClick(date)}
            onMouseEnter={() => date && setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate(null)}
            disabled={!date}
            className={`
              relative p-2 text-xs rounded-lg transition-all duration-200
              ${!date 
                ? 'opacity-0 cursor-default' 
                : ''
              }
              ${date && isToday(date)
                ? 'bg-theme-primary text-white font-bold shadow-sm'
                : date && isSelected(date)
                ? 'bg-theme-secondary text-theme-primary font-semibold'
                : isHovered(date)
                ? 'bg-theme-accent theme-text hover:shadow-sm'
                : 'theme-text-secondary hover:theme-text hover:bg-theme-accent'
              }
              ${date ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {date?.getDate()}
            
            {/* Dot indicator for today */}
            {date && isToday(date) && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-theme-border">
        <button
          onClick={() => handleDateClick(today)}
          className="w-full py-2 px-3 text-xs theme-text-secondary hover:theme-text hover:bg-theme-accent rounded-lg transition-colors"
        >
          Go to Today
        </button>
      </div>
    </Card>
  )
}


