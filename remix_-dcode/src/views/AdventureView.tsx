import { motion, AnimatePresence } from 'motion/react';
import { Sword, Book, HelpCircle, ArrowLeft, Heart, Skull, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState } from 'react';
import CarQuizMinigame from '../components/game/CarQuizMinigame';
import { useProgress } from '../hooks/useProgress';

const ADVENTURE_MAP = [
  { id: 1, type: 'class', title: '¿Qué es la Programación?', icon: '📖', desc: 'Aprende los conceptos básicos con el Dragón.', status: 'completed', x: 20 },
  { id: 2, type: 'monster', title: 'La Sombra del Bug', icon: '👾', desc: 'Derrota al primer error de lógica.', status: 'current', x: 60 },
  { id: 3, type: 'minigame', title: 'Carrera de Lógica', icon: '🏎️', desc: 'Evade obstáculos respondiendo quizes.', status: 'locked', x: 30 },
  { id: 4, type: 'class', title: 'Variables y Cofres', icon: '📦', desc: 'Guarda tesoros en variables.', status: 'locked', x: 70 },
  { id: 5, type: 'boss', title: 'EL COMPILADOR', icon: '👺', desc: 'El reto final del bosque.', status: 'locked', x: 50 },
];

export default function AdventureView() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [playingMinigame, setPlayingMinigame] = useState(false);
  const { xp, coins, level } = useProgress();

  return (
    <div className="relative min-h-screen bg-[#4d8c32] overflow-x-hidden pb-40">
      {/* Minigame Overlay */}
      <AnimatePresence>
        {playingMinigame && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <CarQuizMinigame onClose={() => setPlayingMinigame(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Minecraft-style Pixel Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: `linear-gradient(45deg, #3d7a22 25%, transparent 25%), 
                              linear-gradient(-45deg, #3d7a22 25%, transparent 25%), 
                              linear-gradient(45deg, transparent 75%, #3d7a22 75%), 
                              linear-gradient(-45deg, transparent 75%, #3d7a22 75%)`,
            backgroundSize: '40px 40px',
         }} />
         <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 to-transparent" />
      </div>

      {/* Header UI */}
      <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 glass-card rounded-xl border-white/20 active:scale-90 transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="font-pixel text-[10px] text-dcode-cyan leading-tight shadow-black drop-shadow-lg uppercase tracking-widest">Valle del Código</h2>
            <div className="flex gap-1 mt-1">
               {[1,2,3].map(i => <div key={i} className="w-4 h-1 bg-dcode-cyan shadow-[0_0_5px_rgba(0,242,255,0.8)]" />)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 glass-card border-white/10">
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span className="font-pixel text-[8px]">×3</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 glass-card border-white/10">
            <Zap size={12} className="text-dcode-yellow fill-dcode-yellow" />
            <span className="font-pixel text-[8px]">100%</span>
          </div>
        </div>
      </div>

      {/* The Map Path */}
      <div className="relative pt-20 flex flex-col items-center">
        {/* SVG Path Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
           <path 
            d="M 50 0 Q 80 200 20 400 T 50 800 T 80 1200" 
            fill="none" 
            stroke="white" 
            strokeWidth="4" 
            strokeDasharray="8 8"
          />
        </svg>

        <div className="relative z-10 space-y-32 flex flex-col items-center w-full max-w-sm">
          {ADVENTURE_MAP.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
              style={{ left: `${node.x - 50}%` }}
            >
              <motion.button
                whileHover={node.status !== 'locked' ? { scale: 1.1 } : {}}
                whileTap={node.status !== 'locked' ? { scale: 0.9 } : {}}
                onClick={() => node.status !== 'locked' && setSelectedNode(node)}
                className={cn(
                  "relative w-20 h-20 flex items-center justify-center transition-all duration-300",
                  "pixel-art-button",
                  node.status === 'locked' ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer"
                )}
              >
                {/* Node Platform */}
                <div className={cn(
                  "absolute inset-0 border-b-8 rounded-2xl",
                  node.type === 'boss' ? "bg-red-900 border-red-950" : 
                  node.status === 'completed' ? "bg-emerald-800 border-emerald-950" : "bg-slate-800 border-slate-950"
                )} />
                
                <div className={cn(
                  "relative z-10 text-4xl mb-2",
                  node.status === 'current' && "animate-bounce"
                )}>
                  {node.icon}
                </div>

                {node.status === 'current' && (
                  <div className="absolute -top-10 px-2 py-1 bg-white text-black font-pixel text-[6px] rounded uppercase shadow-lg">
                    ¡AQUÍ!
                  </div>
                )}
              </motion.button>
              
              <div className="mt-4 text-center">
                <p className="font-pixel text-[8px] text-white/80 uppercase tracking-tighter">{node.type === 'class' ? 'Clase' : 'Reto'}</p>
                <p className="font-pixel text-[6px] text-white/40 mt-1">{node.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Node Detail Popup */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm glass-card border-dcode-cyan/30 p-8 space-y-6 text-center overflow-hidden relative"
            >
              {/* Background Glow */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-b opacity-10",
                selectedNode.type === 'monster' ? "from-red-500" : "from-emerald-500"
              )} />

              <div className="text-6xl mb-4">{selectedNode.icon}</div>
              <div className="space-y-2 relative z-10">
                <h3 className="font-pixel text-xs text-dcode-cyan uppercase">{selectedNode.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed italic">"{selectedNode.desc}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10 pt-4">
                 <div className="p-3 glass-card bg-white/5 border-white/10 rounded-xl space-y-1">
                    <p className="text-[8px] font-pixel text-white/40 uppercase">Recompensa</p>
                    <p className="text-[10px] font-pixel text-dcode-yellow">+150 🪙</p>
                 </div>
                 <div className="p-3 glass-card bg-white/5 border-white/10 rounded-xl space-y-1">
                    <p className="text-[8px] font-pixel text-white/40 uppercase">Dificultad</p>
                    <div className="flex justify-center gap-1">
                       {[1,2,3].map(i => <Skull key={i} size={8} className="text-red-500" />)}
                    </div>
                 </div>
              </div>

              <div className="flex gap-3 relative z-10 pt-4">
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-pixel text-[8px] rounded-xl hover:bg-white/10 transition-colors uppercase"
                >
                  Cerrar
                </button>
                {selectedNode.type === 'minigame' ? (
                  <button 
                    onClick={() => {
                      setPlayingMinigame(true);
                      setSelectedNode(null);
                    }}
                    className="flex-1 px-4 py-3 bg-dcode-purple text-white font-pixel text-[8px] rounded-xl shadow-[0_4px_0_#7e22ce] active:translate-y-1 active:shadow-none transition-all uppercase"
                  >
                    ¡Jugar!
                  </button>
                ) : (
                  <Link to={`/game/${selectedNode.id}`} className="flex-1">
                    <button className="w-full px-4 py-3 bg-dcode-cyan text-dcode-bg font-pixel text-[8px] rounded-xl shadow-[0_4px_0_#0891b2] active:translate-y-1 active:shadow-none transition-all uppercase">
                      ¡ENTRAR!
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Sprite */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="fixed bottom-24 left-8 z-40"
      >
        <div className="relative group">
           <div className="text-5xl drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">🐉</div>
           <div className="absolute -top-12 left-12 w-48 p-4 glass-card border-white/10 text-[8px] font-pixel leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              "Cada nodo es un paso hacia la sabiduría. No temas a los monstruos de lógica..."
              <div className="absolute -bottom-2 -left-2 w-4 h-4 glass-card border-white/10 rotate-45 bg-[#0a0e1a]" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}

