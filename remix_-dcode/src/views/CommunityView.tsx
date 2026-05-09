import { motion } from 'motion/react';
import { MessageSquare, Heart, Share2, Users } from 'lucide-react';

const posts = [
  { id: 1, user: 'NovaCode', text: '¡Acabo de completar el mundo de los bucles! Es más fácil de lo que pensaba 🐉✨', likes: 24, comments: 5 },
  { id: 2, user: 'BitDragon', text: '¿Alguien sabe cómo usar una variable para guardar el puntaje en el minijuego?', likes: 12, comments: 18 },
  { id: 3, user: 'CyberOcto', text: 'DCODE es increíble, mi hermanito ya está aprendiendo lógica básica con 6 años.', likes: 45, comments: 2 },
];

export default function CommunityView() {
  return (
    <div className="px-6 py-8 space-y-8 pb-32">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl neon-text">COMUNIDAD</h2>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">El gremio de programadores</p>
        </div>
        <div className="p-3 glass-card rounded-2xl text-dcode-cyan">
          <Users size={24} />
        </div>
      </header>

      {/* Leaderboard Small */}
      <section className="glass-card p-4 border-dcode-purple/20 bg-dcode-purple/5 space-y-4">
        <h3 className="font-display font-bold text-[10px] text-dcode-purple uppercase tracking-[0.2em]">Top del Gremio</h3>
        <div className="space-y-3">
          {[
            { name: 'Alex', xp: '15,320', rank: 1 },
            { name: 'NovaCode', xp: '14,200', rank: 2 },
            { name: 'BitDragon', xp: '12,800', rank: 3 },
          ].map((user) => (
            <div key={user.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display font-black text-white/20 w-4">{user.rank}</span>
                <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden border border-white/20">
                   <img src={`https://picsum.photos/seed/${user.name}/40`} className="pixel-art" referrerPolicy="no-referrer" />
                </div>
                <span className="font-display font-bold text-xs">{user.name}</span>
              </div>
              <span className="font-display font-bold text-[10px] text-dcode-cyan">{user.xp} XP</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feed */}
      <div className="space-y-4">
         {posts.map((post, i) => (
           <motion.div
             key={post.id}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-5 border-white/5 space-y-4"
           >
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${post.user}/40`} className="pixel-art" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-tight">{post.user}</h4>
                  <p className="text-[10px] text-white/30">Hace 2 horas</p>
                </div>
             </div>
             
             <p className="text-sm leading-relaxed text-white/80">{post.text}</p>
             
             <div className="pt-4 border-t border-white/5 flex items-center gap-6">
                <button className="flex items-center gap-2 text-white/40 hover:text-dcode-magenta transition-colors">
                  <Heart size={16} />
                  <span className="text-xs font-display font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-white/40 hover:text-dcode-cyan transition-colors">
                  <MessageSquare size={16} />
                  <span className="text-xs font-display font-bold">{post.comments}</span>
                </button>
                <button className="ml-auto text-white/20 hover:text-white transition-colors">
                  <Share2 size={16} />
                </button>
             </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
