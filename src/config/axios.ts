import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { env } from '~/config/env';

interface CustomAxiosInstance extends AxiosInstance {
  setAccessToken(token?: string): void;
}

const instance = axios.create({
  baseURL: env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) as CustomAxiosInstance;

instance.setAccessToken = (token?: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export const axiosClient = instance;
