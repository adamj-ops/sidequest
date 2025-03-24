'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Verifying your account...');

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Get the query parameters from the URL
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        if (token_hash && type) {
          // The Supabase client will handle the token automatically
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any
          });

          if (error) {
            setStatus('error');
            setMessage(`Error verifying your account: ${error.message}`);
          } else {
            setStatus('success');
            setMessage('Your account has been verified successfully!');
            // Redirect to login after 3 seconds
            setTimeout(() => {
              router.push('/auth/login');
            }, 3000);
          }
        } else {
          setStatus('error');
          setMessage('Invalid verification parameters.');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(`Error processing verification: ${error.message}`);
      }
    };

    handleEmailVerification();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white mb-2">OpsFX</h1>
            <p className="text-gray-400">Customer Portal</p>
          </Link>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800">
          <div className="text-center">
            {status === 'processing' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-12 h-12 border-t-2 border-stone-200 border-solid rounded-full mx-auto mb-4"
              />
            )}
            
            {status === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
            )}
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {status === 'processing' ? 'Verifying Your Account' : 
               status === 'success' ? 'Account Verified!' : 
               'Verification Failed'}
            </h2>
            
            <p className="text-gray-400">{message}</p>
            
            {status !== 'processing' && (
              <div className="mt-6">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  {status === 'success' ? 'Proceed to Login' : 'Return to Login'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
