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
  },

  create: async (data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await api.post('/recommendations', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await api.put(`/recommendations/${id}`, data);
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/recommendations/${id}`);
  }
};
