import { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Zap, RotateCcw, CheckCircle2, Heart, Shield, Skull } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useProgress } from '../hooks/useProgress';

const initialBlocks = [
  { id: '1', text: 'AVANZAR 3 PASOS', color: 'bg-dcode-blue' },
  { id: '2', text: 'GIRAR A LA DERECHA', color: 'bg-dcode-purple' },
  { id: '3', text: 'RECOGER TESORO', color: 'bg-dcode-yellow text-dcode-bg' },
  { id: '4', text: 'REPETIR x2', color: 'bg-dcode-magenta' },
];

const QUIZ_POOL: Record<string, { type: 'blocks' | 'choice' | 'input', question: string, data: any, correct: any }> = {
  'u1': {
    type: 'choice',
    question: "¿Qué símbolo se usa en Python para asignar un valor a una variable?",
    data: ['==', '=', ':', '=>'],
    correct: 1
  },
  'u2': {
    type: 'input',
    question: "Completa el código para imprimir 'Hola': \n_____('Hola')",
    data: null,
    correct: 'print'
  }
};

export default function GameView() {
  const { id = 'default' } = useParams();
  const quiz = QUIZ_POOL[id] || { type: 'blocks', question: 'Ordena la secuencia correcta:', data: initialBlocks };
  
  const [items, setItems] = useState(quiz.type === 'blocks' ? quiz.data : []);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [dragonHealth, setDragonHealth] = useState(100);
  const { addXP, addCoins } = useProgress();
  const navigate = useNavigate();

  const isMonsterLevel = id === 'u5' || id === '2' || id === '4';

  const handleRun = () => {
    let isCorrect = false;
    if (quiz.type === 'blocks') isCorrect = true; // For now
    if (quiz.type === 'choice') isCorrect = selectedChoice === quiz.correct;
    if (quiz.type === 'input') isCorrect = inputValue.trim().toLowerCase() === quiz.correct;

    if (!isCorrect) {
      setDragonHealth(prev => Math.max(0, prev - 25));
      return;
    }

    setIsRunning(true);
    let timer = 0;
    const combat = setInterval(() => {
      timer += 500;
      if (timer === 1000) setMonsterHealth(prev => Math.max(0, prev - 100));
      if (timer === 2000) {
        clearInterval(combat);
        setIsRunning(false);
        setShowSuccess(true);
        addXP(100);
        addCoins(50);
      }
    }, 500);
  };

  return (
    <div className="px-6 py-8 flex flex-col min-h-screen space-y-6 bg-[#0c0c1e]">
      {/* Header */}
      <header className="flex justify-between items-center relative z-20">
        <button onClick={() => navigate(-1)} className="p-2 glass-card rounded-xl border-white/10 active:scale-90">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="font-pixel text-[8px] text-dcode-cyan uppercase tracking-widest">{isMonsterLevel ? 'BATALLA LOGICA' : 'RETO DE CODIGO'}</h2>
          <p className="text-[6px] font-pixel text-white/40 mt-1">ID: {id?.toUpperCase()}</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Combat Arena */}
      <section className="relative h-64 glass-card border-white/10 overflow-hidden flex items-end justify-around px-8 pb-10 bg-gradient-to-t from-black/40 to-transparent">
        {/* Arena Grid Background */}
        <div className="absolute inset-0 matrix-bg opacity-5 -z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-dcode-cyan/5 to-transparent -z-10" />

        {/* Dragon Side */}
        <div className="flex flex-col items-center gap-4 relative">
          <div className="absolute -top-16 w-24 space-y-1">
             <div className="flex justify-between items-center px-1">
                <Heart size={8} className="text-red-500 fill-red-500" />
                <span className="font-pixel text-[6px]">{dragonHealth}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full border border-white/5 p-0.5">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${dragonHealth}%` }} />
             </div>
          </div>
          <motion.div 
            animate={isRunning ? { x: [0, 40, 0] } : { y: [-2, 2, -2] }}
            transition={isRunning ? { duration: 0.5 } : { repeat: Infinity, duration: 3 }}
            className="text-7xl drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            🐉
          </motion.div>
          <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="font-pixel text-[5px] text-emerald-400">TÚ (PYTHON)</span>
          </div>
        </div>

        {/* VS Label */}
        <div className="font-pixel text-dcode-yellow text-xs opacity-50 mb-8 italic">VS</div>

        {/* Monster Side */}
        <div className="flex flex-col items-center gap-4 relative">
          <div className="absolute -top-16 w-24 space-y-1">
             <div className="flex justify-between items-center px-1">
                <Skull size={8} className="text-red-500" />
                <span className="font-pixel text-[6px]">{monsterHealth}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full border border-white/5 p-0.5">
                <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${monsterHealth}%` }} />
             </div>
          </div>
          <motion.div 
            animate={monsterHealth === 0 ? { opacity: 0, scale: 0.5, rotate: 20 } : isRunning ? { x: [0, -5, 0] } : { y: [2, -2, 2] }}
            transition={{ repeat: monsterHealth > 0 ? Infinity : 0, duration: 4 }}
            className="text-7xl drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            {id === 'u5' ? '👹' : '👾'}
          </motion.div>
          <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full">
            <span className="font-pixel text-[5px] text-red-400">{id === 'u5' ? 'EL COMPILADOR' : 'BUG MALVADO'}</span>
          </div>
        </div>

        {/* Combat Effects */}
        {isRunning && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 2, 0], opacity: [1, 1, 0], x: [0, 100] }}
            className="absolute left-1/4 bottom-1/2 text-4xl text-dcode-cyan pointer-events-none"
          >
            ⚡
          </motion.div>
        )}
      </section>

      {/* Editor Section */}
      <section className="flex-1 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div 
               key="success"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="flex-1 glass-card border-emerald-500/30 flex flex-col items-center justify-center gap-6 p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-display font-black text-2xl text-emerald-400 tracking-tight uppercase">¡BUG ELIMINADO!</h3>
                <p className="font-pixel text-[8px] text-white/50 leading-relaxed max-w-[200px] mx-auto">
                  Tus scripts funcionaron a la perfección. El sistema está limpio.
                </p>
              </div>
              <div className="flex gap-4">
                 <button className="px-6 py-3 glass-card border-white/10 font-pixel text-[8px] active:scale-95 transition-all">REPETIR</button>
                 <button 
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-emerald-500 text-white font-pixel text-[8px] rounded-xl shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition-all"
                 >
                   CONTINUAR
                 </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="editor"
              className="flex-1 flex flex-col gap-4"
            >
              <div className="flex justify-between items-end">
                 <p className="font-pixel text-[6px] text-white/40 uppercase">Consola de Misión</p>
                 <p className="font-pixel text-[6px] text-dcode-cyan animate-pulse italic">MODO {quiz.type.toUpperCase()}_</p>
              </div>

              <div className="flex-1 glass-card border-white/5 p-6 flex flex-col gap-6">
                <p className="text-[10px] font-pixel text-white/90 leading-relaxed whitespace-pre-line">{quiz.question}</p>
                
                {quiz.type === 'blocks' && (
                  <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
                    {items.map((item: any) => (
                      <Reorder.Item 
                        key={item.id} 
                        value={item}
                        className={cn(
                          "cursor-grab active:cursor-grabbing p-3 rounded-xl border-l-[4px] border-white/20 select-none",
                          item.color
                        )}
                      >
                        <span className="font-pixel text-[7px] tracking-widest text-dcode-bg font-bold">{item.text}</span>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}

                {quiz.type === 'choice' && (
                  <div className="grid gap-3">
                    {quiz.data.map((opt: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedChoice(i)}
                        className={cn(
                          "w-full p-4 rounded-xl text-left text-[10px] font-bold border transition-all",
                          selectedChoice === i ? "bg-dcode-cyan/20 border-dcode-cyan text-white" : "bg-white/5 border-white/10 text-white/40 hover:border-white/30"
                        )}
                      >
                        <span className="mr-3 opacity-30">{i + 1}.</span> {opt}
                      </button>
                    ))}
                  </div>
                )}

                {quiz.type === 'input' && (
                   <div className="space-y-4">
                     <input 
                       type="text"
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       placeholder="Escribe la respuesta aquí..."
                       className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-pixel text-dcode-cyan focus:border-dcode-cyan outline-none transition-all"
                     />
                     <p className="text-[6px] font-pixel text-white/20 uppercase tracking-widest">Presiona "Ejecutar Compilación" para validar</p>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
           <button 
             onClick={() => { setItems(initialBlocks); setShowSuccess(false); setMonsterHealth(100); }}
             className="p-4 glass-card border-white/10 active:scale-90"
           >
             <RotateCcw size={18} className="text-white/60" />
           </button>
           <button 
             onClick={handleRun}
             disabled={isRunning || showSuccess}
             className="flex-1 p-4 bg-gradient-to-r from-dcode-cyan to-dcode-blue rounded-xl flex items-center justify-center gap-3 shadow-[0_5px_0_#0891b2] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
           >
             <Play size={18} fill="currentColor" className="text-dcode-bg" />
             <span className="font-pixel text-[8px] text-dcode-bg uppercase font-black">Ejecutar Compilación</span>
           </button>
        </div>
      </section>
    </div>
  );
}

