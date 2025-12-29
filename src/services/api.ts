import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to fix HTTP URLs to HTTPS (prevents mixed content warnings)
api.interceptors.response.use((response) => {
  // Recursively fix all HTTP URLs in the response data
  const fixUrls = (obj: any): any => {
    if (typeof obj === 'string') {
      // Replace http:// with https:// for Cloudinary and other image URLs
      return obj.replace(/^http:\/\//i, 'https://');
    }
    if (Array.isArray(obj)) {
      return obj.map(fixUrls);
    }
    if (obj !== null && typeof obj === 'object') {
      const fixed: any = {};
      for (const key in obj) {
        fixed[key] = fixUrls(obj[key]);
      }
      return fixed;
    }
    return obj;
  };

  if (response.data) {
    response.data = fixUrls(response.data);
  }

  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    if (typeof window !== 'undefined') {
      // Prevent infinite loop if already on login
      if (!window.location.pathname.includes('/admin/login')) {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         window.location.href = '/admin/login?expired=true';
      }
    }
  }
  return Promise.reject(error);
});

export default api;

