import { motion } from 'motion/react';
import { Code, ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const projects = [
  { id: 1, title: 'Calculadora Mágica', status: 'completed', complexity: 'Fácil', tech: 'Variables' },
  { id: 2, title: 'Mini RPG Pixel', status: 'in-progress', complexity: 'Media', tech: 'Condicionales' },
  { id: 3, title: 'Generador de Apodos', status: 'unlocked', complexity: 'Fácil', tech: 'Funciones' },
];

export default function MicroProjectsView() {
  return (
    <div className="px-6 py-8 space-y-6 pb-32">
      <header className="space-y-1">
        <h2 className="font-display font-black text-2xl neon-text">MICROPROYECTOS</h2>
        <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase">Tus creaciones en el código</p>
      </header>

      <div className="grid gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 border-white/10 group cursor-pointer hover:bg-white/5 relative overflow-hidden"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <div className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider",
                  project.status === 'completed' ? "bg-emerald-500/20 text-emerald-400" : 
                  project.status === 'in-progress' ? "bg-dcode-blue/20 text-dcode-blue" : "bg-white/10 text-white/40"
                )}>
                  {project.status === 'completed' && <CheckCircle size={10} />}
                  {project.status === 'in-progress' && <Clock size={10} />}
                  {project.status.replace('-', ' ')}
                </div>
                <h3 className="font-display font-bold text-lg">{project.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><Code size={12} /> {project.tech}</span>
                  <span>Dificultad: {project.complexity}</span>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-dcode-cyan transition-colors">
                <ExternalLink size={20} />
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-transparent to-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
          </motion.div>
        ))}
      </div>

      <button className="w-full p-4 border-2 border-dashed border-white/10 rounded-2xl text-white/30 font-display font-bold text-xs hover:border-dcode-cyan/30 hover:text-dcode-cyan/50 transition-all flex items-center justify-center gap-2">
        <Code size={16} />
        INICIAR NUEVO PROYECTO
      </button>
    </div>
  );
}
