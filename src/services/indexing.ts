import axios from 'axios';

/**
 * Client-side service to interact with the indexing API routes.
 */
export const indexingService = {
  /**
   * Triggers re-indexing for all pages in the application.
   */
  indexAllPages: async () => {
    // This calls the Next.js API route, not the external backend
    const response = await axios.post('/api/admin/indexing');
    return response.data;
  },

  /**
   * Triggers re-indexing for a specific URL.
   */
  indexUrl: async (url: string) => {
    const response = await axios.post('/api/admin/indexing/single', { url });
    return response.data;
  }
};
