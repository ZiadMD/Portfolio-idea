import portfolioData from '../../portfolio-data.json';

interface NavigationProps {
  onCursorEnter: () => void;
  onCursorLeave: () => void;
}

export default function Navigation({ onCursorEnter, onCursorLeave }: NavigationProps) {
  return (
    <nav className="fixed w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference top-0">
      <div className="font-runic text-xl md:text-2xl tracking-widest text-arcane-glow glow-text">
        {portfolioData.meta.navName}
      </div>
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] text-white items-center">
        <a href="#about" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave} className="hover:text-arcane-gold transition-colors">Manifesto</a>
        <a href="#experience" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave} className="hover:text-arcane-gold transition-colors">Brotherhoods</a>
        <a href="#work" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave} className="hover:text-arcane-gold transition-colors">Grimoire</a>
        <a href="#" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave} className="text-arcane-glow font-bold border-b border-arcane-glow/30 pb-1 hover:border-arcane-glow transition-all">Scroll of Lore (CV)</a>
        <a href="#contact" onMouseEnter={onCursorEnter} onMouseLeave={onCursorLeave} className="hover:text-arcane-gold transition-colors">Summon</a>
      </div>
    </nav>
  );
}
