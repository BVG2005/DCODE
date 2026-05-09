import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, X, Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useProgress } from '../../hooks/useProgress';

interface QuizObstacle {
  id: number;
  question: string;
  options: string[];
  correct: number;
  lane: number; // 0, 1, or 2
}

const SAMPLE_QUIZZES: QuizObstacle[] = [
  { id: 1, question: "¿Para qué sirve una variable?", options: ["Guardar datos", "Dibujar figuras", "Apagar PC"], correct: 0, lane: 0 },
  { id: 2, question: "¿Qué imprime print('Hola')?", options: ["Nada", "Hola", "Error"], correct: 1, lane: 1 },
  { id: 3, question: "Un bucle 'while' sirve para:", options: ["Repetir", "Borrar", "Saltar"], correct: 0, lane: 2 },
];

export default function CarQuizMinigame({ onClose }: { onClose: () => void }) {
  const [carLane, setCarLane] = useState(1);
  const [distance, setDistance] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizObstacle | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { addXP, addCoins } = useProgress();

  useEffect(() => {
    if (gameOver || currentQuiz) return;

    const gameLoop = setInterval(() => {
      setDistance(prev => {
        const nextDist = prev + 1;
        if (nextDist % 100 === 0 && nextDist > 0) {
          const quizIdx = Math.floor(Math.random() * SAMPLE_QUIZZES.length);
          setCurrentQuiz(SAMPLE_QUIZZES[quizIdx]);
        }
        return nextDist;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameOver, currentQuiz]);

  const handleAnswer = (idx: number) => {
    if (!currentQuiz) return;

    if (idx === currentQuiz.correct) {
      setScore(prev => prev + 10);
      setCarLane(currentQuiz.lane);
      setCurrentQuiz(null);
    } else {
      setGameOver(true);
      setCurrentQuiz(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md h-[600px] bg-slate-900 rounded-3xl relative overflow-hidden border-4 border-white/10">
        
        {/* Road Background */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 border-x border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-matrix" style={{ animationDuration: '2s' }} />
            </div>
          ))}
        </div>

        {/* HUD */}
        <div className="absolute top-6 inset-x-6 flex justify-between items-center z-20">
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/10">
            <Zap size={12} className="text-dcode-yellow" />
            <span className="font-pixel text-[8px]">{score} XP</span>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full">
            <X size={16} />
          </button>
        </div>

        {/* The Car */}
        <motion.div
          animate={{ x: (carLane - 1) * 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-dcode-cyan/30 blur-xl animate-pulse" />
            <Car size={48} className="text-dcode-cyan rotate-180 drop-shadow-[0_0_15px_#00f2ff]" />
          </div>
        </motion.div>

        {/* Current Quiz Modal */}
        <AnimatePresence>
          {currentQuiz && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm"
            >
              <div className="glass-card p-6 border-dcode-cyan/30 space-y-6 w-full">
                <div className="flex items-center gap-3">
                   <AlertTriangle className="text-dcode-yellow" size={18} />
                   <h3 className="font-display font-bold text-sm tracking-tight uppercase">¡OBSTÁCULO DE LÓGICA!</h3>
                </div>
                <p className="text-xs font-pixel leading-relaxed text-white/80">{currentQuiz.question}</p>
                <div className="grid gap-3">
                  {currentQuiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full p-4 glass-card border-white/10 hover:bg-dcode-cyan/10 hover:border-dcode-cyan transition-all text-left text-[10px] font-bold"
                    >
                       {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_#ef4444]">
              <X size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl uppercase">CHOQUE DETECTADO</h3>
              <p className="text-xs text-white/50 font-pixel">Tu respuesta fue incorrecta y dañó tu compilador.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
               <div className="glass-card p-4">
                  <p className="text-[8px] text-white/40 uppercase">Puntos</p>
                  <p className="font-display font-bold text-lg">{score}</p>
               </div>
               <div className="glass-card p-4">
                  <p className="text-[8px] text-white/40 uppercase">Avance</p>
                  <p className="font-display font-bold text-lg">{Math.floor(distance/10)}m</p>
               </div>
            </div>
            <button 
              onClick={() => {
                addXP(score);
                addCoins(Math.floor(score/2));
                onClose();
              }}
              className="w-full py-4 bg-white text-black font-display font-black text-xs uppercase rounded-xl tracking-widest"
            >
              FINALIZAR MISIÓN
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-white/40 font-pixel text-[8px] leading-relaxed">
        EL CARRO AVANZA AUTOMÁTICAMENTE.<br />
        RESPONDE CORRECTAMENTE PARA EVITAR EL CHOQUE.
      </div>
    </div>
  );
}
