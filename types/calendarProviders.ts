export interface CalendarProvider {
  id: string
  name: string
  icon: string
  color: string
  authUrl: string
  connected: boolean
  user?: {
    email?: string
    name?: string
  }
  isLoading?: boolean
}

export interface CalendarAccount {
  providerId: string
  accountId: string
  email: string
  name?: string
  isActive: boolean
  lastSync?: Date
}

export enum CalendarProviderType {
  GOOGLE = 'google',
  OUTLOOK = 'outlook',
  APPLE = 'apple',
  CALDAV = 'caldav',
  ICAL = 'ical'
}


