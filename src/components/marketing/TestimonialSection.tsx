import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Section } from './MarketingLayout';
import { Separator } from '@/components/ui/separator';

interface Testimonial {
  quote: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: {
      src: string;
      alt: string;
    };
  };
  rating?: number;
}

interface TestimonialSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  testimonials: Testimonial[];
  className?: string;
  variant?: 'cards' | 'grid' | 'slider' | 'featured';
  background?: 'light' | 'dark' | 'accent';
}

export function TestimonialSection({
  title,
  subtitle,
  testimonials,
  className,
  variant = 'cards',
  background = 'light'
}: TestimonialSectionProps) {
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

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={i < rating ? "" : "text-gray-300"}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  const renderTestimonialCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-background rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {testimonial.rating && <StarRating rating={testimonial.rating} />}
          
          <blockquote className="text-lg mb-6">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="flex items-center gap-4">
            {testimonial.author.avatar && (
              <div className="rounded-full overflow-hidden flex-shrink-0 h-12 w-12">
                <Image
                  src={testimonial.author.avatar.src}
                  alt={testimonial.author.avatar.alt}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            
            <div>
              <p className="font-medium">{testimonial.author.name}</p>
              {(testimonial.author.title || testimonial.author.company) && (
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.title}
                  {testimonial.author.title && testimonial.author.company && ", "}
                  {testimonial.author.company}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTestimonialGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="border-l-2 border-accent-primary pl-4 md:pl-6"
        >
          {testimonial.rating && <StarRating rating={testimonial.rating} />}
          
          <blockquote className="text-lg mb-4">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="flex items-center gap-4">
            {testimonial.author.avatar && (
              <div className="rounded-full overflow-hidden flex-shrink-0 h-10 w-10">
                <Image
                  src={testimonial.author.avatar.src}
                  alt={testimonial.author.avatar.alt}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            
            <div>
              <p className="font-medium">{testimonial.author.name}</p>
              {(testimonial.author.title || testimonial.author.company) && (
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.title}
                  {testimonial.author.title && testimonial.author.company && ", "}
                  {testimonial.author.company}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTestimonialFeatured = () => {
    // Only use the first testimonial for the featured variant
    const testimonial = testimonials[0];
    
    return (
      <motion.div
        variants={containerVariants}
        className="relative mx-auto max-w-4xl rounded-xl border border-gray-200 p-8 md:p-12 bg-background/80 backdrop-blur-sm shadow-xl mt-16"
      >
        <motion.div variants={itemVariants} className="absolute -top-5 -left-2 text-accent-primary text-7xl opacity-30">"</motion.div>
        
        {testimonial.rating && (
          <motion.div variants={itemVariants}>
            <StarRating rating={testimonial.rating} />
          </motion.div>
        )}
        
        <motion.blockquote 
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium text-foreground mb-8 relative z-10"
        >
          {testimonial.quote}
        </motion.blockquote>
        
        <Separator className="mb-6" />
        
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-4"
        >
          {testimonial.author.avatar && (
            <div className="rounded-full overflow-hidden flex-shrink-0 h-14 w-14">
              <Image
                src={testimonial.author.avatar.src}
                alt={testimonial.author.avatar.alt}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
          )}
          
          <div>
            <p className="font-medium text-lg">{testimonial.author.name}</p>
            {(testimonial.author.title || testimonial.author.company) && (
              <p className="text-muted-foreground">
                {testimonial.author.title}
                {testimonial.author.title && testimonial.author.company && ", "}
                {testimonial.author.company}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderTestimonials = () => {
    switch (variant) {
      case 'cards':
        return renderTestimonialCards();
      case 'grid':
        return renderTestimonialGrid();
      case 'featured':
        return renderTestimonialFeatured();
      case 'slider':
        // This would ideally use a carousel component like embla-carousel
        return renderTestimonialCards();
      default:
        return renderTestimonialCards();
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
        
        {renderTestimonials()}
      </motion.div>
    </Section>
  );
}
