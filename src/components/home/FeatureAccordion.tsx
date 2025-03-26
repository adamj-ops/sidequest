import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GridPattern } from '@/components/ui/grid-pattern';

type AccordionItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const accordionItems: AccordionItem[] = [
  {
    id: 'capture',
    title: 'Capture high-intent leads.',
    subtitle: 'in the loop.',
    description: 'Engage your leads from the start by setting up personalized nurture and onboarding flows, right inside Attio.',
    image: '/images/leads-capture.png'
  },
  {
    id: 'harness',
    title: 'Harness the power of workflows.',
    subtitle: 'for your team.',
    description: 'Automate your operations and ensure consistent follow-ups with customizable workflows that adapt to your team\'s needs.',
    image: '/images/workflows-power.png'
  },
  {
    id: 'multiple',
    title: 'Multiple senders, single sequence.',
    subtitle: 'stay organized.',
    description: 'Coordinate outreach efforts across your team while maintaining a unified view of all communications and next steps.',
    image: '/images/multi-sender.png'
  }
];

export default function FeatureAccordion() {
  const [activeItem, setActiveItem] = useState<string>(accordionItems[0].id);
  const accordionRef = useRef<HTMLDivElement>(null);
  
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  // Find the active item to get its image
  const activeAccordionItem = accordionItems.find(item => item.id === activeItem);
  
  // For staggered animations on mount
  useEffect(() => {
    const accordionItems = accordionRef.current?.querySelectorAll('.accordion-item');
    if (accordionItems) {
      accordionItems.forEach((item, index) => {
        // Add a subtle staggered animation on initial load
        setTimeout(() => {
          item.classList.add('animate-in');
        }, 100 * index);
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      {/* Left side: Accordion */}
      <div className="space-y-6" ref={accordionRef}>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          Keep your leads
          <br />
          <span className="text-gray-400">in the loop.</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          No more manual work. Automate and personalize your emails and follow-ups to close more deals.
        </p>
        
        <div className="space-y-4">
          {accordionItems.map((item) => (
            <div 
              key={item.id}
              className={`accordion-item border-b border-gray-200 pb-4 opacity-0 transition-opacity duration-500 ease-out ${activeItem === item.id ? 'opacity-100' : 'opacity-70'}`}
            >
              <button
                onClick={() => handleItemClick(item.id)}
                className="w-full text-left flex items-center justify-between group"
              >
                <h3 className="text-lg font-medium group-hover:text-gray-800 transition-colors duration-200">{item.title}</h3>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform duration-300 ease-out will-change-transform ${activeItem === item.id ? 'rotate-180' : ''}`}
                  style={{
                    backfaceVisibility: 'hidden', // Prevents flickering
                  }}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      duration: 0.25, 
                      ease: [0.25, 0.1, 0.25, 1.0], // Custom easing similar to power2.out in GSAP
                    }}
                    className="overflow-hidden pt-2 will-change-[transform,opacity]"
                    style={{
                      backfaceVisibility: 'hidden', // Prevents flickering
                    }}
                  >
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side: Image display */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 rounded-xl -translate-x-4 translate-y-4">
          <GridPattern width={24} height={24} x={-1} y={-1} className="fill-gray-100/50 stroke-gray-100/50" />
        </div>
        
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            {activeAccordionItem && (
              <motion.div
                key={activeAccordionItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ 
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1.0] // Custom easing similar to power2.out in GSAP
                }}
                className="absolute inset-0 will-change-[transform,opacity]"
                style={{
                  backfaceVisibility: 'hidden', // Prevents flickering
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activeAccordionItem.image}
                    alt={activeAccordionItem.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ 
                      objectFit: 'cover',
                      backfaceVisibility: 'hidden', // Prevents flickering
                    }}
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
