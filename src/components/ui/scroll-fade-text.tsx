"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, Variant } from "framer-motion";

export type AnimationEffect = 'fade' | 'slide-up' | 'slide-in' | 'zoom';
export type ColorTransition = 'gray-to-black' | 'custom' | 'none';

interface ScrollFadeTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  threshold?: number; // 0-1, when to trigger the animation
  effect?: AnimationEffect; // Animation type
  colorTransition?: ColorTransition; // Color transition type
  fromColor?: string; // Custom starting color (if colorTransition is 'custom')
  toColor?: string; // Custom ending color (if colorTransition is 'custom')
  duration?: number; // Animation duration in ms
  delay?: number; // Animation delay in ms
  staggerIndex?: number; // For creating staggered effects among siblings
  staggerAmount?: number; // Delay between staggered items in ms
}

export const ScrollFadeText = ({
  children,
  className = "",
  as: Component = "div",
  threshold = 0.2,
  effect = 'fade',
  colorTransition = 'gray-to-black',
  fromColor = 'var(--muted-foreground)',
  toColor = 'var(--foreground)',
  duration = 700,
  delay = 0,
  staggerIndex = 0,
  staggerAmount = 100,
}: ScrollFadeTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold, // Trigger when at least X% of the element is visible
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  // Calculate total delay including stagger effect
  const totalDelay = delay + (staggerIndex * staggerAmount);

  // Animation variants based on selected effect
  const variants = {
    hidden: getHiddenVariant(effect),
    visible: getVisibleVariant(effect, duration, totalDelay),
  };

  // For color transition styling
  const getColorStyle = () => {
    if (colorTransition === 'none') return {};
    
    if (colorTransition === 'gray-to-black') {
      return {
        color: isVisible ? 'var(--foreground)' : 'var(--muted-foreground)',
        transition: `color ${duration}ms ease-in-out ${totalDelay}ms`,
      };
    }
    
    if (colorTransition === 'custom') {
      return {
        color: isVisible ? toColor : fromColor,
        transition: `color ${duration}ms ease-in-out ${totalDelay}ms`,
      };
    }
    
    return {};
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      style={getColorStyle()}
      className={className}
    >
      {typeof Component === 'string' ? (
        <Component>{children}</Component>
      ) : (
        <Component className={cn(className)}>{children}</Component>
      )}
    </motion.div>
  );
};

// Helper functions to define animation variants
function getHiddenVariant(effect: AnimationEffect): Variant {
  switch (effect) {
    case 'slide-up':
      return { y: 20, opacity: 0 };
    case 'slide-in':
      return { x: -20, opacity: 0 };
    case 'zoom':
      return { scale: 0.95, opacity: 0 };
    case 'fade':
    default:
      return { opacity: 0 };
  }
}

function getVisibleVariant(effect: AnimationEffect, duration: number, delay: number): Variant {
  const base = { 
    opacity: 1,
    transition: {
      duration: duration / 1000, // Convert to seconds for framer-motion
      delay: delay / 1000,
      ease: 'easeOut',
    }
  };

  switch (effect) {
    case 'slide-up':
      return { ...base, y: 0 };
    case 'slide-in':
      return { ...base, x: 0 };
    case 'zoom':
      return { ...base, scale: 1 };
    case 'fade':
    default:
      return base;
  }
}
