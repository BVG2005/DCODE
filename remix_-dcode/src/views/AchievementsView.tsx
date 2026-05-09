import { motion } from 'motion/react';
import { Trophy, Star, Shield, Zap, Target, Medal, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AchievementsView() {
  const achievements = [
    { title: 'Primer Script', desc: 'Completaste tu primera lección', icon: Sparkles, color: 'text-dcode-cyan', unlocked: true },
    { title: 'Cazador de Bugs', desc: 'Corregiste 10 errores con éxito', icon: Shield, color: 'text-dcode-purple', unlocked: true },
    { title: 'Guardián del Código', desc: '7 días de racha mantenida', icon: Zap, color: 'text-dcode-yellow', unlocked: true },
    { title: 'Arquitecto', desc: 'Crea tu primer MicroProyecto', icon: Medal, color: 'text-white/20', unlocked: false },
    { title: 'Maestro Dragon', desc: 'Llega al nivel 10', icon: Trophy, color: 'text-white/20', unlocked: false },
  ];

  return (
    <div className="px-6 py-8 space-y-8 pb-32">
      <header className="space-y-1">
        <h2 className="font-display font-black text-2xl neon-text uppercase">LOGROS Y TROFEOS</h2>
        <p className="text-[10px] text-white/50 uppercase tracking-widest">Tu legado en DCODE</p>
      </header>

      <div className="grid gap-4">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "glass-card p-5 border-white/5 flex items-center gap-5 relative overflow-hidden",
              !item.unlocked && "opacity-40 grayscale"
            )}
          >
            <div className={cn("p-4 rounded-2xl bg-white/5 relative z-10", item.color)}>
               <item.icon size={28} />
               {!item.unlocked && <LockIcon />}
            </div>
            
            <div className="flex-1 space-y-1 relative z-10">
              <h3 className="font-display font-bold text-sm tracking-tight">{item.title}</h3>
              <p className="text-[10px] text-white/50 leading-relaxed">{item.desc}</p>
              
              {item.unlocked && (
                <div className="w-full mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-dcode-cyan" />
                </div>
              )}
            </div>

            {item.unlocked && (
               <div className="absolute top-2 right-2">
                 <Star size={10} className="text-dcode-yellow" />
               </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
      <span className="text-white">🔒</span>
    </div>
  );
}
