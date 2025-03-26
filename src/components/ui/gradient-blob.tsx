'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BlobPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
type BlobColor = 'red' | 'gray';

interface GradientBlobProps {
  position: BlobPosition;
  color: BlobColor;
  className?: string;
}

const positionStyles = {
  'top-left': '-top-64 -left-64',
  'top-right': '-top-64 -right-64',
  'bottom-left': '-bottom-64 -left-64',
  'bottom-right': '-bottom-64 -right-64',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

const colorStyles = {
  'red': 'from-brand-red/20 to-transparent',
  'gray': 'from-gray-300/20 to-transparent',
};

/**
 * Gradient blob component that creates a subtle background effect
 * following the Attio-inspired design system
 */
const GradientBlob: React.FC<GradientBlobProps> = ({ 
  position, 
  color, 
  className 
}) => {
  return (
    <motion.div
      className={cn(
        'absolute w-[500px] h-[500px] rounded-full opacity-30 bg-gradient-radial pointer-events-none',
        positionStyles[position],
        colorStyles[color],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
};

export default GradientBlob;
