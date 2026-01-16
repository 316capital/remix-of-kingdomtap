import React from 'react';
import { Shield, CheckCircle, FileText, Linkedin } from 'lucide-react';

interface VerificationProps {
  licenseNumber: string;
  setLicenseNumber: (value: string) => void;
  licenseState: string;
  setLicenseState: (value: string) => void;
}

export function Verification({
  licenseNumber,
  setLicenseNumber,
  licenseState,
  setLicenseState
}: VerificationProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">Verification</h2>
      <p className="text-white/70 mb-8">Increase your credibility by verifying your professional credentials</p>

      <div className="space-y-6">
        {/* LinkedIn Verification */}
        <div className="bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-[#0077B5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-6 h-6 text-[#0077B5]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn Verification</h3>
              <p className="text-white/60 text-sm mb-4">
                Connect your LinkedIn profile to verify your professional identity and import your experience.
              </p>
              <button
                type="button"
                className="px-6 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all font-semibold inline-flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                Connect LinkedIn (Coming Soon)
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <CheckCircle className="w-4 h-4" />
            <span>Automatically imports your professional experience</span>
          </div>
        </div>

        {/* License Verification */}
        <div className="bg-black/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">License Verification</h3>
              <p className="text-white/60 text-sm mb-4">
                Verify your professional license to build trust and stand out to potential connections.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                License Number (Optional)
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="e.g., BK1234567 or NMLS123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                License State (Optional)
              </label>
              <input
                type="text"
                value={licenseState}
                onChange={(e) => setLicenseState(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/40"
                placeholder="FL"
                maxLength={2}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/50 mt-4">
            <Shield className="w-4 h-4" />
            <span>Increases your KingdomScore and match priority</span>
          </div>
        </div>

        <p className="text-center text-white/50 text-sm">
          You can skip this step and verify your credentials later in settings
        </p>
      </div>
    </div>
  );
}
