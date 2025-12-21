import api from './api';
import { Project } from '@/types';

export const projectService = {
  getAll: async (params?: { category?: string; search?: string }): Promise<Project[]> => {
    const response = await api.get('/projects', { params });
    return response.data.data || response.data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data.data || response.data;
  },

  create: async (data: Partial<Project>): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('img', file);
    const response = await api.post('/projects/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
};
