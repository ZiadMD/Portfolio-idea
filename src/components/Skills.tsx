import { Scroll } from 'lucide-react';
import portfolioData from '../../portfolio-data.json';

export default function Skills() {
  return (
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

              {/* Background Rotating Rune inside the Arch - Triangles Replaced with Arcane Squares & Orbits */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <svg className="w-56 h-56 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="45" strokeDasharray="2 6" className="text-arcane-glow" />
                  <circle cx="50" cy="50" r="35" className="text-arcane-gold" />
                  <rect x="25" y="25" width="50" height="50" className="text-arcane-glow" transform="rotate(45 50 50)" />
                  <rect x="30" y="30" width="40" height="40" className="text-arcane-gold" strokeDasharray="4 4" />
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

              {/* Hexagonal Skill Pills - Removed cursor-default */}
              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="relative text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.15em] px-4 py-2 font-medium text-gray-400 transition-all z-10 hover:text-white group/skill"
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
  );
}
