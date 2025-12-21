import api from './api';
import { Experience } from '@/types';

export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data.data || response.data;
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data.data || response.data;
  },

  create: async (data: Partial<Experience>): Promise<Experience> => {
    const response = await api.post('/experiences', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    const response = await api.put(`/experiences/${id}`, data);
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/experiences/${id}`);
  }
};
