import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { UserAnalytics } from '@/types'
import { ArrowLeft, BarChart3, TrendingUp, Eye, Download, Share2 } from 'lucide-react'
import StatsCard from '@/components/StatsCard'
import AnalyticsTableRow from '@/components/AnalyticsTableRow'

async function getAnalytics(): Promise<UserAnalytics[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-analytics' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.objects as UserAnalytics[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch analytics')
  }
}

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalytics()
  
  // Calculate stats
  const profileViews = analytics.filter(a => a.metadata?.activity_type?.key === 'profile_view').length
  const cvDownloads = analytics.filter(a => a.metadata?.activity_type?.key === 'cv_download').length
  const profileShares = analytics.filter(a => a.metadata?.activity_type?.key === 'profile_share').length
  const aiGenerations = analytics.filter(a => a.metadata?.activity_type?.key === 'ai_generation').length
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">{analytics.length} total activity records</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Profile Views"
              value={profileViews.toString()}
              icon={Eye}
              color="bg-blue-500"
            />
            <StatsCard
              title="CV Downloads"
              value={cvDownloads.toString()}
              icon={Download}
              color="bg-green-500"
            />
            <StatsCard
              title="Profile Shares"
              value={profileShares.toString()}
              icon={Share2}
              color="bg-purple-500"
            />
            <StatsCard
              title="AI Generations"
              value={aiGenerations.toString()}
              icon={TrendingUp}
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Analytics Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.slice(0, 20).map((record) => (
                    <AnalyticsTableRow key={record.id} record={record} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}