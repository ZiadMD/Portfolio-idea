import portfolioData from '../../portfolio-data.json';

interface ContactProps {
  onCursorEnter: () => void;
  onCursorLeave: () => void;
}

export default function Contact({ onCursorEnter, onCursorLeave }: ContactProps) {
  return (
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
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
        className="z-10 text-xl md:text-2xl font-light text-white border border-arcane-gold/40 px-12 py-6 rounded-full hover:bg-arcane-gold hover:text-black transition-all duration-500"
      >
        Send Missive
      </a>

      <div className="mt-32 text-gray-600 text-sm tracking-widest uppercase z-10 flex flex-wrap justify-center gap-8 md:gap-12">
        <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave}>GitHub</a>
        <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave}>LinkedIn</a>
        <span className="text-white/20">|</span>
        <span className="text-gray-500 font-runic">{portfolioData.contact.location}</span>
      </div>
    </footer>
  );
}
