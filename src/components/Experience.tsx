import { Sword } from 'lucide-react';
import portfolioData from '../../portfolio-data.json';

export default function Experience() {
  return (
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
  );
}
