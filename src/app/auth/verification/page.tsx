'use client';

import Link from 'next/link';

export default function VerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-black">
            Check your email
          </h2>
          <div className="mt-8">
            <svg 
              className="mx-auto h-16 w-16 text-brand-red" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <p className="mt-6 text-base text-gray-600">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Didn't receive an email?{' '}
            <button 
              className="font-medium text-brand-red hover:text-red-600 transition-colors"
              onClick={() => alert('Resend verification feature to be implemented')}
            >
              Resend verification email
            </button>
          </p>
        </div>
        
        <div className="mt-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-red hover:bg-red-600 transition-colors"
          >
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}
