import { Sparkles, Scroll } from 'lucide-react';
import portfolioData from '../../portfolio-data.json';

interface AboutProps {
  onCursorEnter: () => void;
  onCursorLeave: () => void;
}

export default function About({ onCursorEnter, onCursorLeave }: AboutProps) {
  return (
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
          <div className="mt-12 flex flex-wrap gap-8 items-center">
            <a
              href="#contact"
              onMouseEnter={onCursorEnter}
              onMouseLeave={onCursorLeave}
              className="inline-flex items-center gap-4 w-fit border-b border-arcane-glow pb-2 text-arcane-glow uppercase tracking-[0.2em] hover:pr-4 transition-all"
            >
              Summon Me <Sparkles className="w-4 h-4" />
            </a>
            {/* Added CV Button */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={onCursorEnter}
              onMouseLeave={onCursorLeave}
              className="inline-flex items-center gap-4 w-fit border border-arcane-gold/40 px-6 py-3 rounded-sm text-arcane-gold uppercase tracking-[0.2em] hover:bg-arcane-gold hover:text-black transition-all"
            >
              View Grimoire (CV) <Scroll className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
