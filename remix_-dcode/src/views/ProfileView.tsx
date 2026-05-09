import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Shield, Trophy, Zap, Clock, Code, ChevronRight, User, Users, Globe, ShoppingBag, Check, Camera, X, ArrowLeft, Lock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { cn } from '../lib/utils';
import { useProgress } from '../hooks/useProgress';
import { useEffect } from 'react';

const AVATARS = [
  { id: 'boy-1', icon: '👦', name: 'Nico (Python)', gender: 'male', type: 'human' },
  { id: 'girl-1', icon: '👧', name: 'Lia (Java)', gender: 'female', type: 'human' },
  { id: 'boy-2', icon: '👨‍💻', name: 'Dev Dan', gender: 'male', type: 'human' },
  { id: 'girl-2', icon: '👩‍💻', name: 'Dev Sara', gender: 'female', type: 'human' },
  { id: 'cat-1', icon: '🐱', name: 'Gato Script', type: 'animal' },
  { id: 'dog-1', icon: '🐶', name: 'Pixel Dog', type: 'animal' },
  { id: 'panda-1', icon: '🐼', name: 'Bambú C++', type: 'animal' },
  { id: 'dragon-1', icon: '🐲', name: 'DCODE Jr.', type: 'dragon' },
];

const PROGRESS_DATA = [
  { day: 'Lun', xp: 1200 },
  { day: 'Mar', xp: 2100 },
  { day: 'Mié', xp: 1800 },
  { day: 'Jue', xp: 3400 },
  { day: 'Vie', xp: 2800 },
  { day: 'Sáb', xp: 4200 },
  { day: 'Dom', xp: 3900 },
];

const KNOWLEDGE_DATA = [
  { subject: 'Lógica', score: 85 },
  { subject: 'Python', score: 65 },
  { subject: 'Java', score: 40 },
  { subject: 'JS', score: 75 },
];

const GLOBAL_RANKING = [
  { name: 'AlexCoder', xp: 25420, avatar: '🦊', rank: 1, prize: 'Premium + Dragón 🐉' },
  { name: 'SofiaDev', xp: 22200, avatar: '🐱', rank: 2, prize: 'Legendario + 5k 🪙' },
  { name: 'JuanLogic', xp: 19100, avatar: '🤖', rank: 3, prize: 'Curso IA + 2k 🪙' },
  { name: 'DCODE_Master', xp: 17500, avatar: '🐲', rank: 4, prize: '1,000 Monedas 🪙' },
  { name: 'CodeQueen', xp: 16200, avatar: '👸', rank: 5, prize: '800 Monedas 🪙' },
  { name: 'PixelWizard', xp: 15100, avatar: '🧙', rank: 6, prize: '500 Monedas 🪙' },
  { name: 'BinaryGhost', xp: 14800, avatar: '👻', rank: 7, prize: '300 Monedas 🪙' },
  { name: 'ScriptNinja', xp: 13900, avatar: '🥷', rank: 8, prize: '200 Monedas 🪙' },
  { name: 'DataDragon', xp: 13200, avatar: '🦎', rank: 9, prize: '100 Monedas 🪙' },
  { name: 'BugHunter', xp: 12500, avatar: '🕷️', rank: 10, prize: 'Badge Pionero 🛡️' },
];

const FRIENDS_RANKING = [
  { name: 'Tu Mejor Amigo', xp: 14500, avatar: '🦁', rank: 1, prize: 'Desafío Semanal' },
  { name: 'Compañero Pro', xp: 13200, avatar: '🐼', rank: 2, prize: 'Ayuda Código' },
  { name: 'Explorador 1', xp: 11000, avatar: '🐒', rank: 3, prize: 'Regalo Diario' },
];

const SHOP_ITEMS = [
  { id: 'dragon-galactico', name: 'Dragón Galáctico', type: 'avatar', icon: '🌌🐲', cost: 10000, rarity: 'legendary', desc: 'El guardián de las estrellas.' },
  { id: 'neon-pink', name: 'Tema Rosa Neón', type: 'theme', icon: '🌸', cost: 5000, rarity: 'epic', desc: 'Una estética vibrante y retro.' },
  { id: 'hacker-green', name: 'Tema Matriz', type: 'theme', icon: '📟', cost: 3000, rarity: 'rare', desc: 'Siéntete como un verdadero hacker.' },
  { id: 'python-master', name: 'Curso: Master Python', type: 'lesson', icon: '🐍', cost: 8000, rarity: 'epic', desc: 'Domina los secretos del lenguaje.' },
];

const ALL_AVATARS = [
  ...AVATARS.map(a => ({ ...a, cost: 0, rarity: 'common' })),
  ...SHOP_ITEMS.filter(item => item.type === 'avatar').map(item => ({
    id: item.id,
    icon: item.icon,
    name: item.name,
    cost: item.cost,
    rarity: item.rarity,
    type: 'special'
  }))
];

export default function ProfileView() {
    const { xp, level, coins, avatar, unlockedAvatars, unlockedThemes, unlockedLessons, setAvatar, achievements, settings, updateSettings, user, resetOnboarding, setHideNav, unlockItem } = useProgress();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'profile' | 'shop'>('profile');
  const [rankTab, setRankTab] = useState<'global' | 'friends'>('global');

  useEffect(() => {
    setHideNav(isSettingsOpen);
    return () => setHideNav(false);
  }, [isSettingsOpen, setHideNav]);

  const isEn = settings.language === 'en';
  const t = (es: string, en: string) => isEn ? en : es;

  const currentAvatar = AVATARS.find(a => a.id === avatar) || AVATARS[0];
  const nextLevelXP = 15000;
  const progressPercent = (xp / nextLevelXP) * 100;

  const handlePurchase = (item: typeof SHOP_ITEMS[0]) => {
    if (unlockItem(item.type as any, item.id, item.cost)) {
      alert(`¡Has desbloqueado ${item.name}!`);
    } else {
      alert('No tienes suficientes monedas 🪙');
    }
  };

  return (
    <div className={cn(
      "px-6 py-10 space-y-10 max-w-2xl mx-auto pb-40",
      settings.fontSize === 'large' ? "text-lg" : settings.fontSize === 'extra' ? "text-xl" : "text-base"
    )}>
      {/* Top Nav Switcher */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
        <button 
          onClick={() => setActiveView('profile')}
          className={cn(
            "flex-1 py-3 rounded-xl font-display font-black text-xs uppercase transition-all",
            activeView === 'profile' ? "bg-white text-dcode-bg shadow-xl" : "text-white/40 hover:text-white/60"
          )}
        >
          {t('Mi Perfil', 'My Profile')}
        </button>
        <button 
          onClick={() => setActiveView('shop')}
          className={cn(
            "flex-1 py-3 rounded-xl font-display font-black text-xs uppercase transition-all",
            activeView === 'shop' ? "bg-dcode-magenta text-white shadow-[0_0_20px_rgba(255,0,255,0.3)]" : "text-white/40 hover:text-white/60"
          )}
        >
          <ShoppingBag className="inline-block mr-2" size={14} />
          {t('Tienda', 'Shop')}
        </button>
      </div>

      {activeView === 'profile' ? (
        <>
          {/* Profile Header */}
          <section className="relative glass-card p-8 border-white/20 overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Settings size={18} className="text-white/60" />
          </button>
        </div>

        {/* Animated Background Orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-dcode-cyan/20 blur-[60px] rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-dcode-purple/20 blur-[60px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="relative w-32 h-32 rounded-[2rem] border-[4px] border-white/40 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-7xl shadow-2xl overflow-hidden group-hover:scale-105 transition-transform">
              <span className="drop-shadow-2xl">{currentAvatar.icon}</span>
              <motion.button 
                whileHover={{ opacity: 1 }}
                onClick={() => setIsPickerOpen(true)}
                className="absolute inset-0 bg-black/60 opacity-0 flex flex-col items-center justify-center gap-2 transition-opacity"
              >
                <Camera size={24} />
                <span className="text-[8px] font-bold uppercase tracking-tighter">Cambiar</span>
              </motion.button>
            </div>
            {/* Rank Badge */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-dcode-purple rounded-2xl border-[3px] border-white flex items-center justify-center shadow-xl rotate-12">
              <span className="font-display font-black text-xl">12</span>
            </div>
          </div>

          <div className="mt-8 text-center space-y-2">
            <h2 className="font-display font-black text-3xl tracking-tight uppercase">{user?.name || 'Alex Dcoder'}</h2>
            <div className="flex gap-4 justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Shield size={12} className="text-dcode-cyan" />
                <span className="text-[9px] font-bold uppercase text-white/60">
                  {user?.goal ? (user.goal === 'career' ? 'Futuro Pro' : user.goal === 'ai' ? 'IA Master' : 'Guardian Py') : 'Guardian Py'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Trophy size={12} className="text-dcode-yellow" />
                <span className="text-[9px] font-bold uppercase text-white/60">Top 100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="glass-card p-6 border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-widest text-white/40">Actividad Semanal</h3>
            <Zap size={14} className="text-dcode-yellow" />
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_DATA}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="xp" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Knowledge Bar Chart */}
        <div className="glass-card p-6 border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-widest text-white/40">Conocimiento (%)</h3>
            <Code size={14} className="text-dcode-cyan" />
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KNOWLEDGE_DATA}>
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {KNOWLEDGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#06b6d4'} />
                  ))}
                </Bar>
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}}  dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Trophies & Store Highlight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Achievements */}
        <div className="md:col-span-2 glass-card p-6 border-white/10 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-sm uppercase">{t('Tus Logros y Trofeos', 'Your Achievements & Trophies')}</h3>
            <span className="text-[10px] font-bold text-dcode-cyan cursor-pointer hover:underline">{t('VER TODO', 'VIEW ALL')}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Standard Achievements */}
            {achievements?.map((ach) => (
               <motion.div 
                key={ach.id}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "relative p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/10 overflow-hidden",
                  ach.rarity === 'legendary' ? "bg-dcode-yellow/10 border-dcode-yellow/30 shadow-[0_0_20px_rgba(255,204,0,0.2)]" : "bg-white/5"
                )}
               >
                 {ach.rarity === 'legendary' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-dcode-yellow/20 to-transparent animate-pulse" />
                 )}
                 <span className="text-4xl relative z-10">{ach.icon}</span>
                 <span className="text-[10px] font-display font-black text-center relative z-10">{ach.title}</span>
               </motion.div>
            ))}

            {/* Exclusive Shop Dragon Achievement (if unlocked) */}
            {unlockedAvatars.includes('dragon-galactico') && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative p-4 rounded-2xl flex flex-col items-center gap-2 border border-dcode-magenta bg-dcode-magenta/10 shadow-[0_0_30px_rgba(255,0,255,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dcode-magenta/40 to-transparent animate-pulse" />
                <span className="text-4xl relative z-10">🌌🐲</span>
                <span className="text-[10px] font-display font-black text-center relative z-10 text-white">AMO GALÁCTICO</span>
                <div className="px-2 py-0.5 bg-dcode-magenta text-white text-[6px] font-black rounded-full uppercase absolute top-2 right-2 z-20">SHOP</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Store Quick Access / Next Goal */}
        <div className="glass-card p-6 border-dcode-magenta/30 bg-gradient-to-b from-dcode-magenta/10 to-transparent space-y-6 flex flex-col items-center text-center justify-center">
           <Trophy className="text-dcode-yellow" size={24} />
           <div className="space-y-2">
             <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">{t('Próxima Meta', 'Next Goal')}</p>
             <h4 className="font-display font-bold text-sm">{t('Cazador de Estrellas', 'Star Hunter')}</h4>
           </div>
           <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '75%' }}
               className="h-full bg-dcode-yellow" 
             />
           </div>
           <p className="text-[10px] font-bold text-white/40">75% Completado</p>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="space-y-6">
        <div className="flex gap-2">
           <button 
             onClick={() => setRankTab('global')}
             className={cn(
               "flex-1 py-3 px-4 rounded-xl font-display font-bold text-[10px] transition-all border",
               rankTab === 'global' ? "bg-dcode-cyan text-dcode-bg border-dcode-cyan shadow-lg" : "bg-white/5 text-white/50 border-white/10"
             )}
           >
             <Globe className="inline-block mr-2" size={14} /> GLOBAL
           </button>
           <button 
             onClick={() => setRankTab('friends')}
             className={cn(
               "flex-1 py-3 px-4 rounded-xl font-display font-bold text-[10px] transition-all border",
               rankTab === 'friends' ? "bg-dcode-purple text-white border-dcode-purple shadow-lg" : "bg-white/5 text-white/50 border-white/10"
             )}
           >
             <Users className="inline-block mr-2" size={14} /> AMIGOS
           </button>
        </div>

        <div className="glass-card border-white/10 divide-y divide-white/5 overflow-hidden">
           {(rankTab === 'global' ? GLOBAL_RANKING : FRIENDS_RANKING).map((rankItem, i) => (
             <div 
               key={i} 
               className={cn(
                 "p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group",
                 rankItem.name === user?.name ? "bg-dcode-cyan/10 border-l-4 border-dcode-cyan" : ""
               )}
             >
                <div className={cn(
                  "w-8 font-display font-black text-sm text-center",
                  rankItem.rank === 1 ? "text-dcode-yellow" : 
                  rankItem.rank === 2 ? "text-slate-300" : 
                  rankItem.rank === 3 ? "text-orange-400" : 
                  "text-white/20"
                )}>
                  #{rankItem.rank}
                </div>
                <div className="text-3xl filter drop-shadow-md">{rankItem.avatar}</div>
                <div className="flex-1">
                   <div className="flex items-center gap-2">
                     <p className={cn("font-bold text-sm tracking-tight", rankItem.name === user?.name ? "text-dcode-cyan" : "text-white")}>
                       {rankItem.name} {rankItem.name === user?.name && "(Tú)"}
                     </p>
                     {rankItem.rank <= 3 && <Trophy size={10} className={rankItem.rank === 1 ? "text-dcode-yellow" : rankItem.rank === 2 ? "text-slate-300" : "text-orange-400"} />}
                   </div>
                   <p className="text-[9px] text-white/40 font-bold uppercase tracking-tighter">
                     {t('Premio:', 'Prize:')} <span className="text-dcode-cyan/80">{rankItem.prize}</span>
                   </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-black text-white">{rankItem.xp.toLocaleString()}</p>
                  <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">ENERGY XP</p>
                </div>
             </div>
           ))}
           
           {/* Current User at the bottom if not in list */}
           {![...GLOBAL_RANKING, ...FRIENDS_RANKING].some(r => r.name === user?.name) && (
              <div className="p-4 flex items-center gap-4 bg-dcode-bg/50 border-t border-white/10 group">
                <div className="w-8 font-display font-black text-sm text-center text-white/20">#12</div>
                <div className="text-3xl">{currentAvatar.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-sm tracking-tight text-dcode-cyan">{user?.name} (Tú)</p>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-tighter">
                    {t('Sigue así para entrar al Top 10', 'Keep going to reach Top 10')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-black text-white">{xp.toLocaleString()}</p>
                  <p className="text-[8px] font-bold text-white/30 uppercase">ENERGY XP</p>
                </div>
              </div>
           )}
        </div>
      </section>

        </>
      ) : (
        /* Shop View */
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          {/* Shop Header */}
          <section className="flex justify-between items-center p-6 glass-card border-white/10 bg-gradient-to-r from-dcode-magenta/20 to-transparent">
             <div>
               <h2 className="font-display font-black text-3xl uppercase tracking-tighter">{t('La Bóveda', 'The Vault')}</h2>
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('Usa tu botín para mejorar', 'Use your loot to upgrade')}</p>
             </div>
             <div className="text-right">
               <div className="flex items-center gap-2 justify-end mb-1">
                 <span className="font-display font-black text-2xl text-dcode-yellow">{coins.toLocaleString()}</span>
                 <span className="text-xl">🪙</span>
               </div>
               <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">{t('Saldo Actual', 'Current Balance')}</p>
             </div>
          </section>

          {/* Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOP_ITEMS.map((item) => {
              const isUnlocked = item.type === 'avatar' ? unlockedAvatars.includes(item.id) : item.type === 'theme' ? unlockedThemes.includes(item.id) : unlockedLessons.includes(item.id);
              
              return (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "glass-card p-6 border-white/10 space-y-4 flex flex-col relative overflow-hidden",
                    item.rarity === 'legendary' ? "border-dcode-yellow/30" : item.rarity === 'epic' ? "border-dcode-magenta/30" : ""
                  )}
                >
                  {isUnlocked && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-dcode-teal text-white text-[8px] font-black rounded-lg uppercase z-20">
                      {t('Adquirido', 'Owned')}
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-2xl",
                      item.rarity === 'legendary' ? "bg-dcode-yellow/20" : item.rarity === 'epic' ? "bg-dcode-magenta/20" : "bg-white/5"
                    )}>
                      {item.icon}
                    </div>
                    <div className="text-right">
                       <span className={cn(
                         "text-[8px] font-black uppercase px-2 py-0.5 rounded-full border",
                         item.rarity === 'legendary' ? "border-dcode-yellow text-dcode-yellow" : item.rarity === 'epic' ? "border-dcode-magenta text-dcode-magenta" : "border-white/20 text-white/40"
                       )}>
                         {item.rarity}
                       </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-display font-black text-base uppercase tracking-tight">{item.name}</h4>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">{item.desc}</p>
                  </div>

                  <button 
                    disabled={isUnlocked || coins < item.cost}
                    onClick={() => handlePurchase(item)}
                    className={cn(
                      "w-full py-4 rounded-xl font-display font-black text-xs uppercase transition-all flex items-center justify-center gap-2",
                      isUnlocked 
                        ? "bg-white/5 text-white/20 cursor-default" 
                        : (coins >= item.cost 
                            ? "bg-white text-dcode-bg shadow-xl hover:scale-105 active:scale-95" 
                            : "bg-white/5 text-white/20 cursor-not-allowed")
                    )}
                  >
                    {isUnlocked ? (
                      <><Check size={16} /> {t('DESBLOQUEADO', 'UNLOCKED')}</>
                    ) : (
                      <>{item.cost.toLocaleString()} 🪙</>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="p-8 text-center glass-card border-white/5 bg-white/5 space-y-4">
             <Trophy className="mx-auto text-white/10" size={40} />
             <p className="text-sm text-white/40 italic">"{t('Nuevos items llegan con cada actualización del Gremio.', 'New items arrive with every Guild update.')}"</p>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card border-white/20 p-8 space-y-10"
            >
              <div className="flex items-center gap-4">
                 <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-white/5 rounded-xl border border-white/10 text-white/40 hover:text-white transition-colors">
                   <ArrowLeft size={18} />
                 </button>
                 <h3 className="font-display font-black text-2xl uppercase tracking-tighter">{t('Configuración', 'Settings')}</h3>
              </div>

              <div className="space-y-8">
                {/* Language */}
                <div className="space-y-4">
                  <p className="text-[10px] font-display font-bold uppercase text-white/40 tracking-widest">{t('Idioma', 'Language')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['es', 'en'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => updateSettings({ language: lang as any })}
                        className={cn(
                          "py-3 rounded-xl font-display font-bold text-xs uppercase border transition-all",
                          settings.language === lang ? "bg-dcode-cyan text-dcode-bg border-dcode-cyan" : "bg-white/5 border-white/10 text-white/50"
                        )}
                      >
                        {lang === 'es' ? 'Español' : 'English'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size Accessibility */}
                <div className="space-y-4">
                  <p className="text-[10px] font-display font-bold uppercase text-white/40 tracking-widest">{t('Accesibilidad (Tamaño de Texto)', 'Accessibility (Text Size)')}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {['small', 'normal', 'large', 'extra'].map(size => (
                      <button
                        key={size}
                        onClick={() => updateSettings({ fontSize: size as any })}
                        className={cn(
                          "py-3 rounded-xl font-display font-bold text-[8px] uppercase border transition-all",
                          settings.fontSize === size ? "bg-dcode-purple text-white border-dcode-purple shadow-[0_0_15px_rgba(126,34,206,0.3)]" : "bg-white/5 border-white/10 text-white/40"
                        )}
                      >
                        {size === 'small' ? t('Pequeña', 'Small') : size === 'normal' ? t('Mediana', 'Medium') : size === 'large' ? t('Grande', 'Large') : 'Extra'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound toggle */}
                <div className="flex items-center justify-between p-4 glass-card border-white/5">
                  <span className="font-display font-bold text-xs uppercase text-white/60">Sonidos de la App</span>
                  <button 
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-colors",
                      settings.soundEnabled ? "bg-dcode-cyan" : "bg-white/20"
                    )}
                  >
                    <motion.div 
                      animate={{ x: settings.soundEnabled ? 24 : 4 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
                    />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <p className="text-[10px] font-display font-bold uppercase text-white/40 tracking-widest text-center">{t('Gestión de Cuenta', 'Account Management')}</p>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      if (confirm(t('¿Estás seguro de que quieres cambiar de usuario? Tu progreso actual se mantendrá pero volverás al inicio.', 'Are you sure you want to switch users? Your current progress will be kept but you will return to the start.'))) {
                        setIsSettingsOpen(false);
                        resetOnboarding('auth');
                      }
                    }}
                    className="w-full py-3 rounded-xl font-display font-bold text-xs uppercase border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <User size={14} />
                    {t('Cambiar / Crear Usuario', 'Switch / Create User')}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-4 bg-white text-black font-display font-black text-xs uppercase rounded-xl tracking-widest"
              >
                {t('Guardar y Salir', 'Save and Exit')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {isPickerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card border-white/20 p-8 space-y-8"
            >
              <div className="flex justify-between items-center">
                 <h3 className="font-display font-black text-2xl uppercase">Tu Identidad</h3>
                 <button onClick={() => setIsPickerOpen(false)} className="text-white/40"><Settings size={20} /></button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {ALL_AVATARS.map((av) => {
                  const isUnlocked = unlockedAvatars?.includes(av.id);
                  const isSelected = avatar === av.id;
                  
                  return (
                    <motion.button
                      key={av.id}
                      whileHover={isUnlocked ? { scale: 1.1 } : {}}
                      whileTap={isUnlocked ? { scale: 0.9 } : {}}
                      onClick={() => { 
                        if (isUnlocked) {
                          setAvatar(av.id); 
                          setIsPickerOpen(false); 
                        } else {
                          if (confirm(`¿Quieres comprar ${av.name} por ${av.cost} 🪙?`)) {
                            handlePurchase({
                              id: av.id,
                              name: av.name,
                              type: 'avatar',
                              icon: av.icon,
                              cost: av.cost,
                              rarity: (av as any).rarity,
                              desc: ''
                            } as any);
                          }
                        }
                      }}
                      className={cn(
                        "aspect-square rounded-2xl flex items-center justify-center text-4xl relative transition-all border-2",
                        isUnlocked 
                          ? (isSelected ? "bg-dcode-cyan/30 border-dcode-cyan shadow-[0_0_20px_rgba(0,242,255,0.3)]" : "bg-white/5 border-white/10 hover:border-white/40")
                          : "bg-slate-900 border-white/5 grayscale"
                      )}
                    >
                      <span className={cn(
                        "transition-all",
                        !isUnlocked && "opacity-30 blur-[1px]"
                      )}>
                        {av.icon}
                      </span>

                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-dcode-cyan rounded-full flex items-center justify-center shadow-lg z-20">
                          <Check size={14} className="text-dcode-bg" />
                        </div>
                      )}

                      {!isUnlocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-2xl transition-all">
                          <Lock size={16} className="text-white/60 mb-1" />
                          <span className="text-[8px] font-black text-white/80 tracking-tighter">{av.cost} 🪙</span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <button 
                onClick={() => setIsPickerOpen(false)}
                className="w-full py-4 glass-card border-white/10 font-display font-black text-sm uppercase tracking-widest hover:bg-white/5"
              >
                Cerrar Editor
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

