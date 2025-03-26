'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white shadow-md' : 'py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-brand-black">OpsFX</span>
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <MegaMenu />
            
            {/* CTA buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <motion.span 
                  className="text-sm font-medium text-brand-black hover:text-brand-red transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign in
                </motion.span>
              </Link>
              <Link href="/auth/register">
                <motion.span 
                  className="px-4 py-2 text-sm font-medium bg-brand-red text-white rounded-md hover:bg-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Sign up
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-brand-black p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
