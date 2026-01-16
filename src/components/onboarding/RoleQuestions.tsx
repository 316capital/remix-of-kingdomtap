import React from 'react';
import { TrendingUp, DollarSign, Users, Building2, Target, Handshake, Search } from 'lucide-react';
import type { UserRole } from '../../types';

interface RoleQuestionsProps {
  role: UserRole;
  roleData: Record<string, string | string[]>;
  setRoleData: (data: Record<string, string | string[]>) => void;
}

export function RoleQuestions({ role, roleData, setRoleData }: RoleQuestionsProps) {
  const updateData = (key: string, value: string | string[]) => {
    setRoleData({ ...roleData, [key]: value });
  };

  const toggleArrayValue = (key: string, value: string) => {
    const current = (roleData[key] as string[]) || [];
    updateData(
      key,
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    );
  };

  const goalOptions: { [key in UserRole]: string[] } = {
    investor: ['Find Joint Ventures', 'Expand Network', 'Find Funding/Lending', 'Find Deals', 'Find Buyers', 'Find Partners', 'Scale Portfolio'],
    lender: ['Hard Money', 'Private Lending', 'Commercial Loans', 'Bridge Financing', 'Fix & Flip Loans', 'DSCR Loans'],
    broker: ['Residential Sales', 'Commercial Sales', 'Luxury Properties', 'Investment Properties', 'Off-Market Deals', 'Property Management'],
    wholesaler: ['Single Family', 'Multi-Family', 'Commercial', 'Land', 'Distressed Properties', 'Off-Market Deals']
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Your Goals & Expertise</h2>
      <p className="text-white/70 mb-8">Tell us what you're looking for and what you do</p>

      <div className="space-y-6">
        {/* Goals Section */}
        <div>
          <label className="block text-lg font-semibold text-white mb-3">
            <Target className="w-5 h-5 inline mr-2" />
            What Are You Looking For?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goalOptions[role].map(goal => (
              <button
                key={goal}
                type="button"
                onClick={() => toggleArrayValue('goals', goal)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  ((roleData.goals as string[]) || []).includes(goal)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/10 text-white/70 hover:border-primary/50'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Role-Specific Details */}
        <div className="border-t border-white/10 pt-6">
          <label className="block text-lg font-semibold text-white mb-4">
            Your {role.charAt(0).toUpperCase() + role.slice(1)} Details
          </label>
          
          {role === 'investor' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/90 mb-3">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Investment Strategies
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Fix & Flip', 'Buy & Hold', 'Wholesale', 'BRRRR', 'Commercial', 'Multi-Family'].map(strategy => (
                    <button
                      key={strategy}
                      type="button"
                      onClick={() => toggleArrayValue('strategies', strategy)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        ((roleData.strategies as string[]) || []).includes(strategy)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 text-white/70 hover:border-primary/50'
                      }`}
                    >
                      {strategy}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Primary Funding Source
                </label>
                <select
                  value={roleData.fundingSource as string || ''}
                  onChange={(e) => updateData('fundingSource', e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                >
                  <option value="" className="bg-secondary">Select funding source</option>
                  <option value="cash" className="bg-secondary">Cash</option>
                  <option value="conventional" className="bg-secondary">Conventional Loan</option>
                  <option value="private" className="bg-secondary">Private Money</option>
                  <option value="hard" className="bg-secondary">Hard Money</option>
                  <option value="partnership" className="bg-secondary">Joint Venture/Partnership</option>
                </select>
              </div>
            </>
          )}

        {role === 'lender' && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Lending Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Hard Money', 'Private Lending', 'Conventional', 'Commercial'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayValue('lendingTypes', type)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      ((roleData.lendingTypes as string[]) || []).includes(type)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-white/10 text-white/70 hover:border-primary/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Min Loan Size
                </label>
                <input
                  type="number"
                  value={roleData.minLoanSize as string || ''}
                  onChange={(e) => updateData('minLoanSize', e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                  placeholder="$50,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Max Loan Size
                </label>
                <input
                  type="number"
                  value={roleData.maxLoanSize as string || ''}
                  onChange={(e) => updateData('maxLoanSize', e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                  placeholder="$2,000,000"
                />
              </div>
            </div>
          </>
        )}

        {role === 'broker' && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                <Users className="w-4 h-4 inline mr-2" />
                Specializations
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Residential', 'Commercial', 'Land', 'Investment'].map(spec => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleArrayValue('specializations', spec)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      ((roleData.specializations as string[]) || []).includes(spec)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-white/10 text-white/70 hover:border-primary/50'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Brokerage Name
              </label>
              <input
                type="text"
                value={roleData.brokerageName as string || ''}
                onChange={(e) => updateData('brokerageName', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="Premier Realty Group"
              />
            </div>
          </>
        )}

        {role === 'wholesaler' && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                <Building2 className="w-4 h-4 inline mr-2" />
                Lead Sources
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Direct Mail', 'Driving for Dollars', 'MLS', 'Networking'].map(source => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => toggleArrayValue('leadSources', source)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      ((roleData.leadSources as string[]) || []).includes(source)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-white/10 text-white/70 hover:border-primary/50'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Average Deals Per Month
              </label>
              <input
                type="number"
                value={roleData.dealsPerMonth as string || ''}
                onChange={(e) => updateData('dealsPerMonth', e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="5"
                min="0"
              />
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
