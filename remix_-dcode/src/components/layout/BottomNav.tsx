import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, BookOpen, Sword, User, Radio } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useProgress } from '../../hooks/useProgress';

const navItems = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/courses', label: 'Cursos', icon: BookOpen },
  { path: '/adventure', label: 'Aventura', icon: Sword },
  { path: '/academy', label: 'Academia', icon: Radio },
  { path: '/profile', label: 'Perfil', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const { hideNav } = useProgress();

  if (hideNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
      <div className="max-w-md mx-auto flex items-center justify-around glass-card p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-1 p-3 transition-all duration-300 rounded-xl",
                isActive 
                  ? "text-dcode-cyan bg-white/5 border border-dcode-cyan shadow-[0_0_10px_rgba(0,242,255,0.2)]" 
                  : "text-[#94a3b8] hover:text-white"
              )}
            >
              <Icon size={20} className={isActive ? "opacity-100" : "opacity-30"} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider">
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="w-1 h-1 bg-dcode-cyan rounded-full shadow-[0_0_8px_rgba(6,182,212,1)]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
