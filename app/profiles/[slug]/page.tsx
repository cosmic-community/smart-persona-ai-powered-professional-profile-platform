// app/profiles/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { UserProfile } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Share2, Mail, Globe, Github, Linkedin, Twitter } from 'lucide-react'

async function getProfile(slug: string): Promise<UserProfile | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'user-profiles',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as UserProfile
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch profile')
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = await getProfile(slug)
  
  if (!profile) {
    notFound()
  }
  
  const photoUrl = profile.metadata?.profile_photo?.imgix_url
  const socialLinks = profile.metadata?.social_media_links
  const cvData = profile.metadata?.cv_data
  const customizations = profile.metadata?.profile_customizations
  const accentColor = customizations?.accentColor || '#3B82F6'
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Profile Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {photoUrl && (
              <img
                src={`${photoUrl}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={profile.title}
                width="200"
                height="200"
                className="rounded-2xl shadow-lg object-cover"
              />
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {profile.metadata?.full_name || profile.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {profile.metadata?.email}
              </p>
              
              {profile.metadata?.bio && (
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {profile.metadata.bio}
                </p>
              )}
              
              <div className="flex flex-wrap gap-3">
                <button 
                  className="btn btn-primary px-6 py-2"
                  style={{ backgroundColor: accentColor }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </button>
                <button className="btn btn-secondary px-6 py-2">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </button>
              </div>
              
              {/* Social Links */}
              {socialLinks && Object.keys(socialLinks).length > 0 && (
                <div className="flex gap-4 mt-6">
                  {socialLinks.linkedin && (
                    <a 
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a 
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {socialLinks.github && (
                    <a 
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {cvData?.experience && cvData.experience.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.years}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {cvData?.skills && cvData.skills.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium"
                  style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects/Skills */}
      {customizations?.featuredProjects && customizations.featuredProjects.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customizations.featuredProjects.map((project, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-semibold text-gray-900">{project}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}