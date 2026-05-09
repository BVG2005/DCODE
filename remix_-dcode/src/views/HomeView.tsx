import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Shield, Zap, Target, Trophy, Users, BookOpen, Flame, Star, ChevronRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useProgress } from '../hooks/useProgress';

const GLOBAL_LEADERBOARD = [
  { name: 'AlexCoder', xp: 25420, avatar: '🦊', rank: 1, prize: 'Premium + Dragón 🐉' },
  { name: 'SofiaDev', xp: 22200, avatar: '🐱', rank: 2, prize: 'Legendario + 5k 🪙' },
  { name: 'JuanLogic', xp: 19100, avatar: '🤖', rank: 3, prize: 'Curso IA + 2k 🪙' },
  { name: 'DCODE_Master', xp: 17500, avatar: '🐲', rank: 4, prize: '1,000 Monedas 🪙' },
];

const FRIENDS_LEADERBOARD = [
  { name: 'Tu Mejor Amigo', xp: 14500, avatar: '🦁', rank: 1, prize: 'Desafío Semanal' },
  { name: 'Compañero Pro', xp: 13200, avatar: '🐼', rank: 2, prize: 'Ayuda Código' },
  { name: 'Explorador 1', xp: 11000, avatar: '🐒', rank: 3, prize: 'Regalo Diario' },
];

const POPULAR_LANGUAGES = [
  { name: 'Python', students: '2.5k', color: 'bg-blue-500', icon: '🐍' },
  { name: 'Java', students: '1.8k', color: 'bg-red-500', icon: '☕' },
  { name: 'JavaScript', students: '3.1k', color: 'bg-yellow-500', icon: '📜' },
  { name: 'Lógica', students: '4.2k', color: 'bg-emerald-500', icon: '🧠' },
];

export default function HomeView() {
  const { xp, streak, user, settings } = useProgress();
  const [activeRank, setActiveRank] = useState<'global' | 'friends'>('global');

  const isEn = settings.language === 'en';
  const t = (es: string, en: string) => isEn ? en : es;

  const currentRankData = activeRank === 'global' ? GLOBAL_LEADERBOARD : FRIENDS_LEADERBOARD;

  return (
    <div className="px-6 py-8 space-y-10 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-8 glass-card border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-gradient-to-br from-dcode-blue/20 to-dcode-purple/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
            >
              <Flame size={14} className="text-dcode-orange animate-pulse" />
              <span className="text-[10px] font-display font-bold tracking-tight text-white uppercase">¡Racha de {streak} días!</span>
            </motion.div>
            
            <h1 className="font-display font-black text-4xl leading-tight">
              {t('Domina el', 'Master')}{' '}<span className="neon-text italic">{t('Código', 'Code')}</span> <br />
              <span className="text-2xl text-white/80">{t('Jugando DCODE', 'Playing DCODE')}</span>
            </h1>
            
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {t('Explora mundos mágicos, derrota monstruos de lógica y despierta tu poder interior.', 'Explore magical worlds, defeat logic monsters, and awaken your inner power.')}
            </p>

            <Link to="/courses" className="block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 btn-premium flex items-center justify-center gap-3 interactive-button"
              >
                <Play size={20} fill="currentColor" />
                {t('COMENZAR AHORA', 'START NOW')}
              </motion.button>
            </Link>
          </div>

          <div className="relative w-full max-w-[240px]">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="text-[140px] drop-shadow-[0_0_40px_rgba(6,182,212,0.6)] text-center cursor-pointer active:scale-95 transition-transform">
                🐉
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-dcode-cyan/30 blur-[60px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('Energía', 'Energy'), val: xp, icon: Zap, color: 'text-dcode-yellow' },
          { label: t('Ranking', 'Rank'), val: '#12', icon: Trophy, color: 'text-dcode-cyan' },
          { label: t('Amigos', 'Friends'), val: '24', icon: Users, color: 'text-dcode-purple' },
          { label: t('Cursos', 'Courses'), val: '3', icon: BookOpen, color: 'text-dcode-teal' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex flex-col gap-2 border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className={cn("p-2 rounded-xl bg-white/5 w-fit", stat.color)}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-display uppercase tracking-widest">{stat.label}</p>
              <p className="font-display font-bold text-sm">{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Academy Highlight */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl tracking-wide flex items-center gap-2">
          <Globe className="text-dcode-magenta" size={18} />
          {t('Academia en Directo', 'Live Academy')}
        </h2>
        <Link to="/academy" className="block relative group overflow-hidden rounded-3xl border border-dcode-magenta/20 bg-gradient-to-r from-dcode-magenta/10 to-transparent p-6 shadow-lg shadow-dcode-magenta/5 transition-all hover:scale-[1.01]">
          <div className="absolute top-4 right-4 bg-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest animate-pulse z-20">
            {t('EN VIVO', 'LIVE')}
          </div>
          <div className="flex flex-col md:flex-row gap-6 relative z-10">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shrink-0">
                👨‍🏫
             </div>
             <div className="flex-1 space-y-2">
                <h3 className="font-display font-black text-lg uppercase tracking-tight group-hover:text-dcode-magenta transition-colors">
                  {t('Variables y Tipos en JavaScript', 'Variables and Types in JavaScript')}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed max-w-md">
                   {t('Únete ahora al Profe Alex y resuelve tus dudas en tiempo real mientras programas.', 'Join Prof. Alex now and solve your doubts in real time while you code.')}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                   <span className="flex items-center gap-1"><Users size={12} /> 124 {t('Estudiantes', 'Students')}</span>
                   <span className="flex items-center gap-1 text-dcode-cyan"><Zap size={12} /> {t('Gana 150 XP', 'Earn 150 XP')}</span>
                </div>
             </div>
             <div className="flex items-center">
                <div className="px-6 py-3 bg-dcode-magenta text-white font-display font-black text-[10px] rounded-xl uppercase tracking-widest group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all">
                  {t('ENTRAR', 'JOIN')}
                </div>
             </div>
          </div>
        </Link>
      </section>

      {/* Languages and Leaderboard Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Most Studied Languages */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="font-display font-bold text-xl tracking-wide flex items-center gap-2">
              <Star className="text-dcode-yellow" size={18} />
              {t('Más Estudiados', 'Most Studied')}
            </h2>
            <Link to="/courses" className="text-[10px] text-dcode-cyan hover:underline uppercase font-bold tracking-widest">{t('Ver todos', 'View all')}</Link>
          </div>
          
          <div className="space-y-3">
            {POPULAR_LANGUAGES.map((lang, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="group flex items-center gap-4 p-4 glass-card border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg", lang.color)}>
                  {lang.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-sm">{lang.name}</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-tighter">{lang.students} {t('estudiantes activos', 'active students')}</p>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-dcode-cyan transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Leaderboard */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-xl tracking-wide flex items-center gap-2">
              <Trophy className="text-dcode-cyan" size={18} />
              {t('Ranking Global', 'Global Ranking')}
            </h2>
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button 
                onClick={() => setActiveRank('global')}
                className={cn(
                  "px-3 py-1 text-[8px] font-bold uppercase rounded-md transition-all",
                  activeRank === 'global' ? "bg-white/10 text-white shadow-sm" : "text-white/30 hover:text-white/50"
                )}
              >
                {t('Global', 'Global')}
              </button>
              <button 
                onClick={() => setActiveRank('friends')}
                className={cn(
                  "px-3 py-1 text-[8px] font-bold uppercase rounded-md transition-all",
                  activeRank === 'friends' ? "bg-white/10 text-white shadow-sm" : "text-white/30 hover:text-white/50"
                )}
              >
                {t('Amigos', 'Friends')}
              </button>
            </div>
          </div>
          
          <div className="glass-card border-white/10 overflow-hidden divide-y divide-white/5">
            {currentRankData.map((rankUser, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group",
                  rankUser.name === user?.name ? "bg-dcode-cyan/10" : ""
                )}
              >
                <div className={cn(
                  "w-6 font-display font-black text-center",
                  rankUser.rank === 1 ? "text-dcode-yellow" : 
                  rankUser.rank === 2 ? "text-slate-300" : 
                  rankUser.rank === 3 ? "text-orange-400" : 
                  "text-white/20 group-hover:text-dcode-cyan"
                )}>
                  #{rankUser.rank}
                </div>
                <div className="text-2xl filter drop-shadow-sm">{rankUser.avatar}</div>
                <div className="flex-1">
                  <p className={cn("font-bold text-sm tracking-tight", rankUser.name === user?.name ? "text-dcode-cyan" : "text-white")}>
                    {rankUser.name} {rankUser.name === user?.name && "(Tú)"}
                  </p>
                  <p className="text-[9px] text-dcode-cyan/70 font-bold leading-none mt-1">
                    {t('Premio:', 'Prize:')} <span className="italic">{rankUser.prize}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xs font-bold text-dcode-yellow">{rankUser.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
            
            {/* Show user if not in top 4 */}
            {!currentRankData.some(r => r.name === user?.name) && activeRank === 'global' && (
              <div className="p-4 flex items-center gap-4 bg-white/5 border-t border-white/10">
                <div className="w-6 font-display font-black text-white/20 text-center">#12</div>
                <div className="text-2xl">🐉</div>
                <div className="flex-1">
                  <p className="font-bold text-sm tracking-tight text-dcode-cyan">{user?.name || 'Alex Dcoder'} (Tú)</p>
                  <p className="text-[9px] text-white/30 font-bold italic">{t('¡Casi en el Top!', 'Almost at the Top!')}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xs font-bold text-white/50">{xp.toLocaleString()} XP</p>
                </div>
              </div>
            )}
          </div>
          <Link to="/profile" className="block w-full py-2 bg-white/5 border border-white/10 rounded-xl text-center text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors tracking-widest">
            {t('Ver Ranking Completo', 'View Full Ranking')}
          </Link>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl tracking-wide flex items-center gap-2">
          <Target className="text-dcode-magenta" size={18} />
          {t('Misiones Diarias', 'Daily Missions')}
        </h2>
        
        <div className="grid gap-4">
          {[
            { title: t('Lógica Visual', 'Visual Logic'), desc: t('Resuelve 3 puzzles de bloques', 'Solve 3 block puzzles'), progress: 66, energy: 50 },
            { title: t('Guardián del Python', 'Python Guardian'), desc: t('Escribe tu primer decorador', 'Write your first decorator'), progress: 0, energy: 120 },
            { title: t('Cofre de la Mañana', 'Morning Chest'), desc: t('Entra 3 días seguidos', 'Login 3 days in a row'), progress: 100, energy: 30 },
          ].map((mission, i) => (
            <div key={i} className="p-5 glass-card border-white/5 space-y-4 relative overflow-hidden group">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm">{mission.title}</h3>
                  <p className="text-xs text-white/60">{mission.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-dcode-cyan uppercase tracking-widest">+{mission.energy} XP</div>
                  {mission.progress === 100 && (
                     <div className="text-[10px] font-bold text-dcode-teal uppercase">{t('¡Completado!', 'Completed!')}</div>
                  )}
                </div>
              </div>
              
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${mission.progress}%` }}
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    mission.progress === 100 ? "bg-dcode-teal" : "bg-dcode-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                  )}
                />
              </div>

              {mission.progress < 100 && (
                <button className="text-[10px] font-pixel text-dcode-cyan/50 hover:text-dcode-cyan transition-colors uppercase mt-2">
                  {t('IR A LA MISIÓN _', 'GO TO MISSION _')}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
