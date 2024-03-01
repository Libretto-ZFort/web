import {createClient} from "@supabase/supabase-js";
import {VITE_SUPABASE_URL, VITE_SUPABASE_KEY} from './config/env';

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);

export default supabase;
