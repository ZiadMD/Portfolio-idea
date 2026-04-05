import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import portfolioData from '../../portfolio-data.json';

// Magnetic Pill Component for Interactive Hover
const MagneticPill = ({ children, onCursorEnter, onCursorLeave }: { children: React.ReactNode, onCursorEnter?: () => void, onCursorLeave?: () => void }) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3); // Magnetic pull factor
      yTo(y * 0.3);
    };

    const handleMouseLeaveInner = () => {
      xTo(0);
      yTo(0);
      if (onCursorLeave) onCursorLeave();
    };
    
    const handleMouseEnterInner = () => {
      if (onCursorEnter) onCursorEnter();
    }

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeaveInner);
    element.addEventListener("mouseenter", handleMouseEnterInner);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeaveInner);
      element.removeEventListener("mouseenter", handleMouseEnterInner);
    };
  }, [onCursorEnter, onCursorLeave]);

  return (
    <div
      ref={magneticRef}
      className="relative text-[11px] sm:text-xs uppercase tracking-[0.15em] px-6 py-3 font-medium text-gray-300 transition-colors z-10 hover:text-white group/skill cursor-none"
    >
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-full group-hover/skill:bg-arcane-glow/10 group-hover/skill:border-arcane-glow/60 transition-colors duration-500" />
      <span className="relative z-10">{children}</span>
    </div>
  );
};

export default function Skills({ onCursorEnter, onCursorLeave }: { onCursorEnter?: () => void, onCursorLeave?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="skills" className="py-32 px-8 md:px-16 lg:px-24 bg-arcane-dark section-reveal relative overflow-hidden" ref={containerRef}>
      
      {/* Background Graphic Effect to avoid flatness */}
      <div className="absolute top-0 right-0 w-full h-[150%] opacity-20 pointer-events-none mix-blend-overlay"
           style={{ background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 50%)' }} />

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-[1400px] mx-auto relative">
        
        {/* Left Side: Pinned Context */}
        <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit 2xl:top-48 z-10">
          <div className="relative">
            {/* Minimalist ornamental line */}
            <div className="w-12 h-px bg-arcane-gold mb-8 opacity-50"></div>
            
            <h2 className="font-sans text-xs md:text-sm text-arcane-gold tracking-[0.3em] uppercase mb-4">Arcana & Knowledge</h2>
            
            <h3 className="font-serif text-[clamp(3.5rem,6vw,7rem)] text-white leading-[0.9] tracking-tighter mix-blend-difference g-reveal">
              THE<br/>
              <span className="italic font-light text-arcane-gold/90">SPELL</span><br/>
              BOOK
            </h3>
            
            <p className="mt-8 text-gray-400 font-sans max-w-sm text-sm leading-relaxed tracking-wide">
              A curated grimoire of technologies, languages, and tools mastered through relentless iterations and profound research.
            </p>
          </div>
        </div>

        {/* Right Side: Flowing Asymmetric Layout */}
        <div className="lg:w-2/3 flex flex-col gap-32 md:gap-48 pt-12 lg:pt-32 pb-32">
          {Object.entries(portfolioData.skills).map(([category, skills], index) => {
            const title = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const indexFormatted = String(index + 1).padStart(2, '0');

            return (
              <div key={index} className="skill-row-trigger relative group w-full">
                
                {/* Large Number Index */}
                <span className="absolute -top-12 md:-top-20 -left-6 md:-left-12 text-[clamp(4rem,8vw,10rem)] font-serif font-bold text-white/[0.02] mix-blend-overlay pointer-events-none uppercase tracking-tighter">
                  {indexFormatted}
                </span>

                <div className="relative z-10 border-t border-white/10 pt-8 mt-8">
                  <h4 className="skill-title font-serif text-[clamp(2.5rem,4vw,5rem)] text-white leading-none tracking-tight mb-12 group-hover:text-arcane-glow transition-colors duration-700">
                    {title}
                  </h4>

                  <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                    {skills.map((skill, i) => (
                      <div className="skill-pill opacity-0 translate-y-8" key={i}>
                        <MagneticPill onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave}>
                          {skill}
                        </MagneticPill>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
