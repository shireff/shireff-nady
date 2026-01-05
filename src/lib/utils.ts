import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const CATEGORY_MAPPINGS: Record<string, string> = {
  // Variations for Node.js
  'node': 'Node.js',
  'node.js': 'Node.js',
  'nodejs': 'Node.js',
  'node js': 'Node.js',
  
  // Variations for Next.js
  'next': 'Next.js',
  'next.js': 'Next.js',
  'nextjs': 'Next.js',
  'next js': 'Next.js',
  
  // Variations for React
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  
  // Variations for UI/UX
  'ui': 'UI/UX',
  'ui/ux': 'UI/UX',
  'ux': 'UI/UX',
  'design': 'UI/UX',

  // Others
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'express': 'Express.js',
};

// Map Display Category -> Backend Search Term (Regex friendly)
// We use broader terms to ensure we catch "node", "Node", "Node.js"
export const CATEGORY_SEARCH_TERMS: Record<string, string> = {
  'Node.js': 'node',
  'Next.js': 'next',
  'React': 'react',
  'UI/UX': 'ui',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
};

export const KNOWN_CATEGORIES = [
  'All',
  'Next.js',
  'Node.js',
  'React',
  'UI/UX',
];

export function normalizeCategory(category: string): string {
  if (!category) return 'Uncategorized';
  const trimmed = category.trim();
  const lower = trimmed.toLowerCase();
  
  if (CATEGORY_MAPPINGS[trimmed]) return CATEGORY_MAPPINGS[trimmed];
  if (CATEGORY_MAPPINGS[lower]) return CATEGORY_MAPPINGS[lower];

  // Default: Title Case if not mapped
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function getUniqueCategories(projects: { category: string }[]): string[] {
  const categories = new Set<string>();
  projects.forEach(p => {
    if (p.category) {
      categories.add(normalizeCategory(p.category));
    }
  });
  return Array.from(categories).sort();
}
