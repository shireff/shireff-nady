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
  'node': 'Node.js',
  'next': 'Next.js',
  'react': 'React',
  'ui': 'UI/UX',
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'express': 'Express.js',
  'nextjs': 'Next.js',
  'nodejs': 'Node.js',
  // Capitalized variants
  'Node': 'Node.js',
  'Next': 'Next.js',
  'UI': 'UI/UX',
};

export function normalizeCategory(category: string): string {
  if (!category) return 'Uncategorized';
  const trimmed = category.trim();
  const lower = trimmed.toLowerCase();
  
  if (CATEGORY_MAPPINGS[trimmed]) return CATEGORY_MAPPINGS[trimmed];
  if (CATEGORY_MAPPINGS[lower]) return CATEGORY_MAPPINGS[lower];

  // Default: Title Case
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
