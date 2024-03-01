import { config } from '@/src/lib/config';
import { supabase } from '@/src/lib/supabase';
import axios from 'axios';

export const api = axios.create({
  baseURL: config.backend.url,
});

api.interceptors.request.use(async (config) => {
  const session = await supabase.auth.getSession();

  if (session.data.session?.access_token) {
    config.headers.Authorization = `Bearer ${session.data.session?.access_token}`;
  }

  return config;
});
