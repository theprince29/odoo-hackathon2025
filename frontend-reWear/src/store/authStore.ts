import api from '@/lib/api';
import { create } from 'zustand';


interface User {
  id: string;
  name: string;
  email: string;
  points?: number;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post('/auth/register', { name, email, password });

      // You can optionally persist the email to use in the verify step
      localStorage.setItem('unverified_email', res.data.email);

    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Registration failed' });
    } finally {
      set({ loading: false });
    }
  },

  verifyEmail: async (email, otp) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post('/auth/verifyEmail', { email, otp });

      const user = res.data.user;
      set({ user });
      localStorage.setItem('token', user.token);

    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Verification failed' });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post('/auth/login', { email, password });

      const user = res.data.user;
      set({ user });
      localStorage.setItem('token', user.token);

    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed' });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
    // Optionally: hit logout API and clear cookies
  },
}));
