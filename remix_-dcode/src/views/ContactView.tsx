import { motion } from 'motion/react';
import { Mail, Phone, Instagram, Twitter, MessageCircle, Send } from 'lucide-react';

export default function ContactView() {
  return (
    <div className="px-6 py-8 space-y-8 pb-32">
      <header className="space-y-1">
        <h2 className="font-display font-black text-2xl neon-text uppercase tracking-tighter">CONTACTO</h2>
        <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Únete al mundo del código</p>
      </header>

      <section className="glass-card p-6 border-white/10 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-display font-bold text-white/40 uppercase">Nombre del Aprendiz</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-dcode-cyan transition-all" placeholder="Escribe tu nombre..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-display font-bold text-white/40 uppercase">Correo de Enlace</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-dcode-cyan transition-all" placeholder="dragon@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-display font-bold text-white/40 uppercase">Mensaje para el Gremio</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-dcode-cyan transition-all resize-none" placeholder="Tus misiones, dudas o saludos..." />
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-dcode-cyan to-dcode-blue rounded-2xl font-display font-bold text-dcode-bg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
          <Send size={18} />
          ENVIAR MENSAJE
        </button>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <a href="#" className="glass-card p-4 flex flex-col items-center gap-2 border-white/5 hover:bg-white/5 transition-colors">
          <Instagram size={24} className="text-dcode-magenta" />
          <span className="text-[10px] font-display font-bold uppercase tracking-widest">Instagram</span>
        </a>
        <a href="#" className="glass-card p-4 flex flex-col items-center gap-2 border-white/5 hover:bg-white/5 transition-colors">
          <Twitter size={24} className="text-dcode-blue" />
          <span className="text-[10px] font-display font-bold uppercase tracking-widest">Twitter</span>
        </a>
      </div>

      <button className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
        <MessageCircle size={24} className="text-emerald-400" />
        <span className="font-display font-bold text-emerald-400 text-xs">HABLAR POR WHATSAPP</span>
      </button>

      <footer className="pt-10 pb-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 opacity-30">
          <div className="w-6 h-[1px] bg-white" />
          <span className="font-display text-[10px] tracking-[0.3em]">DCODE 2026</span>
          <div className="w-6 h-[1px] bg-white" />
        </div>
        <p className="text-[10px] text-white/40 font-display uppercase tracking-widest leading-loose">
          Únete ahora y descubre el mundo de la programación con DCODE
        </p>
      </footer>
    </div>
  );
}
