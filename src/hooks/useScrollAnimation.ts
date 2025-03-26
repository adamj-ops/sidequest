import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type ScrollAnimationInputRange = [number, number];
type ScrollAnimationOutputColor = [string, string];

interface ScrollAnimationOptions {
  inputRange?: ScrollAnimationInputRange;
  outputColor?: ScrollAnimationOutputColor;
  outputOpacity?: [number, number];
}

/**
 * Hook to create color and opacity transitions based on scroll position
 * 
 * @param options Configuration options for the animation
 * @returns Motion values for color and opacity transitions
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const {
    inputRange = [0, 0.3],
    outputColor = ["rgb(120, 120, 120)", "rgb(0, 0, 0)"],
    outputOpacity = [0.4, 1]
  } = options;
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  // Create transforms for text color and opacity
  const color = useTransform(scrollYProgress, inputRange, outputColor);
  const opacity = useTransform(scrollYProgress, inputRange, outputOpacity);
  
  return {
    targetRef,
    scrollYProgress,
    color,
    opacity
  };
};
