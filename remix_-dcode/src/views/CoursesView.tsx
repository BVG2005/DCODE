import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle, Star, ArrowLeft, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const LANGUAGES = [
  { id: 'logic', name: 'Lógica Pro', icon: '🧠', color: 'bg-emerald-500', students: '4.2k', desc: 'Fundamentos de programación' },
  { id: 'python', name: 'Python Ninja', icon: '🐍', color: 'bg-blue-500', students: '2.5k', desc: 'IA y Automatización' },
  { id: 'java', name: 'Java Master', icon: '☕', color: 'bg-red-500', students: '1.8k', desc: 'App Enterprise y Android' },
  { id: 'js', name: 'Web Wizard', icon: '📜', color: 'bg-yellow-500', students: '3.1k', desc: 'JavaScript Moderno' },
];

const levels = [
  { id: 1, title: 'Fundamentos Iniciales', units: [
    { id: 'u1', type: 'lesson', icon: '🧩', title: 'Lógica Visual', status: 'completed' },
    { id: 'u2', type: 'lesson', icon: '➡️', title: 'Secuencias', status: 'current' },
    { id: 'u3', type: 'chest', icon: '🎁', title: 'Cofre de Recompensa', status: 'locked' },
  ]},
  { id: 2, title: 'Estructuras de Poder', units: [
    { id: 'u4', type: 'lesson', icon: '📦', title: 'Variables Mágicas', status: 'locked' },
    { id: 'u5', type: 'boss', icon: '👾', title: 'El Guardián del Tipo', status: 'locked' },
  ]},
];

export default function CoursesView() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  const langData = LANGUAGES.find(l => l.id === selectedLang);

  if (selectedLang && showIntro) {
    return (
      <div className="min-h-screen bg-dcode-bg px-6 py-10 flex flex-col space-y-10 animate-in fade-in zoom-in duration-500 pb-32">
        <button onClick={() => { setSelectedLang(null); setShowIntro(false); }} className="w-fit p-3 bg-white/5 rounded-xl">
           <ArrowLeft size={18} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
           <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl animate-bounce", langData?.color)}>
             {langData?.icon}
           </div>
           <div className="space-y-2">
             <h2 className="font-display font-black text-3xl uppercase tracking-tighter">Bienvenido a {langData?.name}</h2>
             <p className="text-dcode-cyan font-bold tracking-widest text-[10px] uppercase">Fase 0: El Origen</p>
           </div>
        </div>

        <div className="glass-card p-8 border-white/10 space-y-8">
           <div className="space-y-4">
             <h3 className="font-display font-bold text-sm text-dcode-yellow uppercase">¿Qué es esto?</h3>
             <p className="text-xs text-white/70 leading-relaxed font-pixel">
               {langData?.id === 'python' && "Python es como el lenguaje de los magos modernos. Es simple, potente y se usa para crear Inteligencia Artificial y automatizar tareas aburridas. ¡Es el favorito de los científicos!"}
               {langData?.id === 'logic' && "La lógica es el ADN de toda la tecnología. No necesitas sintaxis compleja, solo aprender a pensar en pasos ordenados. Es el primer paso para ser un arquitecto digital."}
               {langData?.id === 'java' && "Java es el motor de los bancos y las grandes aplicaciones de Android. Es 'escribe una vez, corre en todos lados'. Robusto, serio y muy bien pagado."}
               {langData?.id === 'js' && "JavaScript es el alma de la web. Sin él, internet sería estático. Permite que las páginas cobren vida con animaciones, juegos y aplicaciones interactivas."}
             </p>
           </div>

           <div className="space-y-4">
             <h3 className="font-display font-bold text-sm text-dcode-cyan uppercase">¿Qué aprenderás?</h3>
             <ul className="grid grid-cols-1 gap-3">
                {['Conceptos básicos', 'Sintaxis amigable', 'Resolución de problemas', 'Tu primer proyecto'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-white/50">
                    <CheckCircle size={14} className="text-dcode-teal" /> {item}
                  </li>
                ))}
             </ul>
           </div>
        </div>

        <button 
          onClick={() => setShowIntro(false)}
          className="w-full py-5 btn-premium font-display font-black tracking-widest uppercase"
        >
          ¡EMPEZAR APRENDIZAJE_
        </button>
      </div>
    );
  }

  if (!selectedLang) {
    return (
      <div className="px-6 py-10 space-y-8 animate-in fade-in duration-500">
        <div className="space-y-2">
          <h2 className="font-display font-black text-3xl tracking-tight">Elige tu <span className="neon-text italic">Senda</span></h2>
          <p className="text-sm text-white/50">¿Qué poder quieres dominar hoy?</p>
        </div>

        <div className="grid gap-4">
          {LANGUAGES.map((lang) => (
            <motion.div
              key={lang.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedLang(lang.id); setShowIntro(true); }}
              className="group relative overflow-hidden glass-card p-5 border-white/10 hover:border-dcode-cyan/50 cursor-pointer transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-dcode-cyan/10 transition-all rounded-full" />
              <div className="flex items-center gap-5 relative z-10">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl", lang.color)}>
                  {lang.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg">{lang.name}</h3>
                  <p className="text-xs text-white/60 mb-2">{lang.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-4 h-4 rounded-full border border-dcode-bg bg-white/20" />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{lang.students} estudiando</span>
                  </div>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-dcode-cyan transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const currentLang = LANGUAGES.find(l => l.id === selectedLang);

  return (
    <div className="min-h-screen pb-32">
      {/* Course Header */}
      <div className="sticky top-0 z-30 px-6 py-4 glass-card border-b border-white/10 flex items-center justify-between">
        <button 
          onClick={() => setSelectedLang(null)}
          className="flex items-center gap-2 font-display text-xs font-bold hover:text-dcode-cyan transition-colors"
        >
          <ArrowLeft size={16} />
          VOLVER
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentLang?.icon}</span>
          <span className="font-display font-black tracking-tight">{currentLang?.name.toUpperCase()}</span>
        </div>
        <Settings size={18} className="text-white/40" />
      </div>

      <div className="px-6 py-8 flex flex-col items-center gap-10 max-w-lg mx-auto">
        {/* Stats Bar */}
        <div className="w-full bg-white/5 p-4 rounded-2xl flex justify-around items-center border border-white/10 shadow-lg backdrop-blur-md">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">Racha</span>
            <span className="font-display font-bold text-dcode-orange flex items-center gap-1">🔥 7</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">Gemas</span>
            <span className="font-display font-bold text-dcode-cyan flex items-center gap-1">💎 1,2k</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">Estrellas</span>
            <span className="font-display font-bold text-dcode-yellow flex items-center gap-1">⭐ 450</span>
          </div>
        </div>

        {levels.map((level) => (
          <div key={level.id} className="w-full space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="font-display text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-4 py-1 rounded-full border border-white/5 bg-white/5">
                Sección {level.id}: {level.title}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-col items-center gap-10">
              {level.units.map((unit, unitIdx) => (
                <UnitNode key={unit.id} unit={unit} index={unitIdx} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Guide Helper */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="fixed bottom-24 right-8 z-20 flex flex-col items-end gap-3 group"
      >
        <div className="bg-white text-black px-4 py-2 rounded-2xl rounded-br-none font-bold text-xs shadow-2xl relative">
          ¡Vas muy bien con <span className="text-blue-600">{currentLang?.name}</span>!
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rotate-45" />
        </div>
        <div className="w-14 h-14 bg-dcode-cyan rounded-full flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(0,242,255,0.4)] border-2 border-white/20">
          🐉
        </div>
      </motion.div>
    </div>
  );
}

function UnitNode({ unit, index }: { unit: any; index: number; key?: string }) {
  const isLocked = unit.status === 'locked';
  const isCompleted = unit.status === 'completed';
  const isCurrent = unit.status === 'current';
  const offset = index % 2 === 0 ? 0 : (index % 4 === 1 ? 50 : -50);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ x: offset }}
      className="relative group"
    >
      <div className="relative z-10 flex flex-col items-center gap-3">
        <Link to={isLocked ? '#' : `/game/${unit.id}`}>
          <motion.button
            whileHover={!isLocked ? { scale: 1.1 } : {}}
            whileTap={!isLocked ? { scale: 0.9 } : {}}
            disabled={isLocked}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 relative",
              "border-4 border-white/20 shadow-[0_10px_0_rgba(0,0,0,0.3)]",
              isLocked 
                ? "bg-slate-700 opacity-50 cursor-not-allowed shadow-none grayscale" 
                : isCompleted
                  ? "bg-emerald-500 shadow-[0_10px_0_#059669]"
                  : "bg-dcode-cyan shadow-[0_10px_0_#06b6d4] cursor-pointer"
            )}
          >
            {isCurrent && (
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                className="absolute -top-14 flex flex-col items-center"
              >
                <div className="px-3 py-1 bg-white rounded-lg text-dcode-bg font-display font-black text-[10px] shadow-lg whitespace-nowrap">
                   SIGUIENTE RETO
                </div>
                <div className="w-2 h-2 bg-white rotate-45 -mt-1" />
              </motion.div>
            )}

            <span className="text-4xl filter drop-shadow-md">{unit.icon}</span>
            {isLocked && <Lock className="absolute bottom-1 right-1 text-white/50" size={16} />}
            {isCompleted && <CheckCircle className="absolute bottom-1 right-1 text-white fill-emerald-500" size={24} />}
          </motion.button>
        </Link>
        <span className={cn(
          "font-display font-bold text-[10px] uppercase tracking-widest",
          isLocked ? "text-white/20" : "text-white"
        )}>
          {unit.title}
        </span>
      </div>
    </motion.div>
  );
}

