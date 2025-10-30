import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'

export async function GET() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'ai-prompts',
        'metadata.active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return NextResponse.json({ prompts: response.objects })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({ prompts: [] })
    }
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}