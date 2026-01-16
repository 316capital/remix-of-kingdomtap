import React from 'react';
import { MapPin, Home, DollarSign } from 'lucide-react';

interface LocationExperienceProps {
  primaryLocation: string;
  setPrimaryLocation: (value: string) => void;
  propertyTypes: string[];
  setPropertyTypes: (value: string[]) => void;
  dealSizeMin: string;
  setDealSizeMin: (value: string) => void;
  dealSizeMax: string;
  setDealSizeMax: (value: string) => void;
}

const PROPERTY_TYPES = [
  'Single Family',
  'Multi-Family',
  'Commercial',
  'Industrial',
  'Land',
  'Mixed-Use'
];

export function LocationExperience({
  primaryLocation,
  setPrimaryLocation,
  propertyTypes,
  setPropertyTypes,
  dealSizeMin,
  setDealSizeMin,
  dealSizeMax,
  setDealSizeMax
}: LocationExperienceProps) {
  const togglePropertyType = (type: string) => {
    if (propertyTypes.includes(type)) {
      setPropertyTypes(propertyTypes.filter(t => t !== type));
    } else {
      setPropertyTypes([...propertyTypes, type]);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Location & Preferences</h2>
      <p className="text-white/70 mb-8">Tell us about your market and investment preferences</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Primary Location *
          </label>
          <input
            type="text"
            value={primaryLocation}
            onChange={(e) => setPrimaryLocation(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
            placeholder="e.g., Miami, FL"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            <Home className="w-4 h-4 inline mr-2" />
            Property Types of Interest *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PROPERTY_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => togglePropertyType(type)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  propertyTypes.includes(type)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/10 text-white/70 hover:border-primary/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Preferred Deal Size Range (Optional)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">Minimum</label>
              <input
                type="number"
                value={dealSizeMin}
                onChange={(e) => setDealSizeMin(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="$50,000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Maximum</label>
              <input
                type="number"
                value={dealSizeMax}
                onChange={(e) => setDealSizeMax(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="$500,000"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
