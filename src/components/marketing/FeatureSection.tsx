import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Section } from './MarketingLayout';

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  features: Feature[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
  imagePosition?: 'right' | 'left' | 'top' | 'bottom';
  variant?: 'grid' | 'grid-icons' | 'list' | 'two-column';
}

export function FeatureSection({
  title,
  subtitle,
  features,
  image,
  className,
  imagePosition = 'right',
  variant = 'grid'
}: FeatureSectionProps) {
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

  const renderFeatureGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-background p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
        >
          {feature.icon && (
            <div className="mb-4 text-accent-primary">{feature.icon}</div>
          )}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );

  const renderFeatureGridIcons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex flex-col items-center text-center p-6"
        >
          {feature.icon && (
            <div className="mb-4 text-accent-primary bg-accent-primary/10 p-4 rounded-full">{feature.icon}</div>
          )}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );

  const renderFeatureList = () => (
    <div className="space-y-12 mt-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex gap-6"
        >
          {feature.icon && (
            <div className="text-accent-primary bg-accent-primary/10 p-4 rounded-lg h-fit">{feature.icon}</div>
          )}
          <div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderFeatureTwoColumn = () => {
    const showImageLeft = imagePosition === 'left';
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
        {showImageLeft && image && (
          <motion.div 
            variants={itemVariants}
            className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-auto"
            />
            
            {/* Subtle highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 pointer-events-none" />
          </motion.div>
        )}
        
        <div className="space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-4"
            >
              {feature.icon && (
                <div className="text-accent-primary bg-accent-primary/10 p-3 rounded-lg h-fit">{feature.icon}</div>
              )}
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {!showImageLeft && image && (
          <motion.div 
            variants={itemVariants}
            className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-auto"
            />
            
            {/* Subtle highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 pointer-events-none" />
          </motion.div>
        )}
      </div>
    );
  };

  const renderFeatures = () => {
    switch (variant) {
      case 'grid':
        return renderFeatureGrid();
      case 'grid-icons':
        return renderFeatureGridIcons();
      case 'list':
        return renderFeatureList();
      case 'two-column':
        return renderFeatureTwoColumn();
      default:
        return renderFeatureGrid();
    }
  };

  return (
    <Section className={className}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full"
      >
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
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
        
        {renderFeatures()}
      </motion.div>
    </Section>
  );
}
