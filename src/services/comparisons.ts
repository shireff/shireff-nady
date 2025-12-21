import api from './api';
import { StateComparison } from '@/types';

export const comparisonService = {
  getAll: async (params?: { category?: string; isActive?: boolean }): Promise<StateComparison[]> => {
    const response = await api.get('/state-comparisons', { params });
    return response.data.data || response.data;
  },

  create: async (data: Partial<StateComparison>): Promise<StateComparison> => {
    const response = await api.post('/state-comparisons', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: Partial<StateComparison>): Promise<StateComparison> => {
    const response = await api.put(`/state-comparisons/${id}`, data);
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/state-comparisons/${id}`);
  }
};
