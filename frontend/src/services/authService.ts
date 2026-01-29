import api from './api';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: { email: string; password: string; companyName: string; industry?: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
