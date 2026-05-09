/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import HomeView from './views/HomeView';
import CoursesView from './views/CoursesView';
import ProfileView from './views/ProfileView';
import AdventureView from './views/AdventureView';
import CommunityView from './views/CommunityView';
import GameView from './views/GameView';
import ContactView from './views/ContactView';
import AchievementsView from './views/AchievementsView';
import MicroProjectsView from './views/MicroProjectsView';
import BottomNav from './components/layout/BottomNav';
import DragonAgent from './components/game/DragonAgent';
import { useProgress } from './hooks/useProgress';
import { cn } from './lib/utils';

import OnboardingView from './views/OnboardingView';
import AcademyView from './views/AcademyView';

export default function App() {
  const { xp, level, coins, onboarded, settings } = useProgress();

  const fontSizeClass = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg',
    extra: 'text-xl'
  }[settings.fontSize] || 'text-base';

  return (
    <Router>
      <div className={cn("relative min-h-screen bg-dcode-bg overflow-hidden flex flex-col", fontSizeClass)}>
        {/* Onboarding Overlay */}
        <AnimatePresence>
          {!onboarded && <OnboardingView />}
        </AnimatePresence>
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 matrix-bg opacity-10" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        {/* Persistent UI Elements */}
        <header className="relative z-30 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-dcode-bg/60 border-b border-white/10 sticky top-0">
          <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-dcode-cyan to-dcode-blue rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] rotate-3 hover:rotate-0 transition-transform">
              <span className="font-display font-black text-xl text-dcode-bg">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider neon-text leading-none">DCODE</span>
              <span className="text-[8px] font-pixel text-white/40 tracking-widest">DRAGON CODE</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 shadow-inner"
            >
              <span className="text-sm">🪙</span>
              <span className="font-display text-xs font-black text-dcode-yellow">{coins.toLocaleString()}</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 shadow-inner"
            >
              <span className="text-sm text-dcode-magenta animate-pulse">⚡</span>
              <span className="font-display text-xs font-black">LVL {level}</span>
            </motion.div>
          </div>
        </header>

        <main className="relative z-10 flex-1 overflow-y-auto pb-24">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/courses" element={<CoursesView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/adventure" element={<AdventureView />} />
            <Route path="/community" element={<CommunityView />} />
            <Route path="/game/:id" element={<GameView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/achievements" element={<AchievementsView />} />
            <Route path="/academy" element={<AcademyView />} />
            <Route path="/projects" element={<MicroProjectsView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <BottomNav />
        <DragonAgent />
      </div>
    </Router>
  );
}

