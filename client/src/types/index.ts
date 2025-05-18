// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'ui';
  image: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
  behanceLink?: string;
  caseStudyLink?: string;
}

// Skill types
export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
  colorClass: 'primary' | 'secondary' | 'accent';
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
}

// Social links
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Navigation link
export interface NavLink {
  label: string;
  href: string;
  section: string;
}
