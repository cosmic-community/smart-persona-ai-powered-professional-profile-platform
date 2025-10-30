import Link from 'next/link'
import { cosmic, hasStatus } from '@/lib/cosmic'
import { UserProfile, ProfileTemplate } from '@/types'
import { Users, Sparkles, BarChart3, Settings } from 'lucide-react'
import ProfileCard from '@/components/ProfileCard'
import StatsCard from '@/components/StatsCard'

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

export default async function HomePage() {
  const profiles = await getProfiles()
  const templates = await getTemplates()
  
  const publicProfiles = profiles.filter(
    p => p.metadata?.profile_visibility?.key === 'public'
  )
  
  const aiGeneratedCount = profiles.filter(
    p => p.metadata?.ai_generated === true
  ).length
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Persona</h1>
                <p className="text-sm text-gray-600">AI-Powered Professional Profiles</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="btn btn-secondary px-4 py-2"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Professional Profile in Minutes
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use AI to generate stunning profiles, CVs, and bios. Choose from beautiful templates and customize everything to match your style.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/profiles/new" className="btn btn-primary px-8 py-3 text-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Create Profile with AI
            </Link>
            <Link href="/templates" className="btn btn-secondary px-8 py-3 text-lg">
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Total Profiles"
              value={profiles.length.toString()}
              icon={Users}
              color="bg-blue-500"
            />
            <StatsCard
              title="Public Profiles"
              value={publicProfiles.length.toString()}
              icon={Users}
              color="bg-green-500"
            />
            <StatsCard
              title="AI Generated"
              value={aiGeneratedCount.toString()}
              icon={Sparkles}
              color="bg-purple-500"
            />
            <StatsCard
              title="Templates"
              value={templates.length.toString()}
              icon={BarChart3}
              color="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Profiles</h3>
            <p className="text-lg text-gray-600">
              Discover professional profiles created with Smart Persona
            </p>
          </div>
          
          {publicProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicProfiles.slice(0, 6).map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No public profiles available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h3>
            <p className="text-lg text-gray-600">
              Everything you need to create and manage professional profiles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">AI-Powered Generation</h4>
              <p className="text-gray-600">
                Create profiles, bios, and CVs instantly using advanced AI prompts
              </p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">Custom Templates</h4>
              <p className="text-gray-600">
                Choose from professional, creative, or minimal designs
              </p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">Analytics Dashboard</h4>
              <p className="text-gray-600">
                Track views, downloads, and engagement with detailed insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; 2025 Smart Persona. Built with Cosmic.
          </p>
        </div>
      </footer>
    </div>
  )
}