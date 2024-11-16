import { createClient } from '@supabase/supabase-js';

// Mengambil variabel dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Membuat client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
