import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Implement actual calendar account fetching from database
    // For now, return empty array to avoid errors
    const accounts: any[] = []
    
    return NextResponse.json(accounts)
  } catch (error) {
    console.error('Error fetching calendar accounts:', error)
    return NextResponse.json([], { status: 200 })
  }
}
