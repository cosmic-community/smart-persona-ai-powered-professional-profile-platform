import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { AIPrompt } from '@/types'
import { ArrowLeft, Sparkles, Plus } from 'lucide-react'
import PromptCard from '@/components/PromptCard'

async function getPrompts(): Promise<AIPrompt[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-prompts' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as AIPrompt[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch prompts')
  }
}

export default async function AdminPromptsPage() {
  const prompts = await getPrompts()
  const activePrompts = prompts.filter(p => p.metadata?.active === true)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Prompts</h1>
                <p className="text-gray-600 mt-1">{activePrompts.length} active prompts</p>
              </div>
            </div>
            <Link href="/admin/prompts/new" className="btn btn-primary px-6 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Create Prompt
            </Link>
          </div>
        </div>
      </header>

      {/* Prompts Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
          
          {prompts.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No AI prompts available yet.</p>
              <Link href="/admin/prompts/new" className="btn btn-primary mt-4 px-6 py-2">
                Create First Prompt
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}