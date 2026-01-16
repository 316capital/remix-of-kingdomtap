import type { User, Deal } from '../types';

export const mockUser: User = {
  id: 'current-user',
  role: 'investor',
  name: 'John Doe',
  email: 'john@example.com',
  location: 'Miami, FL',
  experience: '5-10 years',
  goals: ['Fix & Flip', 'Buy & Hold'],
  verified: true,
  linkedInVerified: true,
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0A3D62&color=fff',
  approvalStatus: 'approved',
  kingdomScore: 850,
  dealsCompleted: 12,
  totalDealVolume: 2400000
};

export const mockDeals: Deal[] = [
  {
    id: '1',
    userId: 'user-1',
    title: 'Luxury Condo in Downtown Miami',
    price: 450000,
    location: 'Miami, FL',
    propertyType: 'Condo',
    roi: 12,
    description: 'Premium waterfront property with stunning ocean views',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: 'user-2',
    title: 'Multi-Family Investment Property',
    price: 850000,
    location: 'Orlando, FL',
    propertyType: 'Multi-Family',
    roi: 15,
    description: 'Fully occupied 8-unit building with strong cash flow',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'],
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    userId: 'user-3',
    title: 'Commercial Office Space',
    price: 1200000,
    location: 'Tampa, FL',
    propertyType: 'Commercial',
    roi: 10,
    description: 'Prime location in growing business district',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    createdAt: new Date('2024-01-25')
  }
];

export const mockMatches: User[] = [
  {
    id: 'match-1',
    role: 'lender',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    location: 'Miami, FL',
    experience: '10+ years',
    goals: ['Commercial Lending', 'Fix & Flip Financing'],
    verified: true,
    linkedInVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=5BB5D1&color=fff',
    nmlsNumber: 'NMLS123456',
    companyName: 'Capital Lending Group',
    approvalStatus: 'approved',
    kingdomScore: 920,
    dealsCompleted: 45,
    totalDealVolume: 15000000
  },
  {
    id: 'match-2',
    role: 'broker',
    name: 'Mike Chen',
    email: 'mike@example.com',
    location: 'Orlando, FL',
    experience: '5-10 years',
    goals: ['Luxury Properties', 'Investment Sales'],
    verified: true,
    linkedInVerified: false,
    avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=FFC107&color=000',
    brokerLicense: 'BK3456789',
    brokerLicenseState: 'FL',
    companyName: 'Premier Realty',
    approvalStatus: 'approved',
    kingdomScore: 780,
    dealsCompleted: 28,
    totalDealVolume: 8500000
  }
];
