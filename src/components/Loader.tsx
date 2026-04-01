import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚬ', 'ᚱ', 'ᚴ', 'ᚼ', 'ᚾ', 'ᛁ', 'ᛅ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛘ', 'ᛚ', 'ᛦ'];
const TARGET_NAME = "Ziad Mohamed Sheashaa";

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // We split the target name into array for individual character rendering
  const letters = TARGET_NAME.split('');
  
  // State to hold the current character (rune or final letter) at each index
  const [displayChars, setDisplayChars] = useState<string[]>(
    letters.map(char => char === ' ' ? ' ' : RUNES[Math.floor(Math.random() * RUNES.length)])
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete(); // Trigger application entry
        }
      });

      // 1. Initial Circle fade-in & spin
      gsap.to('.loader-circle', {
        rotation: 360,
        duration: 8,
        ease: 'linear',
        repeat: -1
      });

      tl.fromTo('.loader-circle',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.2, scale: 1, duration: 1.5, ease: 'power3.out' }
      );

      // 2. We start the scramble decode logic
      // We animate a dummy object to handle the text scrambling loop
      let progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          // based on progress value (0 to 100), we "resolve" characters one by one
          const currentProgress = progressObj.value / 100;
          const resolveCount = Math.floor(currentProgress * letters.length);
          
          setDisplayChars(prev => prev.map((char, index) => {
            if (letters[index] === ' ') return ' ';
            if (index < resolveCount) return letters[index]; // Resolved to real letter
            // If not resolved, keep scrambling with runes
            // We scramble every few frames
            if (Math.random() > 0.7) {
              return RUNES[Math.floor(Math.random() * RUNES.length)];
            }
            return char;
          }));
        }
      }, "-=0.5");

      // 3. Glowing effect once decoded
      tl.to('.name-char', {
        textShadow: "0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)",
        color: "#fff",
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out"
      });

      // 4. Scale up & fade out the text and circle
      tl.to(['.loader-text-container', '.loader-circle-wrapper'], {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in"
      }, "+=0.5");

      // 5. The Reveal: Slide the whole dark curtain up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, [letters.length, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-arcane-dark overflow-hidden pointer-events-none"
    >
      {/* Background Magic Circle */}
      <div className="loader-circle-wrapper absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="loader-circle w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-arcane-glow opacity-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
          <circle cx="50" cy="50" r="48" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="42" />
          <polygon points="50,8 86.37,29 86.37,71 50,92 13.63,71 13.63,29" />
          <polygon points="92,50 71,86.37 29,86.37 8,50 29,13.63 71,13.63" />
          
          <text x="50" y="10" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚠ</text>
          <text x="86" y="31" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚢ</text>
          <text x="86" y="73" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚦ</text>
          <text x="50" y="94" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚬ</text>
          <text x="14" y="73" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚱ</text>
          <text x="14" y="31" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚴ</text>
        </svg>
      </div>

      {/* Scrambling Text */}
      <div 
        ref={textRef} 
        className="loader-text-container relative z-10 flex flex-wrap justify-center text-center px-4 max-w-4xl"
      >
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black uppercase tracking-[0.2em] leading-tight text-gray-500 mix-blend-screen drop-shadow-lg">
          {displayChars.map((char, index) => {
            const isResolved = char === letters[index];
            return (
              <span
                key={index}
                className={`name-char inline-block ${!isResolved && char !== ' ' ? 'font-runic text-arcane-gold opacity-70' : ''}`}
                style={{ width: char === ' ' ? '0.5em' : 'auto', minWidth: char !== ' ' ? '0.8em' : 'auto' }}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>
    </div>
  );
}
