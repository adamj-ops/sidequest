'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
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
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to access your projects</p>
        </div>
        
        {error && (
          <motion.div 
            className="bg-gray-900 border border-status-error text-status-error px-4 py-3 rounded-md"
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
            <input type="checkbox" className="w-4 h-4 mr-2 text-accent-primary bg-gray-900 border-gray-700 rounded focus:ring-accent-primary" />
            <span className="text-sm text-gray-300">Remember me</span>
          </label>
          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-gray-300 hover:text-accent-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
          className="mt-6"
        >
          Sign in
        </Button>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-accent-primary hover:text-accent-hover transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};
