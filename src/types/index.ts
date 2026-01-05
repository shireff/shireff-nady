export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  img: string;
  demo: string;
  git?: string;
  tags?: string[]; // Kept for internal compatibility
  isFeatured?: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  externalId: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  content: string;
  avatar: string;
  linkedinUrl: string;
  date: string;
  isVerified: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
}

export interface ProjectsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Project[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface StateComparison {
  id: string;
  title: string;
  desc: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  isActive: boolean;
  createdAt: string;
}

export interface TechComparison {
  id: string;
  title: string;
  description: string;
  leftItem: {
    name: string;
    details: string;
  };
  rightItem: {
    name: string;
    details: string;
  };
  criteria: string[];
  winner: 'left' | 'right' | 'tie';
  createdAt: string;
  isTestData: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id?: string;
    email: string;
    role: string;
  };
}

export enum EntityType {
  PROJECTS = 'projects',
  EXPERIENCES = 'experiences',
  COMPARISONS = 'comparisons',
  TESTIMONIALS = 'testimonials',
  SETTINGS = 'settings'
}

export type Entity = Project | Experience | StateComparison | Testimonial;
