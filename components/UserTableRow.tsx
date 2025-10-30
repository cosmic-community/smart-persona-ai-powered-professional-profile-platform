import Link from 'next/link'
import { UserProfile } from '@/types'
import { Eye, Edit } from 'lucide-react'

interface UserTableRowProps {
  user: UserProfile
}

export default function UserTableRow({ user }: UserTableRowProps) {
  const photoUrl = user.metadata?.profile_photo?.imgix_url
  const visibility = user.metadata?.profile_visibility?.value || 'Private'
  const template = typeof user.metadata?.selected_template === 'object' 
    ? user.metadata.selected_template?.title 
    : 'No template'
  const quotaUsage = user.metadata?.quota_usage || 0
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {photoUrl && (
            <img
              src={`${photoUrl}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={user.title}
              width="40"
              height="40"
              className="rounded-full mr-3"
            />
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{user.title}</div>
            {user.metadata?.ai_generated && (
              <div className="text-xs text-purple-600">AI Generated</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.metadata?.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          visibility === 'Public' 
            ? 'bg-green-100 text-green-800' 
            : visibility === 'Scheduled'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {visibility}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {template}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {quotaUsage}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          <Link href={`/profiles/${user.slug}`} className="text-blue-600 hover:text-blue-900">
            <Eye className="h-4 w-4" />
          </Link>
          <Link href={`/admin/users/${user.slug}/edit`} className="text-gray-600 hover:text-gray-900">
            <Edit className="h-4 w-4" />
          </Link>
        </div>
      </td>
    </tr>
  )
}