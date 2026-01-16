import React, { useState } from 'react';
import { Building2, TrendingUp, Users, DollarSign, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import type { UserRole } from '../types';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { BasicInfo } from './onboarding/BasicInfo';
import { LocationExperience } from './onboarding/LocationExperience';
import { RoleQuestions } from './onboarding/RoleQuestions';
import { Verification } from './onboarding/Verification';
import { SuccessScreen } from './onboarding/SuccessScreen';

export function OnboardingFlow() {
  const { user, completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  
  // Step 1: Role Selection
  const [role, setRole] = useState<UserRole | ''>('');
  
  // Step 2: Basic Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [bio, setBio] = useState('');
  
  // Step 3: Location & Experience
  const [primaryLocation, setPrimaryLocation] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [dealSizeMin, setDealSizeMin] = useState('');
  const [dealSizeMax, setDealSizeMax] = useState('');
  
  // Step 4: Goals
  const [goals, setGoals] = useState<string[]>([]);
  
  // Step 5: Role-Specific Questions
  const [roleData, setRoleData] = useState<Record<string, string | string[]>>({});
  
  // Step 6: Verification
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseState, setLicenseState] = useState('');

  const roleOptions: { value: UserRole; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'investor',
      label: 'Investor',
      description: 'Buy properties and build your portfolio',
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      value: 'lender',
      label: 'Lender',
      description: 'Finance deals and provide capital',
      icon: <DollarSign className="w-8 h-8" />
    },
    {
      value: 'broker',
      label: 'Broker',
      description: 'Facilitate transactions and represent clients',
      icon: <Users className="w-8 h-8" />
    },
    {
      value: 'wholesaler',
      label: 'Wholesaler',
      description: 'Find deals and connect buyers/sellers',
      icon: <Building2 className="w-8 h-8" />
    }
  ];

  const goalOptions: { [key in UserRole]: string[] } = {
    investor: ['Fix & Flip', 'Buy & Hold', 'BRRRR', 'Commercial', 'Multi-Family', 'Syndication'],
    lender: ['Hard Money', 'Private Lending', 'Commercial Loans', 'Bridge Financing', 'Fix & Flip Loans', 'DSCR Loans'],
    broker: ['Residential Sales', 'Commercial Sales', 'Luxury Properties', 'Investment Properties', 'Off-Market Deals', 'Property Management'],
    wholesaler: ['Single Family', 'Multi-Family', 'Commercial', 'Land', 'Distressed Properties', 'Off-Market Deals']
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleComplete = () => {
    if (!role) return;

    completeOnboarding({
      role,
      fullName,
      phone: phone || undefined,
      companyName: companyName || undefined,
      yearsExperience,
      bio: bio || undefined,
      location: primaryLocation,
      propertyTypes,
      dealSizeMin: dealSizeMin || undefined,
      dealSizeMax: dealSizeMax || undefined,
      roleData,
      experience: yearsExperience,
      goals,
      brokerLicense: licenseNumber || undefined,
      brokerLicenseState: licenseState || undefined,
      nmlsNumber: licenseNumber || undefined
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true; // Welcome screen
      case 1: return role !== ''; // Role selection
      case 2: return fullName.trim() !== '' && yearsExperience !== ''; // Basic info
      case 3: return primaryLocation.trim() !== '' && propertyTypes.length > 0; // Location
      case 4: return true; // Goals & Details (optional)
      case 5: return true; // Verification (optional)
      default: return false;
    }
  };

  const stepLabels = ['Welcome', 'Role', 'Info', 'Location', 'Goals & Details', 'Verify'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-secondary flex items-center justify-center p-4">
      <div className="bg-card/10 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        {/* Progress Steps */}
        {step > 0 && step < 7 && (
          <div className="mb-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[500px]">
              {stepLabels.slice(1).map((label, idx) => {
                const actualStep = idx + 1;
                return (
                  <div key={label} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                      actualStep <= step ? 'bg-primary text-primary-foreground' : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      {actualStep < step ? <Check className="w-5 h-5" /> : actualStep}
                    </div>
                    <span className={`ml-2 font-medium hidden sm:inline text-sm ${
                      actualStep <= step ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {label}
                    </span>
                    {idx < 5 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        actualStep < step ? 'bg-primary' : 'bg-muted/20'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[400px]">
          {/* Step 0: Welcome Screen */}
          {step === 0 && (
            <WelcomeScreen
              userEmail={user?.email || ''}
              onStart={() => setStep(1)}
            />
          )}

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-2">What's your role?</h2>
              <p className="text-white/70 mb-8">Select the option that best describes you</p>

              <div className="grid md:grid-cols-2 gap-4">
                {roleOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      role === option.value
                        ? 'border-primary bg-primary/10 shadow-gold-glow'
                        : 'border-white/10 hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className={`mb-4 ${role === option.value ? 'text-primary' : 'text-white/60'}`}>
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{option.label}</h3>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <BasicInfo
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              companyName={companyName}
              setCompanyName={setCompanyName}
              yearsExperience={yearsExperience}
              setYearsExperience={setYearsExperience}
              bio={bio}
              setBio={setBio}
            />
          )}

          {/* Step 3: Location & Experience */}
          {step === 3 && (
            <LocationExperience
              primaryLocation={primaryLocation}
              setPrimaryLocation={setPrimaryLocation}
              propertyTypes={propertyTypes}
              setPropertyTypes={setPropertyTypes}
              dealSizeMin={dealSizeMin}
              setDealSizeMin={setDealSizeMin}
              dealSizeMax={dealSizeMax}
              setDealSizeMax={setDealSizeMax}
            />
          )}

          {/* Step 4: Goals & Role-Specific Questions Combined */}
          {step === 4 && role && (
            <RoleQuestions
              role={role}
              roleData={{ ...roleData, goals }}
              setRoleData={(data) => {
                const { goals: newGoals, ...rest } = data;
                setGoals((newGoals as string[]) || []);
                setRoleData(rest);
              }}
            />
          )}

          {/* Step 5: Verification */}
          {step === 5 && (
            <Verification
              licenseNumber={licenseNumber}
              setLicenseNumber={setLicenseNumber}
              licenseState={licenseState}
              setLicenseState={setLicenseState}
            />
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <SuccessScreen onComplete={handleComplete} />
          )}
        </div>

        {/* Navigation Buttons */}
        {step > 0 && step < 6 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted/20 disabled:cursor-not-allowed disabled:text-muted-foreground transition-colors font-semibold shadow-gold-glow"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setStep(6)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-gold-glow"
              >
                <Check className="w-5 h-5" />
                Complete Setup
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
