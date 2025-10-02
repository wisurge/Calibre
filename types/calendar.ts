export interface MeetingParticipant {
  name: string
  role: string
  company: string
}

export interface MeetingData {
  id: string
  time: string
  type: string
  title: string
  participants: MeetingParticipant[]
  company: string
  companyDescription: string
  fundingStage?: string
  checklist: string[]
  isPrepped: boolean
  contributesToGoal?: boolean
  agenda?: string[]
  keyTopics?: string[]
  myQuestions?: string[]
  companyNews?: string[]
  linkedinInsights?: string[]
  competitorInfo?: string
  roleExpectations?: string
  technicalFocus?: string[]
  preparationTime?: string
  successCriteria?: string[]
  followUpActions?: string[]
}

export interface CalendarSyncStatus {
  isConnected: boolean
  isSyncing: boolean
  lastSyncTime?: Date
  error?: string
  syncProgress?: number
}

export interface CalendarConnectionInfo {
  provider: 'google' | 'outlook' | 'apple'
  email: string
  avatar?: string
  connectedAt: Date
  scope: string[]
}






