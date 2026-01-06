import api from './api';
import { AuthResponse } from '@/types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    const authData = response.data.data || response.data;
    
    if (authData.token) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify(authData.user));
      // Set li_at cookie for persistent authentication (expires in 100 years)
      const indefinite = 100 * 365 * 24 * 60 * 60;
      document.cookie = `li_at=${authData.token}; path=/; max-age=${indefinite}; SameSite=Strict; Secure`;
      document.cookie = `isAuthenticated=true; path=/; max-age=${indefinite}; SameSite=Strict; Secure`;
    }
    return authData;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear cookies
    document.cookie = 'li_at=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  getCurrentUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      // Priority 1: Check Hint Cookie (visible to JS)
      const cookies = document.cookie.split('; ');
      if (cookies.some(row => row.startsWith('isAuthenticated=true'))) return true;

      // Priority 2: Check li_at Cookie
      if (cookies.some(row => row.startsWith('li_at='))) return true;

      // Priority 3: Check Token Cookie (fallback)
      if (cookies.some(row => row.startsWith('token='))) return true;

      // Priority 4: Check LocalStorage (legacy)
      return !!localStorage.getItem('token');
    }
    return false;
  }
};
