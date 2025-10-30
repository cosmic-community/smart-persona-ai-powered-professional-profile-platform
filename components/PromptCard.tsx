import { AIPrompt } from '@/types'
import { Edit, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface PromptCardProps {
  prompt: AIPrompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const isActive = prompt.metadata?.active === true
  const usageCount = prompt.metadata?.usage_count || 0
  const category = prompt.metadata?.category?.value || 'Uncategorized'
  
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {prompt.title}
          </h3>
          <span className="text-xs font-medium text-gray-600">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      {prompt.metadata?.instructions && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {prompt.metadata.instructions}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="h-4 w-4" />
          <span>{usageCount} uses</span>
        </div>
        <Link 
          href={`/admin/prompts/${prompt.slug}/edit`}
          className="text-blue-600 hover:text-blue-900"
        >
          <Edit className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}