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
