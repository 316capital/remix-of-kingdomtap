import React from 'react';
import { Star, Trophy, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function UserProgress() {
  const { user } = useApp();

  if (!user) return null;

  const level = Math.floor(user.kingdomScore / 300); // Calculate level based on score
  const progressToNextLevel = (user.kingdomScore % 300) / 300; // Progress as percentage

  return (
    <div className="bg-gradient-gold rounded-lg p-4 text-secondary shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left - Level Progress */}
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-secondary" fill="currentColor" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Level {level}</span>
              <div className="w-32 h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progressToNextLevel * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-secondary/80">
              {Math.round((1 - progressToNextLevel) * 300)} pts to Level {level + 1}
            </span>
          </div>
        </div>

        {/* Right - Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-secondary" />
            <span className="font-semibold">{user.kingdomScore.toLocaleString()} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <span className="font-semibold">{user.dealsCompleted || 0} deals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
