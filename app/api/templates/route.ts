import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ type: 'profile-templates' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return NextResponse.json({ templates: response.objects })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({ templates: [] })
    }
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}