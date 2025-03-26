import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CheckIcon, XIcon } from 'lucide-react';
import { Section } from './MarketingLayout';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  description?: string;
  price: {
    monthly: string;
    annually?: string;
  };
  features: PricingFeature[];
  cta: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
  badge?: string;
}

interface PricingSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  tiers: PricingTier[];
  className?: string;
  billingPeriod?: 'monthly' | 'annually';
  showToggle?: boolean;
  background?: 'light' | 'dark' | 'accent';
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  className,
  billingPeriod: initialBillingPeriod = 'monthly',
  showToggle = true,
  background = 'light'
}: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = React.useState(initialBillingPeriod);
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
        
        {showToggle && (
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billingPeriod === 'monthly' 
                    ? "bg-white shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annually')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billingPeriod === 'annually' 
                    ? "bg-white shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Annually
              </button>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={cn(
                "rounded-lg border transition-all duration-200",
                tier.highlighted 
                  ? "border-accent-primary shadow-lg relative scale-105 lg:scale-110 my-4 bg-white z-10" 
                  : "border-gray-200 bg-background hover:border-gray-300 hover:shadow-md"
              )}
            >
              {tier.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {tier.badge}
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                {tier.description && (
                  <p className="mt-2 text-muted-foreground">{tier.description}</p>
                )}
                
                <div className="mt-5 mb-5">
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-extrabold">
                      {billingPeriod === 'annually' && tier.price.annually 
                        ? tier.price.annually 
                        : tier.price.monthly}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {billingPeriod === 'annually' ? '/year' : '/month'}
                    </span>
                  </div>
                  
                  {billingPeriod === 'annually' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually
                    </p>
                  )}
                </div>
                
                <Button 
                  asChild
                  className={cn(
                    "w-full", 
                    tier.highlighted ? "" : "bg-accent-primary hover:bg-accent-secondary"
                  )}
                >
                  <a href={tier.cta.href}>{tier.cta.text}</a>
                </Button>
                
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      {feature.included ? (
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                      ) : (
                        <XIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mr-3" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
