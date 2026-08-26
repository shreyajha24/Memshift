import { createClient } from '@supabase/supabase-js';
import { DEFAULT_SUPABASE_ANON_KEY, DEFAULT_SUPABASE_URL } from '../../shared/supabaseDefaults.js';

function getRequiredEnv(name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY') {
  const fallback = name === 'VITE_SUPABASE_URL' ? DEFAULT_SUPABASE_URL : DEFAULT_SUPABASE_ANON_KEY;
  const value = import.meta.env[name]?.trim();
  if (!value && !fallback) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || fallback;
}

export function createBrowserSupabaseClient() {
  const url = getRequiredEnv('VITE_SUPABASE_URL');
  const anonKey = getRequiredEnv('VITE_SUPABASE_ANON_KEY');

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
