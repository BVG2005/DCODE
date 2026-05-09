import { useState, useEffect } from 'react';

interface UserProgress {
  xp: number;
  level: number;
  coins: number;
  streak: number;
  avatar: string;
  unlockedAvatars: string[];
  unlockedLessons: string[];
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
    fontSize: 'normal' | 'large' | 'extra';
    soundEnabled: boolean;
  };
}

export { useProgress } from '../contexts/ProgressContext';
