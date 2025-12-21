/**
 * Ensures that image URLs use HTTPS protocol
 * This fixes mixed content warnings when loading images over HTTP on HTTPS pages
 */
export function ensureHttps(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  
  // If URL starts with http://, replace with https://
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
}

/**
 * Ensures Cloudinary URLs specifically use HTTPS
 */
export function ensureCloudinaryHttps(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  
  // Replace http://res.cloudinary.com with https://res.cloudinary.com
  return url.replace(/^http:\/\/res\.cloudinary\.com/, 'https://res.cloudinary.com');
}

/**
 * Sanitizes an array of image URLs to use HTTPS
 */
export function sanitizeImageUrls(urls: (string | undefined | null)[]): string[] {
  return urls
    .filter((url): url is string => !!url)
    .map(ensureHttps)
    .filter((url): url is string => !!url);
}
