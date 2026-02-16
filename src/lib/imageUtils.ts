/**
 * Image optimization utilities for Next.js Image component
 */

/**
 * Generate a blur data URL for image placeholders
 * Creates a simple gradient-based blur placeholder
 */
export function generateBlurDataURL(imageUrl?: string): string {
  // Base64 encoded 1x1 pixel transparent image
  const shimmer = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#334155;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer)}`;
}

/**
 * Check if image should be unoptimized (external domains)
 */
export function shouldUnoptimizeImage(imageUrl: string): boolean {
  const unoptimizedDomains = ['licdn.com', 'linkedin.com'];
  return unoptimizedDomains.some(domain => imageUrl.includes(domain));
}

/**
 * Get optimized image sizes based on breakpoints
 */
export function getImageSizes(type: 'hero' | 'card' | 'detail' | 'thumbnail'): string {
  const sizeMap = {
    hero: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    detail: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
    thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px',
  };

  return sizeMap[type];
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Get image priority based on position
 */
export function getImagePriority(index: number, isFeatured: boolean = false): boolean {
  // First 3 images or featured images should have priority
  return isFeatured || index < 3;
}

/**
 * Get loading strategy based on position
 */
export function getImageLoading(index: number, isFeatured: boolean = false): 'eager' | 'lazy' {
  return getImagePriority(index, isFeatured) ? 'eager' : 'lazy';
}
