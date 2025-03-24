'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Loading screen component with percentage counter
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        
        // Show text halfway through loading
        if (prev >= 50 && !showText) {
          setShowText(true);
        }
        
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [onLoadingComplete, showText]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ 
        y: '-100%',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="relative w-full max-w-sm px-4">
        <motion.div 
          className="mb-8 opacity-0"
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Creating meaningful digital experiences
          </h1>
          <p className="text-gray-400 text-center">
            For forward-thinking organizations
          </p>
        </motion.div>
        
        <div className="w-full h-0.5 bg-gray-800 mb-4">
          <motion.div 
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">OpsFX</p>
          <p className="text-2xl font-mono">{progress}%</p>
        </div>
      </div>
    </motion.div>
  );
};

// Custom cursor component with interactive effects
interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Show cursor when it first moves
    const handleMouseEnter = (): void => setHidden(false);
    
    // Cursor position update
    const handleMouseMove = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    // Check if cursor is over interactive elements
    const handleElementHover = (): void => {
      const hoveredElements = document.querySelectorAll('a, button, [role="button"], .hover-effect');
      let isOverInteractive = false;
      
      hoveredElements.forEach(el => {
        if (el.matches(':hover')) {
          isOverInteractive = true;
        }
      });
      
      setIsHovering(isOverInteractive);
    };
    
    // Mouse down/up handlers
    const handleMouseDown = (): void => setIsClicking(true);
    const handleMouseUp = (): void => setIsClicking(false);
    
    // Add all event listeners
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Apply animations to cursor with useEffect
  useEffect(() => {
    if (!isMounted || !cursorRef.current || !cursorCircleRef.current) return;
    
    // Main cursor dot
    cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    
    // Outer circle with slight delay for trailing effect
    const xTo = position.x - 16; // Center offset
    const yTo = position.y - 16; // Center offset
    
    cursorCircleRef.current.animate({
      transform: `translate(${xTo}px, ${yTo}px) scale(${isHovering ? 1.5 : 1}) ${isClicking ? 'scale(0.9)' : ''}`
    }, { duration: 350, fill: 'forwards', easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
    
  }, [position, isHovering, isClicking, isMounted]);
  
  if (typeof window === 'undefined' || !isMounted) return null;
  
  return (
    <>
      {/* Custom cursor elements */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-50 transition-transform duration-100 ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div 
        ref={cursorCircleRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-50 transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translate(${position.x - 16}px, ${position.y - 16}px)` }}
      />
      
      {/* Hide default cursor when custom cursor is visible */}
      <style jsx global>{`
        body {
          ${!hidden ? 'cursor: none !important;' : ''}
        }
        a, button, [role="button"], .hover-effect {
          ${!hidden ? 'cursor: none !important;' : ''}
        }
      `}</style>
    </>
  );
};

// Interactive grid overlay with hover effects
interface GridOverlayProps {
  density?: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ density = 12 }) => {
  const columns = density;
  const rows = Math.floor(density * 0.6); // Maintain aspect ratio
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run client-side code after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Don't render grid during SSR
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-0">
      <div 
        className="w-full h-full grid" 
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {Array.from({ length: columns * rows }).map((_, index) => {
          // Calculate position of cell center for proximity effect
          const col = index % columns;
          const row = Math.floor(index / columns);
          const cellWidth = 100 / columns;
          const cellHeight = 100 / rows;
          const cellCenterX = (col + 0.5) * cellWidth * window.innerWidth / 100;
          const cellCenterY = (row + 0.5) * cellHeight * window.innerHeight / 100;
          
          // Calculate distance from mouse to cell center
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - cellCenterX, 2) + 
            Math.pow(mousePosition.y - cellCenterY, 2)
          );
          
          // Normalize proximity effect (closer = stronger)
          const maxDistance = 300;
          const proximity = Math.max(0, 1 - distance / maxDistance);
          
          return (
            <motion.div 
              key={index}
              className="border-t border-l border-gray-800/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundColor: 
                  hoveredCell === index 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : proximity > 0.1 
                      ? `rgba(20, 184, 166, ${proximity * 0.05})` // Teal with proximity-based opacity
                      : 'rgba(0, 0, 0, 0)'
              }}
              onMouseEnter={() => setHoveredCell(index)}
              onMouseLeave={() => setHoveredCell(null)}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.005, // Staggered appearance
                ease: [0.25, 0.1, 0.25, 1],
                backgroundColor: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Animated character-by-character text reveal
interface AnimatedCharsProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedChars: React.FC<AnimatedCharsProps> = ({ text, className = "", delay = 0 }) => {
  const chars = Array.from(text);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  } as const;
  
  const letterVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      rotateX: -30,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 200
      }
    }
  } as const;
  
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        {chars.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block relative"
            variants={letterVariants}
            style={{ perspective: "1000px" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// Text reveal on scroll component
interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "-10% 0px"
  });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={inView 
        ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } 
        : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }
      }
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.76, 0, 0.24, 1] 
      }}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={inView ? { y: 0 } : { y: 100 }}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.1,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Navigation component with menu animations
const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium tracking-tight relative hover-effect">
          OpsFX
        </Link>
        
        <button 
          className="text-white relative z-50 hover-effect"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col items-end justify-center w-8 h-8">
            <motion.span 
              className="block w-8 h-px bg-white mb-2"
              animate={{ 
                width: menuOpen ? 24 : 32,
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 4 : 0
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span 
              className="block w-6 h-px bg-white"
              animate={{ 
                width: menuOpen ? 24 : 24, 
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -4 : 0
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </button>
        
        <div className="flex items-center space-x-6">
          <motion.ul 
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { name: "Home", link: "#hero" },
              { name: "Services", link: "#services" },
              { name: "Work", link: "#work" },
              { name: "About", link: "#about" },
              { name: "Contact", link: "#contact" }
            ].map(item => (
              <motion.li 
                key={item.name}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href={item.link} 
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="/auth/login" 
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 transition-colors"
            >
              Customer Portal
            </Link>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-40"
          >
            <div className="container mx-auto px-6 py-32 h-full flex flex-col justify-between">
              <nav className="mb-12">
                <ul className="space-y-12 md:space-y-6">
                  {[
                    { name: "Home", link: "#hero" },
                    { name: "Services", link: "#services" },
                    { name: "Work", link: "#work" },
                    { name: "About", link: "#about" },
                    { name: "Contact", link: "#contact" }
                  ].map(item => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link 
                        href={item.link} 
                        className="text-4xl md:text-6xl font-bold hover-effect"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-gray-400 uppercase text-sm tracking-wider mb-4">Contact</h3>
                  <p className="text-xl font-medium mb-2">hello@opsfx.com</p>
                  <p className="text-xl font-medium">+1 800 123 4567</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-gray-400 uppercase text-sm tracking-wider mb-4">Social</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {["Instagram", "Twitter", "LinkedIn", "Github"].map(social => (
                      <Link key={social} href="#" className="text-lg hover-effect">
                        {social}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Scroll progress indicator
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-px bg-teal-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Main component
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onLoadingComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Grid overlay with interactive effects */}
            {isMounted && <GridOverlay />}
            
            {/* Scroll progress indicator */}
            <ScrollProgress />
            
            {/* Navigation */}
            <Navigation />
            
            {/* Custom cursor */}
            {isMounted && <CustomCursor />}
            
            {/* Content sections */}
            <div className="relative z-10">
              {/* Hero section */}
              <section id="home" className="h-screen flex flex-col justify-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                  <div className="max-w-4xl">
                    <AnimatedChars 
                      text="Creating meaningful" 
                      className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2"
                    />
                    <AnimatedChars 
                      text="digital experiences" 
                      className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12"
                      delay={0.2}
                    />
                    <motion.p 
                      className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      We transform ideas into purposeful digital solutions for forward-thinking organizations.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      <Link 
                        href="#work" 
                        className="px-8 py-4 border border-teal-600 text-teal-400 inline-flex items-center group hover-effect"
                      >
                        <span className="mr-2">Discover our work</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
                
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 w-full border-t border-gray-800/50">
                  <div className="container mx-auto px-6 md:px-12 lg:px-16 py-6 flex justify-between items-center">
                    <div className="text-gray-500 text-xs md:text-sm"> 2025 OpsFX</div>
                    <div className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">Scroll Down</div>
                    <div className="text-gray-500 text-xs md:text-sm">Bringing purpose to digital spaces</div>
                  </div>
                </div>
              </section>
              
              {/* Services section */}
              <section id="services" className="py-32 md:py-40">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                  <RevealText>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h2>
                  </RevealText>
                  
                  <RevealText delay={0.1}>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-16">
                      Our expertise spans across user experience, interface design, and development—all working in harmony to deliver memorable digital journeys.
                    </p>
                  </RevealText>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                      {
                        title: "Strategy",
                        description: "We begin by understanding the why behind your project. Through research and strategic thinking, we identify opportunities to create meaningful connections with your audience.",
                        services: ["User Research & Insights", "Content Strategy", "Experience Planning", "Digital Roadmapping"],
                        delay: 0.1
                      },
                      {
                        title: "Design",
                        description: "Our design approach balances aesthetic refinement with functional clarity. We create interfaces that guide users intuitively while maintaining a distinctive visual presence.",
                        services: ["User Experience Design", "Interface Design", "Design Systems", "Motion & Interaction"],
                        delay: 0.2
                      },
                      {
                        title: "Development",
                        description: "We build with purpose, using technology as a tool to realize thoughtful experiences. Our development process emphasizes performance, accessibility, and scalability.",
                        services: ["Frontend Development", "Content Management", "Interactive Experiences", "Performance Optimization"],
                        delay: 0.3
                      },
                      {
                        title: "Brand Systems",
                        description: "Crafting cohesive visual identities that communicate your values and resonate with your audience across all digital touchpoints.",
                        services: ["Brand Identity", "Visual Language", "Design Guidelines", "Asset Management"],
                        delay: 0.4
                      },
                      {
                        title: "Digital Products",
                        description: "Creating intuitive, engaging products that solve real user problems and provide lasting value to your organization and customers.",
                        services: ["Product Strategy", "UI/UX Design", "Prototyping", "User Testing"],
                        delay: 0.5
                      },
                      {
                        title: "Design Automation",
                        description: "Implementing systems that streamline design processes and ensure consistency across digital touchpoints, improving efficiency and scalability.",
                        services: ["Design Tokens", "Component Libraries", "Automated Workflows", "Design Operations"],
                        delay: 0.6
                      }
                    ].map(service => (
                      <div key={service.title} className="group">
                        <RevealText delay={service.delay} className="h-full">
                          <div className="border border-gray-800 h-full p-8 transition-all duration-500 group-hover:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition-colors duration-300">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>
                            <ul className="space-y-2">
                              {service.services.map(s => (
                                <li key={s} className="text-sm text-gray-500 flex items-center">
                                  <span className="w-1 h-1 bg-teal-500 rounded-full mr-2"></span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </RevealText>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Work showcase section */}
              <section id="work" className="py-32 md:py-40 bg-gradient-to-b from-black to-zinc-950">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                  <RevealText>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Selected Works</h2>
                  </RevealText>
                  
                  <RevealText delay={0.1}>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-16">
                      Every project starts with understanding the human needs behind the technology. Explore how our approach translates to real-world impact.
                    </p>
                  </RevealText>
                  
                  {/* Featured project grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16">
                    {[
                      {
                        title: "Digital Platform",
                        client: "Adaptive Technologies",
                        image: "placeholder-1.jpg",
                        delay: 0.1
                      },
                      {
                        title: "Brand Experience",
                        client: "Evermore Studios",
                        image: "placeholder-2.jpg",
                        delay: 0.2
                      },
                      {
                        title: "Interactive Application",
                        client: "Horizon Finance",
                        image: "placeholder-3.jpg",
                        delay: 0.3
                      },
                      {
                        title: "Digital Product",
                        client: "Spectral Health",
                        image: "placeholder-4.jpg",
                        delay: 0.4
                      }
                    ].map(project => (
                      <RevealText key={project.title} delay={project.delay} className="h-full">
                        <div className="group relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 border border-gray-800 z-20"></div>
                          <div className="absolute bottom-0 left-0 p-8 z-20">
                            <p className="text-gray-400 mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{project.client}</p>
                            <h3 className="text-3xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">{project.title}</h3>
                          </div>
                        </div>
                      </RevealText>
                    ))}
                  </div>
                  
                  <RevealText delay={0.3}>
                    <div className="flex justify-center">
                      <Link 
                        href="#" 
                        className="px-8 py-4 border border-teal-600 text-teal-400 inline-flex items-center group hover-effect"
                      >
                        <span className="mr-2">View all projects</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </RevealText>
                </div>
              </section>
              
              {/* About section with automation visuals */}
              <section id="about" className="py-32 md:py-40 bg-zinc-950 relative overflow-hidden">
                {/* Animated automation graphics */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                      d="M0,50 Q25,30 50,50 T100,50"
                      stroke="rgb(20, 184, 166)"
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        pathOffset: [0, 1]
                      }}
                      transition={{ 
                        duration: 5, 
                        ease: "linear",
                        repeat: Infinity
                      }}
                    />
                    <motion.path
                      d="M0,70 Q30,40 70,60 T100,50"
                      stroke="rgb(20, 184, 166)"
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        pathOffset: [0, 1]
                      }}
                      transition={{ 
                        duration: 7, 
                        ease: "linear",
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </svg>
                </div>
                
                <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                      <RevealText>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Bringing purpose to digital spaces</h2>
                      </RevealText>
                      
                      <RevealText delay={0.2}>
                        <p className="text-xl text-gray-300 mb-6">
                          We blend strategic thinking with creative execution to build digital products that connect with people on a deeper level.
                        </p>
                      </RevealText>
                      
                      <RevealText delay={0.3}>
                        <p className="text-gray-400 mb-6">
                          We believe digital experiences should be both beautiful and meaningful. Our approach combines thoughtful strategy, intentional design, and precise execution to create work that resonates with users and achieves real-world impact.
                        </p>
                      </RevealText>
                      
                      <RevealText delay={0.4}>
                        <p className="text-gray-400">
                          Founded on the principle that technology should serve human needs in thoughtful ways, we've evolved into a studio that prioritizes purpose over decoration. We create digital products and experiences that simplify complexity and bring clarity to the digital landscape.
                        </p>
                      </RevealText>
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-8">
                      <RevealText delay={0.3}>
                        <div className="border border-gray-800 p-8 bg-black/50 backdrop-blur-sm">
                          <h3 className="text-2xl font-bold mb-6 text-teal-400">Our Values</h3>
                          <ul className="space-y-6">
                            {[
                              {
                                value: "Intentionality",
                                description: "Every element serves a purpose"
                              },
                              {
                                value: "Clarity",
                                description: "Complexity made understandable"
                              },
                              {
                                value: "Craft",
                                description: "Excellence in execution"
                              },
                              {
                                value: "Connection",
                                description: "Technology that feels human"
                              }
                            ].map(item => (
                              <li className="flex items-start">
                                <span className="text-teal-500 text-sm mr-3 pt-1">●</span>
                                <div>
                                  <h4 className="font-semibold mb-1">{item.value}</h4>
                                  <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </RevealText>
                      
                      <RevealText delay={0.4}>
                        <p className="text-gray-300 italic border-l-2 border-teal-500 pl-4">
                          "A collective of strategists, designers, and developers who believe in technology's power to enhance human connection."
                        </p>
                      </RevealText>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Contact section */}
              <section id="contact" className="py-32 md:py-40">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                  <div className="max-w-3xl">
                    <RevealText>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        Let's create something meaningful together
                      </h2>
                    </RevealText>
                    
                    <RevealText delay={0.2}>
                      <p className="text-xl text-gray-300 mb-6">
                        We're selective about the projects we take on, focusing on partnerships where we can create meaningful impact.
                      </p>
                    </RevealText>
                    
                    <RevealText delay={0.3}>
                      <p className="text-gray-400 mb-12">
                        Our collaboration process begins with understanding your goals and challenges. From there, we'll discuss how our expertise can help bring your vision to life.
                      </p>
                    </RevealText>
                    
                    <RevealText delay={0.4}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {['Name', 'Email', 'Organization', 'Project Brief', 'Timeline', 'Budget Range'].map(field => (
                          <div key={field} className={`${field === 'Project Brief' ? 'md:col-span-2' : ''}`}>
                            <label className="block text-gray-400 text-sm mb-2">{field}</label>
                            {field === 'Project Brief' ? (
                              <textarea 
                                className="w-full bg-zinc-900 border border-gray-800 px-4 py-3 text-white focus:border-teal-500 focus:outline-none transition-colors duration-300"
                                rows={5}
                              />
                            ) : (
                              <input 
                                type="text" 
                                className="w-full bg-zinc-900 border border-gray-800 px-4 py-3 text-white focus:border-teal-500 focus:outline-none transition-colors duration-300"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </RevealText>
                    
                    <RevealText delay={0.5}>
                      <button 
                        className="w-full md:w-auto px-8 py-4 bg-teal-700 text-white font-medium hover:bg-teal-600 transition-colors duration-300 hover-effect"
                      >
                        Start a conversation
                      </button>
                    </RevealText>
                    
                    <RevealText delay={0.6}>
                      <div className="mt-16 pt-8 border-t border-gray-800/50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <p className="text-gray-400">
                            Based in San Francisco, California
                          </p>
                          <Link 
                            href="mailto:hello@opsfx.com" 
                            className="text-xl font-medium text-teal-400 hover-effect"
                          >
                            hello@opsfx.com
                          </Link>
                        </div>
                      </div>
                    </RevealText>
                  </div>
                </div>
              </section>
              
              {/* Footer */}
              <footer className="py-16 border-t border-gray-800/50">
                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div>
                      <h3 className="text-xl font-bold mb-6">OpsFX</h3>
                      <p className="text-gray-400">
                        Creating meaningful digital experiences for forward-thinking organizations.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-6">Services</h4>
                      <ul className="space-y-3">
                        {["Digital Strategy", "Experience Design", "Interface Design", "Design Systems", "Frontend Development"].map(service => (
                          <li key={service}>
                            <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                              {service}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-6">Connect</h4>
                      <ul className="space-y-3">
                        {["Instagram", "Twitter", "LinkedIn", "Github"].map(social => (
                          <li key={social}>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                              {social}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <p className="text-sm text-gray-500"> 2025 OpsFX. All rights reserved.</p>
                    <p className="text-sm text-gray-500">
                      <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                      <span className="mx-3">•</span>
                      <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
