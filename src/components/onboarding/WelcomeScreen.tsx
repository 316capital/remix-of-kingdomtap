import React from 'react';
import { BookOpen, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  userEmail: string;
  onStart: () => void;
}

export function WelcomeScreen({ userEmail, onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-white mb-4">
        Welcome to KingdomTap!
      </h2>
      
      <p className="text-xl text-white/70 mb-2">
        Hi, <span className="text-primary font-semibold">{userEmail}</span>
      </p>
      
      <p className="text-white/60 mb-8 max-w-lg mx-auto">
        Let's set up your professional profile so you can start connecting with the right people and finding great deals.
      </p>

      <div className="bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-8 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="text-left">
            <p className="text-white font-semibold">Estimated Time</p>
            <p className="text-white/60 text-sm">3-5 minutes to complete</p>
          </div>
        </div>
        
        <div className="space-y-2 text-left">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm">Choose your professional role</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm">Share your experience and goals</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm">Set your market preferences</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm">Verify your professional credentials</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-bold text-lg shadow-gold-glow inline-flex items-center gap-2 transform hover:scale-105"
      >
        Let's Get Started
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="mt-6 text-white/50 text-sm">
        Step 1 of 7
      </p>
    </div>
  );
}
