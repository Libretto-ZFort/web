import { config } from '@/src/lib/config';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  config.supabase.domain,
  config.supabase.key
);
