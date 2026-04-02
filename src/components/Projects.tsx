import { Sparkles, Terminal, BrainCircuit, Code, ExternalLink } from 'lucide-react';
import portfolioData from '../../portfolio-data.json';

interface ProjectsProps {
  onCursorEnter: () => void;
  onCursorLeave: () => void;
}

export default function Projects({ onCursorEnter, onCursorLeave }: ProjectsProps) {
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
    <section id="work" className="py-32 px-8 md:px-24 min-h-screen bg-arcane-dark section-reveal">
      <h2 className="font-runic text-center text-3xl md:text-4xl text-arcane-gold tracking-widest mb-4">Crafted Artifacts</h2>
      <h3 className="font-serif text-center text-[clamp(2.5rem,6vw,6rem)] text-white leading-none mb-24">THE GRIMOIRE</h3>

      <div className="space-y-16 md:space-y-32 max-w-7xl mx-auto">
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12 group grimoire-row">
            <div className="md:col-span-2 text-gray-500 font-runic text-2xl group-hover:text-arcane-glow transition-colors">
              {String(index + 1).padStart(2, '0')}.
            </div>
            <div className="md:col-span-10 lg:col-span-10 flex justify-between items-center w-full">
              <div className="flex-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block"
                  onMouseEnter={onCursorEnter}
                  onMouseLeave={onCursorLeave}
                >
                  <h4 className="font-serif text-3xl md:text-5xl text-white mb-4 group-hover:italic hover:text-arcane-gold transition-all">
                    {project.title}
                  </h4>
                </a>
                <p className="text-gray-400 font-light text-lg mb-6 pr-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-black bg-arcane-gold uppercase tracking-widest px-3 py-1 font-semibold">
                    {project.category}
                  </span>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-arcane-glow">
                      {tag}
                    </span>
                  ))}
                  
                  {/* Demo Link Integration */}
                  {project.demo && (
                     <a
                       href={project.demo}
                       target="_blank"
                       rel="noreferrer"
                       onMouseEnter={onCursorEnter}
                       onMouseLeave={onCursorLeave}
                       className="ml-auto flex items-center gap-2 text-xs uppercase tracking-widest text-arcane-glow border-b border-transparent hover:border-arcane-glow transition-colors"
                     >
                       <ExternalLink className="w-4 h-4" /> Live Portal
                     </a>
                  )}
                </div>
              </div>
              
              <div className="hidden lg:flex justify-end items-center ml-8 shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-full border border-arcane-glow flex items-center justify-center text-arcane-glow group-hover:bg-arcane-glow group-hover:text-black transition-colors"
                  onMouseEnter={onCursorEnter}
                  onMouseLeave={onCursorLeave}
                >
                  {getCategoryIcon(project.category)}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
