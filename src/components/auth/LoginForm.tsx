'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-brand-black">Welcome back</h1>
          <p className="text-gray-500">Sign in to access your projects</p>
        </div>
        
        {error && (
          <motion.div 
            className="bg-red-50 border border-brand-red text-brand-red px-4 py-3 rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {error}
          </motion.div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          autoComplete="email"
          variant="filled"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          autoComplete="current-password"
          variant="filled"
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2 text-brand-red bg-white border-gray-300 rounded focus:ring-brand-red" />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-gray-600 hover:text-brand-red transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-6 bg-brand-red hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : 'Sign in'}
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-brand-red hover:text-red-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};
