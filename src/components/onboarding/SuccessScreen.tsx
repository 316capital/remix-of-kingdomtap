import React, { useEffect, useState } from 'react';
import { CheckCircle, TrendingUp, Users, Briefcase, MessageCircle, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  onComplete: () => void;
}

export function SuccessScreen({ onComplete }: SuccessScreenProps) {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center animate-fade-in relative">
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative">
          <CheckCircle className="w-16 h-16 text-primary" />
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-white mb-4">
        Congratulations! 🎉
      </h2>
      
      <p className="text-xl text-white/70 mb-2">
        Your profile is all set up!
      </p>
      
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        You're now ready to start building meaningful connections and finding great deals on KingdomTap.
      </p>

      <div className="bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Tips to Get Started:</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm">Complete your profile</p>
              <p className="text-white/60 text-xs">Add a photo and more details for better matches</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm">Start swiping to find connections</p>
              <p className="text-white/60 text-xs">Discover professionals that match your goals</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm">Post your first deal</p>
              <p className="text-white/60 text-xs">Share opportunities with the community</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm">Make your first connection</p>
              <p className="text-white/60 text-xs">Start conversations and build relationships</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-4 mb-8 max-w-lg mx-auto">
        <p className="text-white/90 font-semibold mb-1">Your Starting KingdomScore</p>
        <div className="text-5xl font-bold text-primary">500</div>
        <p className="text-white/60 text-sm mt-1">Complete your profile and make connections to increase your score!</p>
      </div>

      <button
        onClick={onComplete}
        className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-bold text-lg shadow-gold-glow inline-flex items-center gap-2 transform hover:scale-105"
      >
        Enter KingdomTap
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
