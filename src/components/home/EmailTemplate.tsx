import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';

interface EmailTemplateProps {
  visible: boolean;
}

export default function EmailTemplate({ visible }: EmailTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (visible && containerRef.current) {
      // Apply initial animation when component becomes visible
      const container = containerRef.current;
      
      // Reset initial state
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      // Trigger animation with minimal delay
      setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 50);
    }
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative will-change-[transform,opacity]"
      style={{
        backfaceVisibility: 'hidden', // Prevents flickering
      }}
    >
      {/* Subtle grid background for visual texture */}
      <div className="absolute inset-0 -z-10">
        <GridPattern width={16} height={16} x={-1} y={-1} className="fill-gray-100/30 stroke-gray-100/30" />
      </div>
      
      {/* Subtle shadow decoration */}
      <div className="absolute -bottom-4 -right-4 w-2/3 h-24 bg-gray-100 rounded-xl -z-20 opacity-70"></div>
      
      <motion.div 
        className="relative aspect-[4/3] w-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 10
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0] // Custom easing similar to power2.out in GSAP
        }}
      >
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <div className="w-full h-full relative">
            <Image 
              src="/images/email-template-ui.png"
              alt="Email automation template"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ 
                objectFit: 'contain',
                backfaceVisibility: 'hidden', // Prevents flickering
              }}
              className="rounded-t-lg will-change-[transform,opacity]"
            />
          </div>
        </div>
        
        {/* Overlay UI Elements */}
        <div className="absolute top-4 left-4 bg-gray-100 text-gray-800 rounded-md px-2 py-1 text-xs font-medium opacity-90">
          Automated Email Sequence
        </div>
        
        <motion.div 
          className="absolute bottom-4 right-4 flex space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="bg-black text-white text-xs rounded-md px-2 py-1">
            Preview
          </div>
          <div className="bg-gray-100 text-gray-800 text-xs rounded-md px-2 py-1">
            Edit Template
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
