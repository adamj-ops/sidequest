import { createClient, Session, User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication methods
export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string, userData: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: userData }
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email);
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
};

export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
};
