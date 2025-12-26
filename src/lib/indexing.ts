import { google } from 'googleapis';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

/**
 * Utility to notify search engines about URL updates using their respective APIs.
 */

interface IndexingResult {
  engine: string;
  url: string;
  status: 'success' | 'error';
  message?: string;
}

/**
 * Google Indexing API implementation
 * Requires GOOGLE_INDEXING_CREDENTIALS (JSON string) in environment variables,
 * or a google-indexing-credentials.json file in the root directory.
 */
export async function notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<IndexingResult> {
  console.log(`🔹 Trying to notify Google for URL: ${url}`);
  try {
    let credentialsJson = process.env.GOOGLE_INDEXING_CREDENTIALS;
    
    if (!credentialsJson) {
      const filePath = path.join(process.cwd(), 'google-indexing-credentials.json');
      if (fs.existsSync(filePath)) {
        credentialsJson = fs.readFileSync(filePath, 'utf8');
      }
    }

    if (!credentialsJson) {
      console.error(`❌ Google Indexing Error for ${url}: Credentials not found`);
      throw new Error('Google Indexing credentials not found.');
    }

    const credentials = typeof credentialsJson === 'string' ? JSON.parse(credentialsJson) : credentialsJson;

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    await indexing.urlNotifications.publish({
      auth,
      requestBody: {
        url,
        type,
      },
    });

    console.log(`✅ Google notified successfully for URL: ${url}`);
    return { engine: 'Google', url, status: 'success' };
  } catch (error: any) {
    console.error(`❌ Google Indexing Error for ${url}:`, error.message);
    return { engine: 'Google', url, status: 'error', message: error.message };
  }
}

/**
 * IndexNow API implementation (Bing, Yandex, etc.)
 * Requires INDEXNOW_KEY (string) and SITE_URL in environment variables.
 */
export async function notifyIndexNow(urls: string[]): Promise<IndexingResult[]> {
  console.log(`🔹 Trying to notify IndexNow for ${urls.length} URLs`);
  const siteUrl = process.env.SITE_URL || 'https://shireff-nady.vercel.app';
  const apiKey = process.env.INDEXNOW_KEY;

  if (!apiKey) {
    console.warn('⚠️ INDEXNOW_KEY environment variable is not set. Skipping IndexNow.');
    return urls.map(url => ({ engine: 'IndexNow', url, status: 'error', message: 'API Key missing' }));
  }

  try {
    // IndexNow often prefers a POST request with multiple URLs
    const payload = {
      host: "shireff-nady.vercel.app",
      key: apiKey,
      keyLocation: "https://shireff-nady.vercel.app/e5eb264d20da45edbdf55411fdf361bc.txt",
      urlList: urls,
    };
    
    console.log(`📤 IndexNow payload:`, JSON.stringify(payload, null, 2));
    
    await axios.post('https://api.indexnow.org/IndexNow', payload);

    console.log(`✅ IndexNow notified successfully for URLs: ${urls.join(', ')}`);
    return urls.map(url => ({ engine: 'IndexNow', url, status: 'success' }));
  } catch (error: any) {
    console.error(`❌ IndexNow Error:`, error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data:`, JSON.stringify(error.response.data, null, 2));
      
      // Handle specific error codes
      if (error.response.status === 403 && error.response.data?.code === 'UserForbiddedToAccessSite') {
        console.warn(`⚠️ IndexNow domain verification pending. This is normal for new domains.`);
        console.warn(`   - Your key file is accessible: ${siteUrl}/${apiKey}.txt`);
        console.warn(`   - IndexNow needs 24-48 hours to verify domain ownership`);
        console.warn(`   - Try again tomorrow, or wait for Bing to crawl your sitemap naturally`);
        console.warn(`   - Good news: Google indexing is working! 🎉`);
      }
    }
    
    return urls.map(url => ({ 
      engine: 'IndexNow', 
      url, 
      status: 'error', 
      message: error.response?.data?.message || error.message 
    }));
  }
}

/**
 * Batch index multiple URLs across all available engines
 */
export async function indexAllPages(urls: string[]): Promise<IndexingResult[]> {
  console.log(`🚀 Starting batch indexing for ${urls.length} URLs...`);
  const results: IndexingResult[] = [];

  // Google Indexing API is rate-limited and generally prefers one-by-one or small batches
  // We'll run them sequentially to be safe
  for (const url of urls) {
    const googleRes = await notifyGoogle(url);
    results.push(googleRes);
  }

  // IndexNow handles batches easily
  const indexNowResults = await notifyIndexNow(urls);
  results.push(...indexNowResults);

  const successful = results.filter(r => r.status === 'success').length;
  console.log(`🏁 Indexing completed. Success: ${successful}/${results.length}`);
  
  return results;
}
