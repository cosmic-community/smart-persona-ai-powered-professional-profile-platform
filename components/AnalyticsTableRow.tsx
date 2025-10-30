import { UserAnalytics } from '@/types'
import { Eye, Download, Share2, Sparkles, Layout } from 'lucide-react'

interface AnalyticsTableRowProps {
  record: UserAnalytics
}

export default function AnalyticsTableRow({ record }: AnalyticsTableRowProps) {
  const user = typeof record.metadata?.user_reference === 'object' 
    ? record.metadata.user_reference 
    : null
  
  const activityType = record.metadata?.activity_type?.value || 'Unknown'
  const activityKey = record.metadata?.activity_type?.key || 'unknown'
  const timestamp = record.metadata?.timestamp 
    ? new Date(record.metadata.timestamp).toLocaleDateString()
    : 'N/A'
  
  const getActivityIcon = () => {
    switch (activityKey) {
      case 'profile_view':
        return <Eye className="h-4 w-4 text-blue-600" />
      case 'cv_download':
        return <Download className="h-4 w-4 text-green-600" />
      case 'profile_share':
        return <Share2 className="h-4 w-4 text-purple-600" />
      case 'ai_generation':
        return <Sparkles className="h-4 w-4 text-orange-600" />
      case 'template_change':
        return <Layout className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {user?.title || 'Unknown User'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {getActivityIcon()}
          <span className="text-sm text-gray-900">{activityType}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {timestamp}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {record.metadata?.ip_address || 'N/A'}
      </td>
    </tr>
  )
}