import React from 'react';
import { Building2, DollarSign, UserCheck, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface RoleBasedCTAProps {
  onAction?: () => void;
}

export function RoleBasedCTA({ onAction }: RoleBasedCTAProps) {
  const { user } = useApp();

  if (!user) return null;

  const ctaConfig = {
    investor: {
      title: 'Ready to Find Your Next Deal?',
      description: 'Browse exclusive off-market properties tailored to your investment criteria.',
      buttonText: 'Browse Deals',
      icon: Building2,
    },
    lender: {
      title: 'Connect with Borrowers',
      description: 'Find qualified borrowers seeking funding for their next investment project.',
      buttonText: 'View Loan Requests',
      icon: DollarSign,
    },
    broker: {
      title: 'Expand Your Network',
      description: 'Connect with investors and sellers to close more deals and grow your business.',
      buttonText: 'Start Networking',
      icon: UserCheck,
    },
    wholesaler: {
      title: 'Market Your Deals',
      description: 'Reach thousands of qualified investors looking for their next opportunity.',
      buttonText: 'Post a Deal',
      icon: Users,
    },
  };

  const config = ctaConfig[user.role] || ctaConfig.investor;
  const Icon = config.icon;

  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-lg border border-border p-6 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {config.title}
          </h3>
          <p className="text-muted-foreground">
            {config.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Icon className="w-12 h-12 text-accent hidden md:block" />
          <button
            onClick={onAction}
            className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold shadow-sm hover:scale-105 transition-all whitespace-nowrap"
          >
            {config.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
