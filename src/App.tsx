import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Sparkles, Terminal, BrainCircuit, Code, Sword, Scroll } from 'lucide-react';

// Import JSON data directly
import portfolioData from '../portfolio-data.json';
import Loader from './components/Loader';

const FloatingRunesBackground = () => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚬ', 'ᚱ', 'ᚴ', 'ᚼ', 'ᚾ', 'ᛁ', 'ᛅ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛘ', 'ᛚ', 'ᛦ'];
  const [particles, setParticles] = useState<Array<{ id: number, rune: string, left: string, top: string, size: number, delay: number, duration: number }>>([]);

  useEffect(() => {
    // Generate only on client side to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      rune: runes[Math.floor(Math.random() * runes.length)],
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * -20, // Negative delay so they start immediately
      duration: Math.random() * 10 + 15, // 15-25s moving slowly
    }));
    setParticles(generated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-runic text-arcane-glow/30"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}rem`,
            animation: `float-rune ${p.duration}s ease-in-out infinite alternate ${p.delay}s`
          }}
        >
          {p.rune}
        </div>
      ))}
    </div>
  );
};

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

    // 2. Custom Cursor
    const cursor = cursorRef.current;
    if (cursor) {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', moveCursor);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        lenis.destroy();
      };
    }
  }, [isLoading]);

  useEffect(() => {
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

      // Parallax Image
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
  }, [portfolioData]);

  useEffect(() => {
    if (!isLoading && heroTl) {
      heroTl.play();
    }
  }, [isLoading, heroTl]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Helper icons logic
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI': return <BrainCircuit />;
      case 'Software': return <Code />;
      case 'Robotics': return <Terminal />;
      default: return <Sparkles />;
    }
  };

  return (
    <div className={`font-sans antialiased bg-arcane-dark min-h-screen selection:bg-arcane-glow selection:text-arcane-dark ${isLoading ? 'h-screen overflow-hidden' : ''}`} ref={containerRef}>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <FloatingRunesBackground />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
      />

      {/* Navigation */}
      <nav className="fixed w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference top-0">
        <div className="font-runic text-xl md:text-2xl tracking-widest text-arcane-glow glow-text">
          {portfolioData.meta.navName}
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] text-white">
          <a href="#about" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hover:text-arcane-gold transition-colors">Manifesto</a>
          <a href="#experience" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hover:text-arcane-gold transition-colors">Brotherhoods</a>
          <a href="#work" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hover:text-arcane-gold transition-colors">Grimoire</a>
          <a href="#contact" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hover:text-arcane-gold transition-colors">Summon</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden pt-20">
        {/* Background Magic Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none md:scale-150">
          <svg className="magic-circle w-[600px] h-[600px] text-arcane-glow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3">
            <circle cx="50" cy="50" r="48" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="42" />

            {/* Hexagons */}
            <polygon points="50,8 86.37,29 86.37,71 50,92 13.63,71 13.63,29" />
            <polygon points="92,50 71,86.37 29,86.37 8,50 29,13.63 71,13.63" />

            {/* Runes placed at hexagon vertices */}
            <text x="50" y="10" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚠ</text>
            <text x="86" y="31" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚢ</text>
            <text x="86" y="73" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚦ</text>
            <text x="50" y="94" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚬ</text>
            <text x="14" y="73" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚱ</text>
            <text x="14" y="31" textAnchor="middle" fill="currentColor" fontSize="6" className="font-runic opacity-80" stroke="none">ᚴ</text>
          </svg>
          <svg className="magic-circle-reverse absolute top-0 left-0 w-[600px] h-[600px] text-arcane-gold opacity-70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
            <circle cx="50" cy="50" r="46" strokeDasharray="3 6" />
            <circle cx="50" cy="50" r="30" />
            <polygon points="50,20 75.98,35 75.98,65 50,80 24.02,65 24.02,35" />

            <text x="75.98" y="37" textAnchor="middle" fill="currentColor" fontSize="5" className="font-runic opacity-90" stroke="none">ᛏ</text>
            <text x="24.02" y="67" textAnchor="middle" fill="currentColor" fontSize="5" className="font-runic opacity-90" stroke="none">ᛘ</text>
            <text x="50" y="22" textAnchor="middle" fill="currentColor" fontSize="5" className="font-runic opacity-90" stroke="none">ᛚ</text>
          </svg>
        </div>

        <div className="z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-20 md:mt-0">
          <div className="md:col-span-8 flex flex-col items-start perspective-[1000px]">
            <div className="overflow-hidden mb-6">
              <span className="g-reveal inline-block font-runic text-arcane-gold text-lg md:text-2xl tracking-[0.3em] uppercase gold-glow">
                Order of Applied Sorcery
              </span>
            </div>
            <h1 className="font-serif text-[clamp(4rem,7vw,9rem)] leading-[0.9] font-black uppercase text-white mix-blend-exclusion flex flex-wrap gap-6">
              {portfolioData.meta.title.split(' ').map((word, idx) => (
                <div key={idx} className=" py-2">
                  <span className={`g-reveal inline-block origin-bottom ${['AI', 'Software', '&'].includes(word) ? 'text-transparent bg-clip-text bg-gradient-to-r from-arcane-glow to-arcane-purple glow-text  ' : ''}`}>
                    {word}
                  </span>
                </div>
              ))}
            </h1>
          </div>
          <div className="md:col-span-4 mt-12 md:mt-0 flex flex-col justify-end h-full">
            <div className="g-reveal max-w-sm text-gray-400 font-sans font-light leading-relaxed text-lg border-l border-arcane-gold/30 pl-6">
              {portfolioData.meta.tagline}
            </div>

            <div className="runes-reveal mt-12 font-runic text-arcane-glow/40 text-3xl tracking-[0.8em] break-words">
              ᚠᚢᚦᚬᚱᚴ ᚼᚾᛁᛅᛋ ᛏᛒᛘᛚᛦ
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / About Section */}
      <section id="about" className="py-24 md:py-32 px-8 md:px-24 bg-arcane-stone relative z-10 section-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 relative parallax-container h-[400px] md:h-[600px] overflow-hidden rounded-sm filter grayscale hover:grayscale-[50%] transition-all duration-700">
            <div className="absolute inset-0 bg-arcane-purple/20 mix-blend-color z-10 pointer-events-none"></div>
            {/* Avatar fallback or generic magic image if avatar fails */}
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
              alt="Programming runes"
              className="parallax-img w-full h-[150%] object-cover absolute top-[-25%]"
            />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none italic font-light mb-12 text-white">
              Code is the <span className="text-arcane-gold">Incantation.</span><br />
              Compute is the <span className="text-arcane-glow text-shadow-glow">Mana.</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl font-light text-gray-400 max-w-2xl">
              {portfolioData.about.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <a
              href="#contact"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="mt-12 inline-flex items-center gap-4 w-fit border-b border-arcane-glow pb-2 text-arcane-glow uppercase tracking-[0.2em] hover:pr-4 transition-all"
            >
              Summon Me <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The Brotherhoods (Experience) */}
      <section id="experience" className="py-32 px-8 md:px-24 bg-arcane-dark relative overflow-hidden section-reveal">
        <h2 className="font-runic text-center text-3xl md:text-4xl text-arcane-gold tracking-widest mb-4">Past Guilds</h2>
        <h3 className="font-serif text-center text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-24">THE BROTHERHOODS</h3>

        <div className="max-w-5xl mx-auto border-l border-white/10 ml-4 md:ml-auto">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-16 pb-16 group grimoire-row">
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-arcane-glow shadow-[0_0_10px_2px_rgba(100,200,255,0.5)] group-hover:scale-150 transition-transform"></div>

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                <h4 className="font-serif text-3xl md:text-4xl text-white group-hover:text-arcane-gold transition-colors">{exp.role}</h4>
                <span className="font-runic tracking-widest text-arcane-glow opacity-60 text-sm md:text-base">@ {exp.organization}</span>
              </div>

              <div className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-6">
                {exp.date}
              </div>

              <p className="text-gray-400 font-light text-lg mb-6 max-w-2xl">
                {exp.description}
              </p>

              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-3 text-gray-500 font-light max-w-2xl">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Sword className="w-5 h-5 text-arcane-gold shrink-0 mt-0.5 opacity-60" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* The Spellbook (Skills) */}
      <section id="skills" className="py-24 px-8 md:px-24 bg-arcane-stone section-reveal relative">
        <h2 className="font-runic text-center text-3xl md:text-4xl text-arcane-gold tracking-widest mb-4">Arcana & Knowledge</h2>
        <h3 className="font-serif text-center text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-24">THE SPELLBOOK</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 max-w-7xl mx-auto">
          {Object.entries(portfolioData.skills).map(([category, skills], index) => {
            // Formatting camelCase keys
            const title = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            return (
              <div
                key={index}
                className="relative group overflow-hidden border border-white/10 bg-gradient-to-b from-arcane-dark/80 to-arcane-dark/40 pt-16 pb-12 px-6 md:px-8 transition-all duration-700 hover:border-arcane-glow/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] grimoire-row"
                style={{ borderTopLeftRadius: '120px', borderTopRightRadius: '120px' }}
              >

                {/* Background Rotating Rune inside the Arch */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                  <svg className="w-56 h-56 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="45" strokeDasharray="2 6" className="text-arcane-glow" />
                    <circle cx="50" cy="50" r="35" className="text-arcane-gold" />
                    <polygon points="50,15 80,68 20,68" className="text-arcane-glow" />
                    <polygon points="50,85 20,32 80,32" className="text-arcane-gold" />
                  </svg>
                </div>

                {/* Top Focal Point */}
                <div className="relative z-10 flex flex-col items-center mb-10">
                  <div className="w-16 h-16 border border-arcane-gold/30 rounded-full flex items-center justify-center mb-6 overflow-hidden bg-arcane-dark relative group-hover:border-arcane-glow transition-colors duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <div className="absolute inset-0 bg-arcane-gold/10 animate-pulse mix-blend-screen group-hover:bg-arcane-glow/20 transition-colors duration-500"></div>
                    <Scroll className="w-6 h-6 text-arcane-gold group-hover:text-arcane-glow transition-colors duration-500 relative z-10" />
                  </div>
                  <h4 className="font-serif text-2xl text-white tracking-wide text-center group-hover:text-arcane-glow transition-colors duration-500 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">{title}</h4>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-arcane-gold to-transparent mt-6 group-hover:via-arcane-glow transition-colors duration-500"></div>
                </div>

                {/* Hexagonal Skill Pills */}
                <div className="relative z-10 flex flex-wrap justify-center gap-3">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="relative text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.15em] px-4 py-2 font-medium text-gray-400 transition-all z-10 hover:text-white group/skill cursor-default"
                    >
                      <div className="absolute inset-0 bg-white/[0.02] border border-white/10 [clip-path:polygon(10%_0,90%_0,100%_50%,90%_100%,10%_100%,0_50%)] group-hover/skill:bg-arcane-glow/10 group-hover/skill:border-arcane-glow/60 transition-all duration-300" />
                      <span className="relative z-10">{skill}</span>
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Grimoire (Projects) Section */}
      <section id="work" className="py-32 px-8 md:px-24 min-h-screen bg-arcane-dark section-reveal">
        <h2 className="font-runic text-center text-3xl md:text-4xl text-arcane-gold tracking-widest mb-4">Crafted Artifacts</h2>
        <h3 className="font-serif text-center text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-24">THE GRIMOIRE</h3>

        <div className="space-y-16 md:space-y-32 max-w-7xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12 group grimoire-row">
              <div className="md:col-span-2 text-gray-500 font-runic text-2xl group-hover:text-arcane-glow transition-colors">
                {String(index + 1).padStart(2, '0')}.
              </div>
              <div className="md:col-span-10 lg:col-span-7">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h4 className="font-serif text-3xl md:text-5xl text-white mb-4 group-hover:italic transition-all">
                    {project.title}
                  </h4>
                </a>
                <p className="text-gray-400 font-light text-lg mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs text-black bg-arcane-gold uppercase tracking-widest px-3 py-1 font-semibold">
                    {project.category}
                  </span>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-arcane-glow">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden lg:flex md:col-span-3 justify-end items-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-full border border-arcane-glow flex items-center justify-center text-arcane-glow group-hover:bg-arcane-glow group-hover:text-black transition-colors"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {getCategoryIcon(project.category)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Summon Section */}
      <footer id="contact" className="py-40 px-8 flex flex-col items-center justify-center bg-arcane-void relative overflow-hidden section-reveal">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="font-runic text-[50vw] md:text-[30vw] text-white">ᛟ</div>
        </div>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] z-10 mb-8 text-center text-white">
          Initiate a <span className="font-runic text-arcane-glow italic text-[clamp(3.5rem,8vw,8rem)] leading-none glow-text block md:inline mt-2 md:mt-0">Summoning</span>
        </h2>
        <p className="z-10 text-gray-400 mb-12 text-center max-w-md font-light">
          Whether establishing a new stronghold, architecting autonomous systems, or seeking guidance in the arcane arts of software execution.
        </p>
        <a
          href={`mailto:${portfolioData.contact.email}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="z-10 text-xl md:text-2xl font-light text-white border border-arcane-gold/40 px-12 py-6 rounded-full hover:bg-arcane-gold hover:text-black transition-all duration-500"
        >
          Send Missive
        </a>

        <div className="mt-32 text-gray-600 text-sm tracking-widest uppercase z-10 flex flex-wrap justify-center gap-8 md:gap-12">
          <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <span className="text-white/20">|</span>
          <span className="text-gray-500 font-runic">{portfolioData.contact.location}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
