# Smart Persona - AI-Powered Professional Profile Platform

![App Preview](https://imgix.cosmicjs.com/ab4d4ac0-b5db-11f0-9e3b-23531c03347e-photo-1494790108377-be9c29b29330-1761861496251.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive AI-powered professional profile management platform built with Next.js 16 and Cosmic CMS. Create, customize, and share stunning professional profiles with intelligent AI assistance, dynamic templates, and detailed analytics tracking.

## Features

- ✨ **AI Profile Generation** - Generate professional profiles, bios, and CVs using customizable AI prompts
- 🎨 **Dynamic Templates** - Choose from Creative, Professional, or Minimal templates with real-time customization
- 🔗 **Social Media Integration** - Connect LinkedIn, Twitter, Instagram, GitHub, and Behance accounts
- 📊 **Analytics Dashboard** - Track profile views, CV downloads, and visitor engagement
- ⏰ **Scheduled Sharing** - Set timed profile visibility with public/private/scheduled options
- 📄 **CV Export** - Generate professional PDF resumes from your profile data
- 👥 **Admin Portal** - Manage AI prompts, user quotas, templates, and system analytics
- 📈 **Usage Tracking** - Monitor AI generation usage with configurable per-user limits
- 🎯 **Profile Visibility Control** - Granular control over profile access and sharing
- 🔧 **Custom Branding** - Personalize profile colors, layouts, and featured content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6903de89271316ad9f4ce200&clone_repository=6903e194271316ad9f4ce25d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "User Features
> 
> Connect Social Media - Link and integrate social media accounts
> Create AI Profile - Generate profile using AI assistance
> My Profile - View and manage personal profile
> Download Profile (to CV) - Export profile as CV/resume format
> Set Public/Private - Configure profile visibility settings
> Select Profile Template - Choose from available profile formats
> Customize/Fine-tune - Personalize and adjust profile details
> Share Profile by Schedule - Set timed profile sharing
> 
> Admin Features
> 
> All Users Dashboard - Overview of all registered users
> Comprehensive Data Analysis - Complete analytics and insights
> Manage AI Prompts - Configure and control AI prompt templates
> Manage Quotas/Usage Rights - Set limits and permissions for users
> Access Control - Define user roles and permissions
> System Configuration via API - Adjust system settings through API
> Manage Applications - Handle user applications and submissions"

### Code Generation Prompt

> "User Features
> 
> Connect Social Media - Link and integrate social media accounts
> Create AI Profile - Generate profile using AI assistance
> My Profile - View and manage personal profile
> Download Profile (to CV) - Export profile as CV/resume format
> Set Public/Private - Configure profile visibility settings
> Select Profile Template - Choose from available profile formats
> Customize/Fine-tune - Personalize and adjust profile details
> Share Profile by Schedule - Set timed profile sharing
> 
> Admin Features
> 
> All Users Dashboard - Overview of all registered users
> Comprehensive Data Analysis - Complete analytics and insights
> Manage AI Prompts - Configure and control AI prompt templates
> Manage Quotas/Usage Rights - Set limits and permissions for users
> Access Control - Define user roles and permissions
> System Configuration via API - Adjust system settings through API
> Manage Applications - Handle user applications and submissions"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **CMS**: Cosmic - Headless CMS for content management
- **Styling**: Tailwind CSS with custom design tokens
- **Language**: TypeScript with strict type checking
- **Package Manager**: Bun
- **Deployment**: Vercel-ready with automatic deployments
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd smart-persona
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching User Profiles

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all user profiles with connected templates
const { objects: profiles } = await cosmic.objects
  .find({
    type: 'user-profiles'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get specific user profile by slug
const { object: profile } = await cosmic.objects
  .findOne({
    type: 'user-profiles',
    slug: 'sarah-johnson'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Profile

```typescript
// Create a new user profile
const { object: newProfile } = await cosmic.objects.insertOne({
  title: 'John Doe',
  type: 'user-profiles',
  metadata: {
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Professional software engineer...',
    profile_visibility: {
      key: 'public',
      value: 'Public'
    },
    social_media_links: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    ai_generated: true,
    quota_usage: 0
  }
})
```

### Updating Profile Visibility

```typescript
// Update only the visibility setting (system preserves other metadata)
await cosmic.objects.updateOne(profileId, {
  metadata: {
    profile_visibility: {
      key: 'private',
      value: 'Private'
    }
  }
})
```

### Fetching AI Prompts

```typescript
// Get active AI prompts by category
const { objects: cvPrompts } = await cosmic.objects
  .find({
    type: 'ai-prompts',
    'metadata.category.key': 'cv',
    'metadata.active': true
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Tracking Analytics

```typescript
// Create analytics record for profile view
await cosmic.objects.insertOne({
  title: `${profile.title} Activity - ${new Date().toLocaleDateString()}`,
  type: 'user-analytics',
  metadata: {
    user_reference: profile.id,
    activity_type: {
      key: 'profile_view',
      value: 'Profile View'
    },
    timestamp: new Date().toISOString(),
    metadata: {
      views: 1,
      referral_source: 'direct'
    }
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic CMS with four main content types:

### User Profiles
- Full name, email, and bio
- Profile photo (file upload)
- Visibility settings (public/private/scheduled)
- Selected template (object reference)
- Social media links (JSON)
- Profile customizations (JSON)
- CV data (JSON)
- Share schedule (date)
- AI generation flag
- Quota usage tracking

### Profile Templates
- Template name and description
- Preview image (file upload)
- Layout configuration (JSON)
- Style settings (JSON)
- Active status
- Usage count tracking

### AI Prompts
- Prompt name and text (HTML)
- Category (profile/bio/cv/social)
- Instructions for AI processing
- Active status
- Usage count tracking

### User Analytics
- User reference (object connection)
- Activity type (view/share/download/generation)
- Timestamp (date)
- Metadata (JSON for detailed tracking)
- IP address and user agent

All content is managed through your Cosmic dashboard and automatically synced to the application.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Environment Variables

Set these in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Project Structure

```
smart-persona/
├── app/
│   ├── page.tsx              # Home page
│   ├── profiles/             # Profile pages
│   ├── admin/                # Admin dashboard
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout
├── components/               # React components
├── lib/
│   └── cosmic.ts            # Cosmic SDK configuration
├── types.ts                 # TypeScript definitions
└── public/                  # Static assets
```

## Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

<!-- README_END -->