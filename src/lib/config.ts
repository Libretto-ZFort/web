export const config = {
  supabase: {
    domain: process.env.REACT_APP_SUPABASE_DOMAIN || '',
    key: process.env.REACT_APP_SUPABASE_KEY || '',
  },
  backend: {
    url: process.env.REACT_APP_BACKEND_URL || '',
  },
};
