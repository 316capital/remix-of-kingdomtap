export type UserRole = 'investor' | 'lender' | 'broker' | 'wholesaler';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  experience: string;
  goals: string[];
  verified: boolean;
  linkedInVerified: boolean;
  licenseNumber?: string; // MLS/NMLS number for brokers/lenders
  brokerLicense?: string; // Broker license number
  brokerLicenseState?: string; // State where broker is licensed
  nmlsNumber?: string; // NMLS number for lenders
  companyName?: string; // Company name for professionals
  approvalStatus: ApprovalStatus;
  kingdomScore: number;
  dealsCompleted: number;
  totalDealVolume: number;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Deal {
  id: string;
  userId: string;
  title: string;
  price: number;
  location: string;
  propertyType: string;
  roi: number;
  description: string;
  images: string[];
  createdAt: Date;
}

export interface OnboardingData {
  role: UserRole;
  fullName: string;
  phone?: string;
  companyName?: string;
  yearsExperience: string;
  bio?: string;
  location: string;
  propertyTypes: string[];
  dealSizeMin?: string;
  dealSizeMax?: string;
  roleData: Record<string, string | string[]>;
  experience: string;
  goals: string[];
  brokerLicense?: string;
  brokerLicenseState?: string;
  nmlsNumber?: string;
}
