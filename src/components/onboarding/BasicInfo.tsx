import React from 'react';
import { User, Phone, Building, Award, FileText } from 'lucide-react';

interface BasicInfoProps {
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  yearsExperience: string;
  setYearsExperience: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
}

export function BasicInfo({
  fullName,
  setFullName,
  phone,
  setPhone,
  companyName,
  setCompanyName,
  yearsExperience,
  setYearsExperience,
  bio,
  setBio
}: BasicInfoProps) {
  const bioCharCount = bio.length;
  const maxBioLength = 500;

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h2>
      <p className="text-white/70 mb-8">This information helps build your professional profile</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Company/Business Name (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
            placeholder="Premier Real Estate"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <Award className="w-4 h-4 inline mr-2" />
            Years of Experience *
          </label>
          <select
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
            required
          >
            <option value="" className="bg-secondary">Select your experience</option>
            <option value="0-1" className="bg-secondary">0-1 years (New to real estate)</option>
            <option value="1-3" className="bg-secondary">1-3 years</option>
            <option value="3-5" className="bg-secondary">3-5 years</option>
            <option value="5-10" className="bg-secondary">5-10 years</option>
            <option value="10+" className="bg-secondary">10+ years (Experienced professional)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Brief Bio/Introduction (Optional)
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= maxBioLength) {
                setBio(e.target.value);
              }
            }}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40 min-h-[120px] resize-none"
            placeholder="Tell us about your experience, specialties, and what you're looking for on KingdomTap..."
            maxLength={maxBioLength}
          />
          <p className="text-sm text-white/50 mt-1 text-right">
            {bioCharCount}/{maxBioLength} characters
          </p>
        </div>
      </div>
    </div>
  );
}
