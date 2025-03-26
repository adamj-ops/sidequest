import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  logoCloud?: {
    title?: string;
    logos: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
  };
  className?: string;
  variant?: 'centered' | 'split' | 'imageBg';
}

export function HeroSection({
  title,
  subtitle,
  cta,
  image,
  logoCloud,
  className,
  variant = 'centered'
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const renderContent = () => {
    switch (variant) {
      case 'centered':
        return (
          <div className="w-full text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.div 
                  variants={itemVariants}
                  className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
                >
                  {subtitle}
                </motion.div>
              )}
              
              {cta && (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  {cta.primary && (
                    <Button size="lg" asChild>
                      <a href={cta.primary.href}>{cta.primary.text}</a>
                    </Button>
                  )}
                  
                  {cta.secondary && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={cta.secondary.href}>{cta.secondary.text}</a>
                    </Button>
                  )}
                </motion.div>
              )}
              
              {image && (
                <motion.div 
                  variants={itemVariants}
                  className="mt-16 relative px-4"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto"
                    />
                    
                    {/* Reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-50 pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {logoCloud && (
              <div className="mt-20">
                {logoCloud.title && (
                  <p className="text-sm text-muted-foreground mb-6">{logoCloud.title}</p>
                )}
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                  {logoCloud.logos.map((logo, i) => (
                    <div key={i} className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300">
                      <Image 
                        src={logo.src} 
                        alt={logo.alt} 
                        width={logo.width} 
                        height={logo.height}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'split':
        return (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6"
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.div 
                  variants={itemVariants}
                  className="text-xl text-muted-foreground mb-8"
                >
                  {subtitle}
                </motion.div>
              )}
              
              {cta && (
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  {cta.primary && (
                    <Button size="lg" asChild>
                      <a href={cta.primary.href}>{cta.primary.text}</a>
                    </Button>
                  )}
                  
                  {cta.secondary && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={cta.secondary.href}>{cta.secondary.text}</a>
                    </Button>
                  )}
                </motion.div>
              )}
              
              {logoCloud && (
                <div className="mt-12">
                  {logoCloud.title && (
                    <p className="text-sm text-muted-foreground mb-6">{logoCloud.title}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
                    {logoCloud.logos.map((logo, i) => (
                      <div key={i} className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300">
                        <Image 
                          src={logo.src} 
                          alt={logo.alt} 
                          width={logo.width} 
                          height={logo.height}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
            
            {image && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.8, delay: 0.3 }
                }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto"
                  />
                  
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-50 pointer-events-none" />
                </div>
                
                {/* Background elements */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-xl bg-gray-200/50" />
                <div className="absolute -z-20 -bottom-12 -right-12 w-full h-full rounded-xl bg-gray-200/30" />
              </motion.div>
            )}
          </div>
        );
        
      case 'imageBg':
        return (
          <div className="relative">
            {image && (
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/70" />
              </div>
            )}
            
            <div className="relative z-10 text-white text-center py-12">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
                >
                  {title}
                </motion.h1>
                
                {subtitle && (
                  <motion.div 
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                  >
                    {subtitle}
                  </motion.div>
                )}
                
                {cta && (
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    {cta.primary && (
                      <Button size="lg" variant="default" asChild>
                        <a href={cta.primary.href}>{cta.primary.text}</a>
                      </Button>
                    )}
                    
                    {cta.secondary && (
                      <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white" asChild>
                        <a href={cta.secondary.href}>{cta.secondary.text}</a>
                      </Button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "py-16 md:py-24",
      className
    )}>
      {renderContent()}
    </div>
  );
}
