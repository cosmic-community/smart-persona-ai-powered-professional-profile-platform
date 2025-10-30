import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { ProfileTemplate } from '@/types'
import { ArrowLeft, Layout, Plus } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'

async function getTemplates(): Promise<ProfileTemplate[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profile-templates' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as ProfileTemplate[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch templates')
  }
}

export default async function AdminTemplatesPage() {
  const templates = await getTemplates()
  const activeTemplates = templates.filter(t => t.metadata?.active === true)
  
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
                <h1 className="text-2xl font-bold text-gray-900">Profile Templates</h1>
                <p className="text-gray-600 mt-1">{activeTemplates.length} active templates</p>
              </div>
            </div>
            <Link href="/admin/templates/new" className="btn btn-primary px-6 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Link>
          </div>
        </div>
      </header>

      {/* Templates Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
          
          {templates.length === 0 && (
            <div className="text-center py-12">
              <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No templates available yet.</p>
              <Link href="/admin/templates/new" className="btn btn-primary mt-4 px-6 py-2">
                Create First Template
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}