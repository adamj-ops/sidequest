import React from 'react';
import { cn } from '@/lib/utils';

interface MarketingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MarketingLayout({
  children,
  className,
}: MarketingLayoutProps) {
  return (
    <div className={cn('w-full bg-background', className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  background?: 'light' | 'dark' | 'accent' | 'gradient';
}

export function Section({ 
  children, 
  className, 
  id,
  fullWidth = false,
  background = 'light'
}: SectionProps) {
  const bgClasses = {
    'light': 'bg-background text-foreground',
    'dark': 'bg-gray-950 text-white',
    'accent': 'bg-accent-primary/10 text-foreground',
    'gradient': 'bg-gradient-to-b from-background to-gray-100 text-foreground'
  };

  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24', 
        bgClasses[background],
        className
      )}
    >
      <div className={cn(
        fullWidth ? 'w-full' : 'container max-w-7xl mx-auto px-4 md:px-6'
      )}>
        {children}
      </div>
    </section>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ 
  children, 
  className,
  size = 'lg' 
}: ContainerProps) {
  const sizeClasses = {
    'sm': 'max-w-3xl',
    'md': 'max-w-4xl',
    'lg': 'max-w-5xl',
    'xl': 'max-w-7xl',
    'full': 'w-full'
  };

  return (
    <div className={cn(
      'mx-auto px-4 md:px-6',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}
