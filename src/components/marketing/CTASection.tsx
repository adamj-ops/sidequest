import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Section } from './MarketingLayout';

interface CTASectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  className?: string;
  variant?: 'centered' | 'split' | 'gradient';
  background?: 'light' | 'dark' | 'accent';
}

export function CTASection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  className,
  variant = 'centered',
  background = 'accent'
}: CTASectionProps) {
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
        delayChildren: 0.1
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

  const renderCentered = () => (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center max-w-3xl mx-auto py-8 md:py-16"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          variants={itemVariants}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button size="lg" asChild>
          <a href={primaryCTA.href}>{primaryCTA.text}</a>
        </Button>
        
        {secondaryCTA && (
          <Button size="lg" variant="outline" asChild>
            <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
          </Button>
        )}
      </motion.div>
    </motion.div>
  );

  const renderSplit = () => (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid md:grid-cols-2 items-center gap-8"
    >
      <div>
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            variants={itemVariants}
            className="text-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-4 md:justify-end"
      >
        <Button size="lg" asChild>
          <a href={primaryCTA.href}>{primaryCTA.text}</a>
        </Button>
        
        {secondaryCTA && (
          <Button size="lg" variant="outline" asChild>
            <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
          </Button>
        )}
      </motion.div>
    </motion.div>
  );

  const renderGradient = () => (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent-primary to-accent-tertiary p-10 md:p-16 text-white"
    >
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" variant="default" className="bg-white text-accent-primary hover:bg-white/90" asChild>
            <a href={primaryCTA.href}>{primaryCTA.text}</a>
          </Button>
          
          {secondaryCTA && (
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10" 
              asChild
            >
              <a href={secondaryCTA.href}>{secondaryCTA.text}</a>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'centered':
        return renderCentered();
      case 'split':
        return renderSplit();
      case 'gradient':
        return renderGradient();
      default:
        return renderCentered();
    }
  };

  return (
    <Section 
      className={cn("py-12 md:py-20", className)}
      background={background}
    >
      {renderContent()}
    </Section>
  );
}
