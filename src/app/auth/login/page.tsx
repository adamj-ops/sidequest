'use client';

import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-brand-white px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-brand-black mb-2">OpsFX</h1>
            <p className="text-gray-500">Customer Portal</p>
          </Link>
        </div>
        
        <div className="bg-brand-grey p-8 rounded-lg shadow-md">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}
