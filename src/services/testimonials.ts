import api from './api';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  content: string;
  avatar: string;
  linkedinUrl: string;
  date: string;
}

export const testimonialService = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await api.get('/recommendations');
    return response.data.data;
  },

  sync: async (): Promise<{ count: number }> => {
    const response = await api.post('/recommendations/sync');
    return response.data;
  }
};
