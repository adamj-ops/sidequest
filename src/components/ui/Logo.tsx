import React from 'react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
};

export const Logo = ({ className, size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-7xl',
    full: 'text-[180px] w-[507px] h-40',
  };

  return (
    <div 
      className={cn(
        "flex items-center font-black text-stone-900",
        "[text-shadow:_0px_4px_4px_rgb(111_111_111_/_0.25)]",
        sizeClasses[size],
        className
      )}
      style={{ fontFamily: 'Aileron, sans-serif' }}
    >
      opsfx
    </div>
  );
};

export default Logo;
