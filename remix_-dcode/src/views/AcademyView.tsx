import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Calendar, Clock, User, CheckCircle2, Star, Trophy, ArrowLeft, Play, MessageSquare, Send, Sparkles, Code, Brain, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProgress } from '../hooks/useProgress';

const LIVE_SESSIONS = [
  {
    id: 'live-1',
    title: 'Variables y Tipos en JavaScript',
    teacher: 'Profe Alex',
    startTime: '18:00',
    duration: '45 min',
    date: 'Hoy',
    status: 'live',
    participants: 124,
    description: 'Aprende los fundamentos de cómo guardar información en tu código.',
    price: 0,
    isPaid: false
  },
  {
    id: 'live-2',
    title: 'React Hooks Mastery',
    teacher: 'Dra. María',
    startTime: '20:00',
    duration: '60 min',
    date: 'Mañana',
    status: 'scheduled',
    participants: 45,
    description: 'Domina useEffect y useState con ejemplos prácticos en vivo.',
    price: 500,
    isPaid: true
  },
  {
    id: 'live-3',
    title: 'Base de Datos NoSQL',
    teacher: 'Ing. Roberto',
    startTime: '10:00',
    duration: '90 min',
    date: 'Lunes, 27 Abr',
    status: 'scheduled',
    participants: 89,
    description: 'Estructura tus datos para el futuro con MongoDB.',
    price: 300,
    isPaid: true
  }
];

const SESSION_TASKS = [
  { id: 't1', text: 'Crea una variable "nombre" y asígnale tu nombre.', xp: 50, coins: 10, completed: false },
  { id: 't2', text: 'Explica qué es un "Template String" en el chat.', xp: 80, coins: 20, completed: false },
  { id: 't3', text: 'Resuelve el desafío de bucles en vivo.', xp: 150, coins: 50, completed: false },
];

export default function AcademyView() {
  const { settings, coins, unlockItem, unlockedLessons } = useProgress();
  const [selectedSession, setSelectedSession] = useState<typeof LIVE_SESSIONS[0] | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(SESSION_TASKS);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'JuanCode', text: '¡Hola! Listos para aprender.', time: '18:01' },
    { user: 'SofiaDev', text: '¿Se puede usar const aquí?', time: '18:02' },
    { user: 'Profe Alex', text: 'Claro Sofia, excelente pregunta.', time: '18:03' }
  ]);

  const isEn = settings.language === 'en';
  const t = (es: string, en: string) => isEn ? en : es;

  const handleJoinSession = (session: typeof LIVE_SESSIONS[0]) => {
    const isEnrolled = unlockedLessons.includes(session.id);
    
    if (isEnrolled) {
      setActiveSessionId(session.id);
      return;
    }

    if (session.isPaid && session.price > 0) {
      if (confirm(t(`Este curso cuesta ${session.price} 🪙. ¿Quieres inscribirte?`, `This course costs ${session.price} 🪙. Do you want to enroll?`))) {
        if (unlockItem('lesson', session.id, session.price)) {
          setActiveSessionId(session.id);
        } else {
          alert(t('No tienes suficientes monedas.', 'Not enough coins.'));
        }
      }
    } else {
      setActiveSessionId(session.id);
    }
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, {
      user: 'Tú',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  if (activeSessionId) {
    const session = LIVE_SESSIONS.find(s => s.id === activeSessionId)!;
    return (
      <div className="fixed inset-0 z-[60] bg-dcode-bg flex flex-col">
        {/* Live Interface */}
        <div className="relative flex-1 flex flex-col lg:flex-row">
          {/* Main Video Area */}
          <div className="flex-[2] bg-black relative flex flex-col">
             <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <button 
                  onClick={() => setActiveSessionId(null)}
                  className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="bg-red-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest animate-pulse">
                  {t('EN VIVO', 'LIVE')}
                </div>
             </div>

             <div className="flex-1 flex items-center justify-center relative">
                {/* Mock Video Feed */}
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60" 
                  className="w-full h-full object-cover opacity-50"
                  alt="Video Feed"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 p-8">
                   <div className="w-20 h-20 bg-dcode-cyan/20 rounded-full flex items-center justify-center animate-bounce">
                     <Video className="text-dcode-cyan" size={40} />
                   </div>
                   <h2 className="text-2xl font-display font-black uppercase tracking-tight">{session.title}</h2>
                   <p className="text-sm text-white/60">{session.teacher} {t('explicando...', 'explaining...')}</p>
                </div>

                {/* Overlaid UI */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                   <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[10px] uppercase font-bold text-white/80">
                      {session.participants} {t('estudiantes', 'students')}
                   </div>
                </div>
             </div>
          </div>

          {/* Side Panel: Chat & Tasks */}
          <div className="flex-1 border-l border-white/10 bg-dcode-bg/80 backdrop-blur-xl flex flex-col h-full lg:h-auto">
             <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-display font-bold text-sm flex items-center gap-2">
                  <Brain size={16} className="text-dcode-magenta" />
                  {t('CENTRO DE APRENDIZAJE', 'LEARNING CENTER')}
                </h3>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Gamified Tasks */}
                <div className="space-y-3">
                   <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('Tareas Actuales', 'Active Tasks')}</h4>
                   <div className="space-y-2">
                      {tasks.map(task => (
                        <motion.div 
                          key={task.id}
                          className={cn(
                            "p-3 rounded-xl border transition-all flex items-center gap-3",
                            task.completed 
                              ? "bg-dcode-teal/10 border-dcode-teal/30" 
                              : "bg-white/5 border-white/10 hover:border-white/20 cursor-pointer"
                          )}
                          onClick={() => !task.completed && completeTask(task.id)}
                        >
                          <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center border",
                            task.completed 
                              ? "bg-dcode-teal border-dcode-teal text-white" 
                              : "border-white/20"
                          )}>
                            {task.completed && <CheckCircle2 size={12} />}
                          </div>
                          <div className="flex-1">
                            <p className={cn("text-xs font-bold", task.completed ? "text-white/40 line-through" : "text-white/80")}>
                              {task.text}
                            </p>
                            <div className="flex gap-2 mt-1">
                               <span className="text-[8px] font-black text-dcode-yellow">+{task.xp} XP</span>
                               <span className="text-[8px] font-black text-dcode-cyan">+{task.coins} 🪙</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                   </div>
                </div>

                {/* Live Chat */}
                <div className="space-y-3">
                   <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('Chat en Directo', 'Live Chat')}</h4>
                   <div className="space-y-3 bg-black/20 rounded-2xl p-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className="space-y-0.5">
                           <div className="flex justify-between items-center">
                              <span className={cn("text-[10px] font-black", msg.user === 'Profe Alex' ? "text-dcode-magenta" : msg.user === 'Tú' ? "text-dcode-cyan" : "text-white/40")}>
                                {msg.user}
                              </span>
                              <span className="text-[8px] text-white/20">{msg.time}</span>
                           </div>
                           <p className="text-xs text-white/80">{msg.text}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Chat Input */}
             <div className="p-4 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={t('Escribe tu duda...', 'Type your question...')}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-dcode-cyan transition-colors"
                />
                <button 
                  onClick={sendMessage}
                  className="p-2 bg-dcode-cyan text-dcode-bg rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 space-y-10 pb-40 max-w-2xl mx-auto">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-dcode-magenta/20 rounded-2xl flex items-center justify-center text-dcode-magenta shadow-[0_0_20px_rgba(255,0,255,0.2)]">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="font-display font-black text-3xl uppercase tracking-tighter">{t('Academia Live', 'Live Academy')}</h1>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('Clases en directo con expertos', 'Live classes with experts')}</p>
          </div>
        </div>
      </section>

      {/* Featured Live Now */}
      <section className="space-y-4">
         <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('En este momento', 'Happening Now')}</h2>
         <div className="relative group overflow-hidden rounded-3xl border border-dcode-cyan/30 bg-dcode-cyan/5 p-8 space-y-6">
            <div className="absolute inset-0 bg-gradient-to-br from-dcode-cyan/20 to-transparent opacity-50" />
            <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest animate-pulse">
              {t('EN VIVO', 'LIVE')}
            </div>

            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Video className="text-dcode-cyan" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl uppercase tracking-tight">{LIVE_SESSIONS[0].title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-dcode-cyan font-bold uppercase tracking-widest">
                       <Clock size={10} />
                       {LIVE_SESSIONS[0].duration}
                    </div>
                  </div>
               </div>
               <p className="text-sm text-white/60 leading-relaxed">
                 {LIVE_SESSIONS[0].description}
               </p>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-white/30" />
                    <span className="text-xs font-bold">{LIVE_SESSIONS[0].teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-white/30" />
                    <span className="text-xs font-bold">{LIVE_SESSIONS[0].participants} {t('estudiantes', 'students')}</span>
                  </div>
               </div>
               <button 
                onClick={() => handleJoinSession(LIVE_SESSIONS[0])}
                className="w-full py-4 bg-dcode-cyan text-dcode-bg font-display font-black text-xs uppercase rounded-xl shadow-[0_4px_0_#0891b2] hover:translate-y-px hover:shadow-[0_2px_0_#0891b2] active:translate-y-1 active:shadow-none transition-all tracking-widest flex items-center justify-center gap-2"
               >
                 {unlockedLessons.includes(LIVE_SESSIONS[0].id) ? (
                   <><CheckCircle2 size={16} /> {t('ENTRAR A CLASE', 'JOIN CLASS')}</>
                 ) : (
                   t('ENTRAR A CLASE GRATIS', 'JOIN CLASS FOR FREE')
                 )}
               </button>
            </div>
         </div>
      </section>

      {/* Schedule */}
      <section className="space-y-6">
        <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{t('Próximas Sesiones', 'Upcoming Sessions')}</h2>
        <div className="space-y-4">
           {LIVE_SESSIONS.slice(1).map((session) => {
             const isEnrolled = unlockedLessons.includes(session.id);
             return (
               <motion.div 
                 key={session.id}
                 whileHover={{ x: 5 }}
                 className={cn(
                   "glass-card p-6 border-white/10 hover:border-white/30 transition-all group relative overflow-hidden",
                   isEnrolled && "border-dcode-teal/30 bg-dcode-teal/5"
                 )}
               >
                  {session.isPaid && !isEnrolled && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-dcode-magenta/20 text-dcode-magenta text-[8px] font-black uppercase rounded-bl-xl border-l border-b border-dcode-magenta/30">
                      PAID
                    </div>
                  )}
                  {isEnrolled && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-dcode-teal/20 text-dcode-teal text-[8px] font-black uppercase rounded-bl-xl border-l border-b border-dcode-teal/30 flex items-center gap-1">
                      <CheckCircle2 size={8} /> {t('INSCRITO', 'ENROLLED')}
                    </div>
                  )}
                  <div className="flex gap-6">
                     <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl min-w-[80px]">
                        <Calendar size={18} className="text-white/20 mb-1" />
                        <span className="text-xs font-black uppercase">{session.date}</span>
                        <span className="text-[10px] text-white/40 font-bold">{session.startTime}</span>
                     </div>
                     <div className="flex-1 space-y-2">
                        <h4 className="font-display font-bold text-base group-hover:text-dcode-cyan transition-colors">{session.title}</h4>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                           <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">👨‍🏫</div>
                              <span className="text-[10px] font-bold text-white/60">{session.teacher}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Clock size={12} className="text-white/20" />
                              <span className="text-[10px] font-bold text-white/40">{session.duration}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Users size={12} className="text-white/20" />
                              <span className="text-[10px] font-bold text-white/40">{session.participants}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-center">
                        <button 
                          onClick={() => handleJoinSession(session)}
                          className={cn(
                            "px-6 py-3 rounded-xl font-display font-black text-[10px] uppercase transition-all flex items-center gap-2 shadow-sm",
                            isEnrolled 
                              ? "bg-dcode-teal text-white" 
                              : (session.isPaid ? "bg-white text-dcode-bg" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white")
                          )}
                        >
                          {isEnrolled ? (
                            <>{t('ENTRAR', 'JOIN')}</>
                          ) : (
                            session.isPaid ? `${session.price} 🪙` : t('GRATIS', 'FREE')
                          )}
                        </button>
                     </div>
                  </div>
               </motion.div>
             );
           })}
        </div>
      </section>

      {/* Benefits */}
      <section className="p-8 glass-card border-white/5 bg-gradient-to-tr from-dcode-purple/20 to-transparent rounded-[2rem] flex flex-col items-center text-center space-y-4">
         <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center rotate-6">
            <Brain className="text-dcode-purple" size={32} />
         </div>
         <h3 className="font-display font-black text-xl uppercase italic tracking-tight">{t('Aprende con los Mejores', 'Learn from the Best')}</h3>
         <p className="text-xs text-white/50 max-w-xs leading-relaxed">
           {t('Nuestras clases en vivo están diseñadas para que nunca te quedes con la duda. Interactúa, programa y gana recompensas en tiempo real.', 'Our live classes are designed so you never have doubts. Interact, code, and earn rewards in real time.')}
         </p>
         <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <div className="p-4 bg-white/5 rounded-2xl space-y-2">
               <MessageSquare className="mx-auto text-dcode-cyan" size={20} />
               <p className="text-[10px] font-bold uppercase">{t('Chat Directo', 'Direct Chat')}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl space-y-2">
               <Trophy className="mx-auto text-dcode-yellow" size={20} />
               <p className="text-[10px] font-bold uppercase">{t('Retos Reales', 'Real Challenges')}</p>
            </div>
         </div>
      </section>
    </div>
  );
}
