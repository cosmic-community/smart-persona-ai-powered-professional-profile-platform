import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return NextResponse.json({ profiles: response.objects })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({ profiles: [] })
    }
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    )
  }
}