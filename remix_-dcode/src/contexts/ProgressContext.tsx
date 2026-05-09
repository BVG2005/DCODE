import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProgress {
  xp: number;
  level: number;
  coins: number;
  streak: number;
  avatar: string;
  unlockedAvatars: string[];
  unlockedLessons: string[];
  unlockedThemes: string[];
  completedChallenges: string[];
  achievements: { id: string; title: string; icon: string; rarity: 'common' | 'rare' | 'epic' | 'legendary' }[];
  onboarded: boolean;
  user?: {
    name: string;
    email: string;
    goal: string;
    commitment: string;
    level: string;
  };
  settings: {
    language: 'es' | 'en';
    fontSize: 'small' | 'normal' | 'large' | 'extra';
    soundEnabled: boolean;
  };
}

interface ProgressContextType extends UserProgress {
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  setAvatar: (avatarId: string) => void;
  updateSettings: (newSettings: Partial<UserProgress['settings']>) => void;
  completeOnboarding: (userData: NonNullable<UserProgress['user']>) => void;
  resetOnboarding: (startAt?: 'welcome' | 'auth') => void;
  unlockItem: (type: 'avatar' | 'theme' | 'lesson', id: string, cost: number) => boolean;
  onboardingEntryPoint: 'welcome' | 'auth';
  hideNav: boolean;
  setHideNav: (hide: boolean) => void;
}

const defaultData: UserProgress = {
  xp: 12450,
  level: 12,
  coins: 3850,
  streak: 8,
  avatar: 'dragon-1',
  unlockedAvatars: ['dragon-1', 'boy-1', 'girl-1', 'cat-1'],
  unlockedLessons: ['intro-1', 'intro-2', 'logic-1'],
  unlockedThemes: ['default'],
  completedChallenges: ['c1', 'c2'],
  achievements: [
    { id: '1', title: 'Velocista do Código', icon: '⚡', rarity: 'rare' },
    { id: '2', title: 'Matador de Bugs', icon: '👾', rarity: 'epic' },
    { id: '3', title: 'Dragão de Ouro', icon: '🐲', rarity: 'legendary' },
  ],
  onboarded: false,
  settings: {
    language: 'es',
    fontSize: 'normal',
    soundEnabled: true
  }
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [hideNav, setHideNav] = useState(false);
  const [onboardingEntryPoint, setOnboardingEntryPoint] = useState<'welcome' | 'auth'>('welcome');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('dcode_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultData, ...parsed, settings: { ...defaultData.settings, ...parsed.settings } };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('dcode_progress', JSON.stringify(progress));
  }, [progress]);

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const addCoins = (amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const setAvatar = (avatarId: string) => {
    setProgress(prev => ({ ...prev, avatar: avatarId }));
  };

  const updateSettings = (newSettings: Partial<UserProgress['settings']>) => {
    setProgress(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const completeOnboarding = (userData: NonNullable<UserProgress['user']>) => {
    setProgress(prev => ({
      ...prev,
      onboarded: true,
      user: userData
    }));
  };

  const resetOnboarding = (startAt: 'welcome' | 'auth' = 'welcome') => {
    setOnboardingEntryPoint(startAt);
    setProgress(prev => ({
      ...prev,
      onboarded: false,
      user: undefined, // Clear existing user to allow fresh start
    }));
  };

  const unlockItem = (type: 'avatar' | 'theme' | 'lesson', id: string, cost: number) => {
    if (progress.coins < cost) return false;

    setProgress(prev => {
      const key = type === 'avatar' ? 'unlockedAvatars' : type === 'theme' ? 'unlockedThemes' : 'unlockedLessons';
      if (prev[key].includes(id)) return prev;

      return {
        ...prev,
        coins: prev.coins - cost,
        [key]: [...prev[key], id]
      };
    });
    return true;
  };

  return (
    <ProgressContext.Provider value={{
      ...progress,
      addXP,
      addCoins,
      setAvatar,
      updateSettings,
      completeOnboarding,
      resetOnboarding,
      unlockItem,
      onboardingEntryPoint,
      hideNav,
      setHideNav
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
