import api from './api';

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export const contactService = {
  send: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/contact', data);
    return response.data;
  },
};
