import React, { useEffect, useState } from 'react';
import { Clock, Shield, CheckCircle, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import logo from '../assets/kingdomtap-logo.png';

export function PendingApproval() {
  const { user, setUser } = useApp();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-approve after countdown
          if (user) {
            setUser({
              ...user,
              approvalStatus: 'approved',
              kingdomScore: 500
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, setUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-secondary flex items-center justify-center p-4">
      <div className="bg-card/10 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>

          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Clock className="w-10 h-10 text-primary animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Application Under Review
          </h1>
          
          <p className="text-lg text-white/70 mb-8">
            Thank you for applying to join KingdomTap! Your application is currently being reviewed by our team.
          </p>

          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-6 mb-8">
            <div className="text-6xl font-bold text-primary mb-2">{countdown}</div>
            <p className="text-white/80">Verifying your information...</p>
          </div>

          <div className="bg-black/30 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Why We Review Applications
            </h2>
            <p className="text-white/70 mb-4">
              KingdomTap is an exclusive network of verified real estate professionals. We carefully review each application to ensure:
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>All members are legitimate professionals in the real estate industry</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Credentials and experience are verified for trust and safety</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>The quality and exclusivity of our network is maintained</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
