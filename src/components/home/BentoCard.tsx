'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  link?: string;
  color?: 'red' | 'grey' | 'black' | 'white';
  size?: 'normal' | 'large';
  delay?: number;
  className?: string;
  accentBorder?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  icon,
  link,
  color = 'white',
  size = 'normal',
  delay = 0,
  className = '',
  accentBorder = false,
}) => {
  // Simple color styles with transparent background
  const colorStyles = {
    red: 'text-foreground',
    grey: 'text-foreground',
    black: 'text-foreground',
    white: 'text-foreground',
  };

  const sizeStyles = {
    normal: 'col-span-1',
    large: 'col-span-1 md:col-span-2',
  };
  
  // Text styles
  const titleStyles = {
    red: 'text-foreground font-medium',
    grey: 'text-foreground font-medium',
    black: 'text-foreground font-medium',
    white: 'text-foreground font-medium',
  };
  
  const descriptionStyles = {
    red: 'text-muted-foreground',
    grey: 'text-muted-foreground',
    black: 'text-muted-foreground',
    white: 'text-muted-foreground',
  };

  const content = (
    <motion.div
      className={cn(
        `rounded-lg p-6 bg-transparent ${colorStyles[color]} ${sizeStyles[size]}`,
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
        "border border-border",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      {icon && (
        <div className={cn(
          "mb-4 flex items-center justify-center w-10 h-10 rounded-full",
          color === 'red' ? 'text-brand-red bg-brand-red/10' : 'text-foreground bg-gray-100'
        )}>
          {icon}
        </div>
      )}
      <h3 className={`text-xl ${titleStyles[color]} mb-2`}>{title}</h3>
      <p className={descriptionStyles[color]}>
        {description}
      </p>
    </motion.div>
  );

  return link ? (
    <Link href={link} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

export default BentoCard;
