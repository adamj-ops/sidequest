import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GridPattern } from './grid-pattern';
import { ScrollFadeText } from "./scroll-fade-text";

// SECTION COMPONENT
export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  number?: string;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  background?: 'none' | 'grid' | 'dots' | 'angled';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  number,
  title,
  subtitle,
  fullWidth = false,
  background = 'none',
  id
}) => {
  return (
    <section id={id} className={`py-24 relative overflow-hidden ${className}`}>
      {background !== 'none' && (
        <div className="absolute inset-0 -z-10">
          {background === 'grid' && (
            <GridPattern 
              width={40} 
              height={40} 
              className="opacity-[0.03] dark:opacity-[0.05]" 
              strokeDasharray="1 0"
            />
          )}
          {background === 'dots' && (
            <GridPattern 
              width={24} 
              height={24} 
              className="opacity-[0.03] dark:opacity-[0.05]" 
              strokeDasharray="0"
              squares={[[0, 0]]}
            />
          )}
          {background === 'angled' && (
            <GridPattern 
              width={40} 
              height={40} 
              x={0}
              y={0}
              className="opacity-[0.03] rotate-[5deg] scale-150 dark:opacity-[0.05]" 
              strokeDasharray="1 0"
            />
          )}
        </div>
      )}
      <div className={`mx-auto ${fullWidth ? 'px-4 sm:px-6 lg:px-8' : 'container max-w-7xl'}`}>
        {(number || title || subtitle) && (
          <div className="mb-16">
            {number && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-brand-red font-mono text-sm font-medium tracking-tight">[{number}]</span>
                {subtitle && (
                  <ScrollFadeText as="h2" className="text-lg font-medium">
                    {subtitle}
                  </ScrollFadeText>
                )}
              </div>
            )}
            
            {title && (
              <ScrollFadeText as="h3" className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl" threshold={0.1}>
                {title}
              </ScrollFadeText>
            )}
          </div>
        )}
        
        <ScrollFadeText threshold={0.15}>
          {children}
        </ScrollFadeText>
      </div>
    </section>
  );
};

// CARD COMPONENT
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'ghost';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  hover = false,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-card border border-border/40',
    ghost: 'bg-transparent'
  };

  return (
    <motion.div 
      className={`rounded-lg p-6 ${variantClasses[variant]} ${hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]' : ''} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// BUTTON COMPONENT
export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = "", 
  variant = 'primary',
  size = 'md',
  onClick
}) => {
  const variantClasses = {
    primary: 'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground/20',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/20',
    outline: 'border border-border bg-transparent hover:bg-card/50 focus:ring-foreground/10',
    ghost: 'bg-transparent hover:bg-card/50 focus:ring-foreground/10',
    link: 'bg-transparent underline-offset-4 hover:underline text-primary focus:ring-primary/10'
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-4 py-2 h-10',
    lg: 'text-base px-6 py-2.5 h-12'
  };

  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// BADGE COMPONENT
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = ""
}) => {
  const variantClasses = {
    default: 'bg-card text-muted-foreground border-border/50',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    info: 'bg-info/10 text-info border-info/20'
  };

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// GRID BACKGROUND COMPONENT
export interface GridBackgroundProps {
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <GridPattern 
        width={40} 
        height={40} 
        className="opacity-[0.03] dark:opacity-[0.05]" 
        strokeDasharray="1 0"
      />
    </div>
  );
};

// GRADIENT BLOB COMPONENT
export interface GradientBlobProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  color?: 'red' | 'gray';
  className?: string;
}

export const GradientBlob: React.FC<GradientBlobProps> = ({ 
  position = 'center',
  color = 'gray',
  className = ""
}) => {
  const positionClasses = {
    'top-left': 'top-10 left-10',
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10',
    'bottom-right': 'bottom-10 right-10',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const colorClasses = {
    'red': 'bg-red-glow',
    'gray': 'bg-gradient-to-r from-gray-800/40 to-gray-900/30',
  };

  return (
    <div className={`fixed w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 dark:opacity-40 ${positionClasses[position]} ${colorClasses[color]} z-0 pointer-events-none ${className}`}>
    </div>
  );
};

// FEATURE NUMBER COMPONENT
export interface FeatureNumberProps {
  number: string;
  className?: string;
}

export const FeatureNumber: React.FC<FeatureNumberProps> = ({ 
  number,
  className = ""
}) => {
  return (
    <div className={`inline-flex items-center justify-center rounded-full w-8 h-8 bg-brand-red/10 text-brand-red font-mono text-sm font-medium ${className}`}>
      {number}
    </div>
  );
};

// DIVIDER COMPONENT
export interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  className = "",
  orientation = 'horizontal'
}) => {
  return (
    <div className={`${orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full'} bg-border/50 ${className}`} />
  );
};

// TEXT COMPONENTS
export const Title: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = "" }) => {
  return <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${className}`}>{children}</h2>;
};

export const Subtitle: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = "" }) => {
  return <p className={`text-lg text-muted-foreground ${className}`}>{children}</p>;
};

export const Paragraph: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = "" }) => {
  return <p className={`leading-relaxed text-muted-foreground ${className}`}>{children}</p>;
};
