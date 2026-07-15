export interface Platform {
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  features: string[];
  supportedFormats: string[];
  faqs: FAQ[];
  steps: Step[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface MediaInfo {
  url: string;
  platform: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: MediaFormat[];
}

export interface MediaFormat {
  quality: string;
  format: string;
  size: string;
  hasAudio: boolean;
  url?: string;
  filename?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  author: string;
  content: string;
  readingTime: string;
  image: string;
  tags: string[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export interface ExtractRequest {
  url: string;
}

export interface ExtractResponse {
  success: boolean;
  data?: MediaInfo;
  error?: string;
}

export interface NavItem {
  title: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}
