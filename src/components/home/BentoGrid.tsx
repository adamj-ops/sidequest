'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className = '',
  title,
  subtitle,
}) => {
  return (
    <section className={`py-16 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-brand-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
};

export default BentoGrid;
