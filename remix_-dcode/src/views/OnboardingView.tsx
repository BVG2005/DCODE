import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, BookOpen, Clock, Target, Rocket, Shield, Star, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProgress } from '../hooks/useProgress';

type Step = 'welcome' | 'auth' | 'knowledge' | 'commitment' | 'motivation' | 'success';

export default function OnboardingView() {
  const { completeOnboarding, settings, onboardingEntryPoint } = useProgress();
  const [step, setStep] = useState<Step>(onboardingEntryPoint);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '',
    commitment: '',
    motivation: '',
    goal: ''
  });

  const isEn = settings.language === 'en';

  const t = (es: string, en: string) => isEn ? en : es;

  const handleNext = () => {
    if (step === 'welcome') setStep('auth');
    else if (step === 'auth') setStep('knowledge');
    else if (step === 'knowledge') setStep('commitment');
    else if (step === 'commitment') setStep('motivation');
    else if (step === 'motivation') setStep('success');
  };

  const handleFinish = () => {
    completeOnboarding({
      name: formData.name || 'Aprendiz de Dragón',
      email: formData.email || 'anonimo@dcode.com',
      level: formData.level,
      commitment: formData.commitment,
      goal: formData.goal || formData.motivation
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-dcode-bg flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dcode-cyan/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-dcode-purple/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 matrix-bg opacity-5" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 text-center space-y-12 max-w-lg"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-dcode-cyan to-dcode-blue rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] mx-auto"
              >
                <span className="font-display font-black text-6xl text-dcode-bg">D</span>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-dcode-yellow rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                <Star size={24} className="text-dcode-bg fill-current" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-black text-5xl tracking-tighter uppercase neon-text">
                {t('Bienvenido a', 'Welcome to')} <br /> <span className="text-white italic">DCODE</span>
              </h1>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                {t('Únete a la legión de dragones programadores y domina el código a través de la aventura.', 'Join the legion of dragon programmers and master code through adventure.')}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="group px-10 py-6 bg-white text-dcode-bg rounded-2xl font-display font-black text-lg tracking-widest shadow-[0_8px_0_#94a3af] hover:shadow-[0_4px_0_#94a3af] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all flex items-center gap-4 mx-auto"
            >
              {t('COMENZAR AVENTURA', 'START ADVENTURE')}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {step === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative z-10 w-full max-w-md space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="font-display font-black text-3xl uppercase tracking-tight">{t('Acceso al Gremio', 'Guild Access')}</h2>
              <p className="text-white/40 text-sm italic">{t('Como quieras entrar, estaremos esperándote.', 'However you wish to enter, we await you.')}</p>
            </div>

            <div className="space-y-4">
              {/* Google Button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-white hover:bg-white/90 text-slate-800 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl"
              >
                <Globe size={20} className="text-blue-500" />
                {t('Continuar con Google', 'Continue with Google')}
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{t('O usa tu email', 'Or use your email')}</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Email Fields */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('Tu Nombre', 'Your Name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-dcode-cyan outline-none transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder={t('Tu Email', 'Your Email')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-dcode-cyan outline-none transition-all text-sm"
                />
                <button
                  onClick={handleNext}
                  className="w-full py-5 btn-premium font-display font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  {t('CREAR CUENTA / ENTRAR', 'CREATE ACCOUNT / ENTER')}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <p className="text-center text-[10px] text-white/20 px-8">
              Al continuar, aceptas nuestros términos de servicio y políticas de privacidad del gremio DCODE.
            </p>
          </motion.div>
        )}

        {step === 'knowledge' && (
          <motion.div
            key="knowledge"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 w-full max-w-xl space-y-10"
          >
            <div className="text-center space-y-2">
              <p className="text-dcode-cyan font-display font-black text-[10px] tracking-[0.3em] uppercase">{t('PASO 1 DE 3', 'STEP 1 OF 3')}</p>
              <h2 className="font-display font-black text-4xl uppercase tracking-tighter">{t('¿Cuánto poder posees ahora?', 'How much power do you have now?')}</h2>
              <p className="text-white/40 text-sm">{t('Adaptaremos tus misiones según tu experiencia.', 'We will adapt your missions according to your experience.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'beg', label: t('Iniciante', 'Beginner'), icon: '👶', desc: t('No sé nada de código aún.', "I don't know code yet.") },
                { id: 'int', label: t('Explorador', 'Explorer'), icon: '🕵️', desc: t('Entiendo lo básico.', 'I understand the basics.') },
                { id: 'adv', label: t('Maestro', 'Master'), icon: '⚡', desc: t('Hago mis propios proyectos.', 'I make my own projects.') },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFormData({ ...formData, level: opt.id });
                    handleNext();
                  }}
                  className={cn(
                    "p-6 glass-card border border-white/10 hover:border-dcode-cyan transition-all text-center space-y-4 group",
                    formData.level === opt.id && "bg-dcode-cyan/20 border-dcode-cyan"
                  )}
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform">{opt.icon}</div>
                  <div className="space-y-1">
                    <p className="font-display font-black text-sm uppercase">{opt.label}</p>
                    <p className="text-[10px] text-white/50 leading-none">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'commitment' && (
          <motion.div
            key="commitment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative z-10 w-full max-w-xl space-y-10"
          >
            <div className="text-center space-y-2">
              <p className="text-dcode-purple font-display font-black text-[10px] tracking-[0.3em] uppercase">{t('PASO 2 DE 3', 'STEP 2 OF 3')}</p>
              <h2 className="font-display font-black text-4xl uppercase tracking-tighter">{t('¿Cuánto tiempo dedicarás?', 'How much time will you dedicate?')}</h2>
              <p className="text-white/40 text-sm">{t('Estableceremos una meta diaria para tu racha.', 'We will set a daily goal for your streak.')}</p>
            </div>

            <div className="space-y-4">
              {[
                { id: '15m', label: t('Relajado', 'Relaxed'), val: t('15 min/día', '15 min/day'), icon: Clock },
                { id: '30m', label: t('Serio', 'Serious'), val: t('30 min/día', '30 min/day'), icon: Rocket },
                { id: '1h', label: t('Intenso', 'Intense'), val: t('1 hora/día', '1 hour/day'), icon: Target },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFormData({ ...formData, commitment: opt.id });
                    handleNext();
                  }}
                  className={cn(
                    "w-full p-5 glass-card border border-white/10 hover:border-dcode-purple transition-all flex items-center justify-between group",
                    formData.commitment === opt.id && "bg-dcode-purple/20 border-dcode-purple"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-dcode-purple group-hover:text-white transition-colors">
                      <opt.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-display font-bold text-sm uppercase">{opt.label}</p>
                      <p className="text-xs text-white/40">{opt.val}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-white/20 group-hover:text-white" size={20} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'motivation' && (
          <motion.div
            key="motivation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 w-full max-w-xl space-y-10"
          >
            <div className="text-center space-y-2">
              <p className="text-dcode-magenta font-display font-black text-[10px] tracking-[0.3em] uppercase">{t('PASO 3 DE 3', 'STEP 3 OF 3')}</p>
              <h2 className="font-display font-black text-4xl uppercase tracking-tighter">{t('¿Cuál es tu gran misión?', 'What is your great mission?')}</h2>
              <p className="text-white/40 text-sm">{t('Tu porqué es la brújula que te guiará.', 'Your why is the compass that will guide you.')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'career', label: t('Nuevo Empleo', 'New Job'), icon: '💼', color: 'from-blue-500/20' },
                { id: 'fun', label: t('Diversión', 'Fun'), icon: '🎮', color: 'from-emerald-500/20' },
                { id: 'school', label: t('Escuela', 'School'), icon: '🎓', color: 'from-orange-500/20' },
                { id: 'apps', label: t('Crear Apps', 'Build Apps'), icon: '📱', color: 'from-pink-500/20' },
                { id: 'ai', label: t('Aprender IA', 'Learn AI'), icon: '🤖', color: 'from-cyan-500/20' },
                { id: 'other', label: t('Otro Logro', 'Other Achievement'), icon: '✨', color: 'from-purple-500/20' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFormData({ ...formData, motivation: opt.id });
                    handleNext();
                  }}
                  className={cn(
                    "p-6 glass-card border border-white/10 hover:border-dcode-magenta transition-all flex flex-col items-center gap-3 bg-gradient-to-t to-transparent",
                    opt.color,
                    formData.motivation === opt.id && "border-dcode-magenta shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                  )}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span className="font-display font-bold text-xs uppercase text-center">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md text-center space-y-10"
          >
            <div className="relative inline-block">
               <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]"
               >
                 <CheckCircle2 size={48} className="text-white" />
               </motion.div>
               <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-emerald-500 rounded-full"
               />
            </div>

            <div className="space-y-4">
              <h2 className="font-display font-black text-4xl tracking-tighter uppercase">{t('¡TODO LISTO,', 'ALL READY,')} <br /> {formData.name.toUpperCase()}!</h2>
              <p className="text-white/50 text-base leading-relaxed">
                {t('Tu entrenamiento ha sido configurado. El Gremio de los Dragones te da la bienvenida oficial.', 'Your training has been configured. The Dragon Guild officially welcomes you.')}
              </p>
            </div>

            <div className="glass-card p-6 border-white/5 space-y-4 text-left">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <span>{t('Tu Camino', 'Your Path')}</span>
                 <Shield size={12} />
              </div>
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                    {formData.motivation === 'career' ? '💼' : formData.motivation === 'fun' ? '🎮' : '✨'}
                 </div>
                 <div>
                   <p className="font-display font-bold text-sm">{t('Objetivo:', 'Goal:')} {formData.motivation.toUpperCase()}</p>
                   <p className="text-xs text-dcode-cyan">{formData.commitment} {t('de esfuerzo diario', 'of daily effort')}</p>
                 </div>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-5 bg-emerald-500 text-white font-display font-black text-lg tracking-widest rounded-2xl shadow-[0_6px_0_#059669] active:translate-y-1 active:shadow-none transition-all"
            >
              {t('¡ENTRAR AL MUNDO!', 'ENTER THE WORLD!')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps Indicator */}
      {step !== 'welcome' && step !== 'success' && (
        <div className="absolute bottom-10 flex gap-2">
          {['auth', 'knowledge', 'commitment', 'motivation'].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                step === s ? "w-8 bg-dcode-cyan" : "w-1.5 bg-white/10"
              )} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
