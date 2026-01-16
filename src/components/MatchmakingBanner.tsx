import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { mockMatches } from '../lib/mockData';

interface MatchmakingBannerProps {
  onStartMatching?: () => void;
}

export function MatchmakingBanner({ onStartMatching }: MatchmakingBannerProps) {
  const currentMatch = mockMatches[0]; // Mock current profile
  const totalMatches = 12; // Mock total
  const responseRate = 87; // Mock percentage

  return (
    <div className="bg-card rounded-xl shadow-md border border-border hover:border-accent/30 transition-all p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-semibold text-foreground">Find Your Next Connection</h2>
      </div>

      {currentMatch ? (
        <div className="space-y-4">
          {/* Current Profile Preview */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentMatch.avatar}
                alt={currentMatch.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20"
              />
              <div>
                <p className="font-medium text-foreground">{currentMatch.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{currentMatch.role}</p>
              </div>
            </div>

            <button
              onClick={onStartMatching}
              className="px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold shadow-sm hover:scale-105 transition-all flex items-center gap-2"
            >
              Start Matching
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-3">
            <div>
              <span className="font-semibold text-foreground">{totalMatches}</span> matches today
            </div>
            <div>
              <span className="font-semibold text-foreground">{responseRate}%</span> response rate
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground max-w-lg">
            Connect with real estate professionals who match your investment goals and location preferences.
          </p>
          <button
            onClick={onStartMatching}
            className="px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold shadow-sm hover:scale-105 transition-all flex items-center gap-2"
          >
            Start Matching
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
