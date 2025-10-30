import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { UserProfile } from '@/types'
import { ArrowLeft, Users } from 'lucide-react'
import ProfileCard from '@/components/ProfileCard'

async function getProfiles(): Promise<UserProfile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as UserProfile[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch profiles')
  }
}

export default async function ProfilesPage() {
  const profiles = await getProfiles()
  const publicProfiles = profiles.filter(
    p => p.metadata?.profile_visibility?.key === 'public'
  )
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Profiles</h1>
                <p className="text-gray-600 mt-1">{publicProfiles.length} public profiles</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profiles Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {publicProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No public profiles available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}