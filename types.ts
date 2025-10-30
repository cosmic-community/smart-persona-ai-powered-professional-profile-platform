// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// User Profile object type
export interface UserProfile extends CosmicObject {
  type: 'user-profiles';
  metadata: {
    full_name: string;
    email: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    profile_visibility: {
      key: 'public' | 'private' | 'scheduled';
      value: 'Public' | 'Private' | 'Scheduled';
    };
    selected_template?: ProfileTemplate | string;
    social_media_links?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      behance?: string;
      instagram?: string;
    };
    profile_customizations?: {
      accentColor?: string;
      showContactForm?: boolean;
      featuredSkills?: string[];
      featuredProjects?: string[];
      featuredCampaigns?: string[];
    };
    cv_data?: {
      experience?: Array<{
        title: string;
        company: string;
        years: string;
      }>;
      skills?: string[];
    };
    share_schedule?: string;
    ai_generated?: boolean;
    quota_usage?: number;
  };
}

// Profile Template object type
export interface ProfileTemplate extends CosmicObject {
  type: 'profile-templates';
  metadata: {
    template_name: string;
    description: string;
    preview_image?: {
      url: string;
      imgix_url: string;
    };
    layout_configuration: {
      sections: string[];
      columns: number;
      headerStyle: string;
      fontSize: string;
    };
    style_settings?: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
      spacing: string;
    };
    active?: boolean;
    usage_count?: number;
  };
}

// AI Prompt object type
export interface AIPrompt extends CosmicObject {
  type: 'ai-prompts';
  metadata: {
    prompt_name: string;
    prompt_text: string;
    category: {
      key: 'profile' | 'bio' | 'cv' | 'social';
      value: 'Profile Generation' | 'Bio Writing' | 'CV Creation' | 'Social Media Content';
    };
    instructions?: string;
    active?: boolean;
    usage_count?: number;
  };
}

// User Analytics object type
export interface UserAnalytics extends CosmicObject {
  type: 'user-analytics';
  metadata: {
    user_reference: UserProfile | string;
    activity_type: {
      key: 'profile_view' | 'profile_share' | 'cv_download' | 'ai_generation' | 'template_change';
      value: 'Profile View' | 'Profile Share' | 'CV Download' | 'AI Generation' | 'Template Change';
    };
    timestamp: string;
    metadata?: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
  };
}

// Type for select-dropdown visibility options
export type ProfileVisibility = 'public' | 'private' | 'scheduled';

// Type for activity types
export type ActivityType = 'profile_view' | 'profile_share' | 'cv_download' | 'ai_generation' | 'template_change';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Type guards
export function isUserProfile(obj: CosmicObject): obj is UserProfile {
  return obj.type === 'user-profiles';
}

export function isProfileTemplate(obj: CosmicObject): obj is ProfileTemplate {
  return obj.type === 'profile-templates';
}

export function isAIPrompt(obj: CosmicObject): obj is AIPrompt {
  return obj.type === 'ai-prompts';
}

export function isUserAnalytics(obj: CosmicObject): obj is UserAnalytics {
  return obj.type === 'user-analytics';
}