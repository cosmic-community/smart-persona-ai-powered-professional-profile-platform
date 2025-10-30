import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-analytics' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return NextResponse.json({ analytics: response.objects })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({ analytics: [] })
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await cosmic.objects.insertOne({
      type: 'user-analytics',
      title: body.title,
      metadata: {
        user_reference: body.user_reference,
        activity_type: body.activity_type,
        timestamp: body.timestamp || new Date().toISOString(),
        metadata: body.metadata || {},
        ip_address: body.ip_address || '',
        user_agent: body.user_agent || ''
      }
    })
    
    return NextResponse.json({ analytics: response.object })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create analytics record' },
      { status: 500 }
    )
  }
}