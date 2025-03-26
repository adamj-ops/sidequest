'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialProps {
  quote: {
    text: string[];
    author: string;
    role: string;
    company: string;
  };
  debug?: boolean;
}

const TestimonialScroll: React.FC<TestimonialProps> = ({ quote, debug = false }) => {
  const [opacity, setOpacity] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effect for fade out
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When section is leaving the viewport (bottom edge at top of viewport or higher)
      if (rect.bottom <= 0) {
        setOpacity(0);
      } 
      // When section is fully in viewport
      else if (rect.top <= 0 && rect.bottom > windowHeight * 0.5) {
        setOpacity(1);
      }
      // When section is starting to leave, gradually fade out
      else if (rect.bottom <= windowHeight) {
        // Calculate opacity based on how far the bottom is from the viewport bottom
        // 1 when bottom is at viewport bottom, 0 when bottom is at viewport top
        const newOpacity = Math.max(0, Math.min(1, rect.bottom / (windowHeight * 0.5)));
        setOpacity(newOpacity);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Setup GSAP text color animations
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    
    // Kill any existing animations
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });
    
    // Setup initial state
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      color: "rgb(230, 230, 230)"
    });
    
    // Create timeline for text color transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: contentRef.current,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: 1,
        markers: debug
      }
    });
    
    // Add text color animations
    tl.to(line1Ref.current, {
      color: "rgb(0, 0, 0)",
      duration: 0.3,
      ease: "power1.inOut"
    }, 0);
    
    tl.to(line2Ref.current, {
      color: "rgb(0, 0, 0)",
      duration: 0.3,
      ease: "power1.inOut"
    }, 0.15);
    
    tl.to(line3Ref.current, {
      color: "rgb(0, 0, 0)",
      duration: 0.3,
      ease: "power1.inOut"
    }, 0.3);
    
    // Background pattern movement
    tl.to(dotsRef.current, {
      y: 100,
      duration: 1,
      ease: "none"
    }, 0);
    
    // Clean up on unmount
    return () => {
      triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [debug]);
  
  return (
    <div 
      ref={sectionRef}
      className="relative"
      style={{ height: "100vh" }}
    >
      <div 
        ref={contentRef}
        className="sticky top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ 
          opacity,
          transition: "opacity 0.3s ease-out" 
        }}
      >
        {/* Background pattern */}
        <div 
          ref={dotsRef}
          className="absolute inset-0 opacity-5"
        >
          <div className="h-screen w-screen grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
            {Array.from({ length: 400 }).map((_, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-gray-500" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Quote content */}
        <div className="relative z-10 text-center mx-auto max-w-4xl px-4">
          {/* Quote mark */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-brand-red/10 text-8xl font-serif">
            "
          </div>
          
          {/* Quote text lines */}
          <h2 
            ref={line1Ref}
            className="text-3xl md:text-5xl font-medium leading-tight mb-3"
          >
            {quote.text[0]}
          </h2>
          
          <h2 
            ref={line2Ref}
            className="text-3xl md:text-5xl font-medium leading-tight mb-3"
          >
            {quote.text[1]}
          </h2>
          
          <h2 
            ref={line3Ref}
            className="text-3xl md:text-5xl font-medium leading-tight mb-12"
          >
            {quote.text[2]}
          </h2>
          
          {/* Author info */}
          <div className="mt-14 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-red/5 flex items-center justify-center mb-4">
              <span className="text-brand-red font-medium">
                {quote.author.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
            <p className="text-lg font-medium">{quote.author}</p>
            <p className="text-muted-foreground text-sm">{quote.role} · {quote.company}</p>
          </div>
        </div>
      </div>
      
      {/* Debug indicator */}
      {debug && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-xs z-50">
          <p>Debug mode: ON</p>
          <p>Scroll to see animation</p>
          <p>Opacity: {opacity.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialScroll;
