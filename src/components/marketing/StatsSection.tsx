import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Section } from './MarketingLayout';

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  stats: Stat[];
  className?: string;
  background?: 'light' | 'dark' | 'accent';
  variant?: 'grid' | 'inline' | 'cards';
}

export function StatsSection({
  title,
  subtitle,
  stats,
  className,
  background = 'light',
  variant = 'grid'
}: StatsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const renderStatsGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
            {stat.value}
          </div>
          <div className="text-lg font-medium mb-2">{stat.label}</div>
          {stat.description && (
            <p className="text-muted-foreground">{stat.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderStatsInline = () => (
    <div className="flex flex-wrap justify-center gap-12 mt-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
            {stat.value}
          </div>
          <div className="text-lg font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-background rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-300"
        >
          <div className="text-3xl md:text-4xl font-bold text-accent-primary mb-2">
            {stat.value}
          </div>
          <div className="text-lg font-medium mb-2">{stat.label}</div>
          {stat.description && (
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderStats = () => {
    switch (variant) {
      case 'grid':
        return renderStatsGrid();
      case 'inline':
        return renderStatsInline();
      case 'cards':
        return renderStatsCards();
      default:
        return renderStatsGrid();
    }
  };

  return (
    <Section 
      className={className}
      background={background}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto">
            {title && (
              <motion.h2 
                variants={itemVariants} 
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {title}
              </motion.h2>
            )}
            
            {subtitle && (
              <motion.p 
                variants={itemVariants}
                className="text-xl text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        {renderStats()}
      </motion.div>
    </Section>
  );
}
