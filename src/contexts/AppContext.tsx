import React, { createContext, useContext, ReactNode, useState } from 'react';
import type { User, UserRole, OnboardingData } from '../types';
import { mockUser } from '../lib/mockData';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;
  completeOnboarding: (data: OnboardingData) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const completeOnboarding = (data: OnboardingData) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        role: data.role,
        location: data.location,
        experience: data.experience,
        goals: data.goals,
        companyName: data.companyName,
        brokerLicense: data.brokerLicense,
        brokerLicenseState: data.brokerLicenseState,
        nmlsNumber: data.nmlsNumber,
        verified: false,
        linkedInVerified: false,
        approvalStatus: 'approved', // Auto-approve for mock data
        kingdomScore: 500, // Starting score
        dealsCompleted: 0,
        totalDealVolume: 0,
      };
      setUser(updatedUser);
      setIsOnboarded(true);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      showAuth, 
      setShowAuth,
      isOnboarded,
      setIsOnboarded,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
