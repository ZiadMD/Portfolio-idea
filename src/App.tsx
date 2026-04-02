import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import portfolioData from '../portfolio-data.json';
import Loader from './components/Loader';
import FloatingRunesBackground from './components/FloatingRunesBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heroTl, setHeroTl] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isLoading) return; // Only start Lenis after loading
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Custom Cursor Tracking
    const cursor = cursorRef.current;
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };
    
    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      lenis.destroy();
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return; // Don't setup GSAP scroll triggers until layout is stable

    // 3. Animations (Awwwards Style Staggered Reveals)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out', duration: 1.5 },
        paused: true 
      });

      setHeroTl(tl);

      tl.fromTo('.g-reveal',
        { y: 100, opacity: 0, rotationX: -20 },
        { y: 0, opacity: 1, rotationX: 0, stagger: 0.1, delay: 0.2 }
      )
        .fromTo('.runes-reveal',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
          "-=1"
        );

      // Rotating magic circle effect
      gsap.to('.magic-circle', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'linear'
      });
      gsap.to('.magic-circle-reverse', {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'linear'
      });

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.fromTo(section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Grimoire Row Staggers
      gsap.utils.toArray<HTMLElement>('.grimoire-row').forEach((row) => {
        gsap.fromTo(row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Parallax Image in About
      gsap.to('.parallax-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [portfolioData, isLoading]);

  useEffect(() => {
    if (!isLoading && heroTl) {
      heroTl.play();
    }
  }, [isLoading, heroTl]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div 
      className={`font-sans antialiased bg-arcane-dark min-h-screen selection:bg-arcane-glow selection:text-arcane-dark ${isLoading ? 'h-screen overflow-hidden' : ''}`} 
      ref={containerRef}
    >
      {/* Hide native cursor aggressively across the entire app */}
      <style>{`
        body *, a, button { cursor: none !important; }
      `}</style>

      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <FloatingRunesBackground />

      {/* Conditionally render custom cursor only after loading */}
      {!isLoading && (
        <div
          ref={cursorRef}
          className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
        />
      )}

      {/* Pass mouse handlers to sections for hovered cursor state */}
      <Navigation onCursorEnter={handleMouseEnter} onCursorLeave={handleMouseLeave} />
      
      {/* We don't want to show main content until loader finishes fading to avoid scroll glitches */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <About onCursorEnter={handleMouseEnter} onCursorLeave={handleMouseLeave} />
        <Experience />
        <Skills />
        <Projects onCursorEnter={handleMouseEnter} onCursorLeave={handleMouseLeave} />
        <Contact onCursorEnter={handleMouseEnter} onCursorLeave={handleMouseLeave} />
      </div>
    </div>
  );
}

export default App;
