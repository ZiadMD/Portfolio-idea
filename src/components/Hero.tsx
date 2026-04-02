import portfolioData from '../../portfolio-data.json';

export default function Hero() {
  return (
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
  );
}
