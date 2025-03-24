'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, getCurrentSession, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isManager: boolean;
  isClient: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const currentSession = await getCurrentSession();
        const currentUser = await getCurrentUser();
        
        setSession(currentSession);
        setUser(currentUser);

        if (currentUser) {
          // Fetch user role from the database
          const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', currentUser.id)
            .single();

          if (!error && userData) {
            setUserRole(userData.role);
          }
        }

        // Set up auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user || null);
            
            if (session?.user) {
              // Update role when auth state changes
              const { data: userData, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', session.user.id)
                .single();

              if (!error && userData) {
                setUserRole(userData.role);
              }
            } else {
              setUserRole(null);
            }
          }
        );

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await supabaseSignIn(email, password);
      if (!result.error && result.data.user) {
        // Fetch user role
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', result.data.user.id)
          .single();

        if (!error && userData) {
          setUserRole(userData.role);
        }
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setIsLoading(true);
    try {
      const result = await supabaseSignUp(email, password, userData);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabaseSignOut();
      setUserRole(null);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAdmin: userRole === 'admin',
        isManager: userRole === 'manager',
        isClient: userRole === 'client',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
