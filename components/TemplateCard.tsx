import { ProfileTemplate } from '@/types'
import { Edit, Users } from 'lucide-react'
import Link from 'next/link'

interface TemplateCardProps {
  template: ProfileTemplate
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const previewImage = template.metadata?.preview_image?.imgix_url
  const isActive = template.metadata?.active === true
  const usageCount = template.metadata?.usage_count || 0
  const description = template.metadata?.description || ''
  
  return (
    <div className="card">
      {previewImage && (
        <img
          src={`${previewImage}?w=600&h=300&fit=crop&auto=format,compress`}
          alt={template.title}
          width="300"
          height="150"
          className="rounded-lg mb-4 w-full object-cover"
        />
      )}
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {template.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{usageCount} users</span>
        </div>
        <Link 
          href={`/admin/templates/${template.slug}/edit`}
          className="text-blue-600 hover:text-blue-900"
        >
          <Edit className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}