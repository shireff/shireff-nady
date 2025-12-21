import api from './api';

export const settingsService = {
  getHomeImage: async (): Promise<{ heroImageUrl: string | null }> => {
    try {
      const response = await api.get('/home/image');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch home image', error);
      return { heroImageUrl: null };
    }
  },

  updateHomeImage: async (url: string): Promise<{ heroImageUrl: string }> => {
    const response = await api.put('/admin/home/image', { heroImageUrl: url });
    return response.data;
  },

  uploadHomeImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/admin/home/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  },
};



