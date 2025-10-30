import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { UserProfile, AIPrompt, ProfileTemplate, UserAnalytics } from '@/types'
import { Users, Sparkles, Layout, BarChart3, ArrowLeft } from 'lucide-react'
import StatsCard from '@/components/StatsCard'

async function getAdminData() {
  try {
    const [profilesRes, promptsRes, templatesRes, analyticsRes] = await Promise.all([
      cosmic.objects.find({ type: 'user-profiles' }).props(['id']),
      cosmic.objects.find({ type: 'ai-prompts' }).props(['id']),
      cosmic.objects.find({ type: 'profile-templates' }).props(['id']),
      cosmic.objects.find({ type: 'user-analytics' }).props(['id'])
    ])
    
    return {
      totalProfiles: profilesRes.objects.length,
      totalPrompts: promptsRes.objects.length,
      totalTemplates: templatesRes.objects.length,
      totalAnalytics: analyticsRes.objects.length
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {
        totalProfiles: 0,
        totalPrompts: 0,
        totalTemplates: 0,
        totalAnalytics: 0
      }
    }
    throw new Error('Failed to fetch admin data')
  }
}

export default async function AdminPage() {
  const stats = await getAdminData()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your Smart Persona platform</p>
            </div>
            <Link href="/" className="btn btn-secondary px-4 py-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value={stats.totalProfiles.toString()}
              icon={Users}
              color="bg-blue-500"
            />
            <StatsCard
              title="AI Prompts"
              value={stats.totalPrompts.toString()}
              icon={Sparkles}
              color="bg-purple-500"
            />
            <StatsCard
              title="Templates"
              value={stats.totalTemplates.toString()}
              icon={Layout}
              color="bg-green-500"
            />
            <StatsCard
              title="Analytics Records"
              value={stats.totalAnalytics.toString()}
              icon={BarChart3}
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Management Sections */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Users Management */}
            <Link href="/admin/users">
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                    <p className="text-sm text-gray-600">{stats.totalProfiles} total</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  View and manage all user profiles, permissions, and quotas
                </p>
              </div>
            </Link>

            {/* AI Prompts Management */}
            <Link href="/admin/prompts">
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Prompts</h3>
                    <p className="text-sm text-gray-600">{stats.totalPrompts} active</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Configure and manage AI prompt templates for profile generation
                </p>
              </div>
            </Link>

            {/* Templates Management */}
            <Link href="/admin/templates">
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Layout className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
                    <p className="text-sm text-gray-600">{stats.totalTemplates} available</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Manage profile templates, layouts, and styling options
                </p>
              </div>
            </Link>

            {/* Analytics Management */}
            <Link href="/admin/analytics">
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-600">{stats.totalAnalytics} records</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  View comprehensive analytics and user activity insights
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="card">
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/users/new" className="btn btn-primary px-6 py-2">
                <Users className="h-4 w-4 mr-2" />
                Add New User
              </Link>
              <Link href="/admin/prompts/new" className="btn btn-secondary px-6 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Create AI Prompt
              </Link>
              <Link href="/admin/templates/new" className="btn btn-secondary px-6 py-2">
                <Layout className="h-4 w-4 mr-2" />
                Add Template
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}