import Link from 'next/link'
import { UserProfile } from '@/types'
import { MapPin, Briefcase, Calendar } from 'lucide-react'

interface ProfileCardProps {
  profile: UserProfile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const photoUrl = profile.metadata?.profile_photo?.imgix_url
  const bio = profile.metadata?.bio || ''
  const skills = profile.metadata?.cv_data?.skills || []
  
  return (
    <Link href={`/profiles/${profile.slug}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start gap-4 mb-4">
          {photoUrl && (
            <img
              src={`${photoUrl}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={profile.title}
              width="80"
              height="80"
              className="rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
              {profile.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {profile.metadata?.email}
            </p>
            {profile.metadata?.ai_generated && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                AI Generated
              </span>
            )}
          </div>
        </div>
        
        {bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {bio}
          </p>
        )}
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}