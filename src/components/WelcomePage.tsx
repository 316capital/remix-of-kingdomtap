import React from 'react';
import { BookOpen, DollarSign, Users, TrendingUp, ArrowRight, ChevronDown, Briefcase, Landmark, Building2, Shield, Lock, Award, CheckCircle, Heart, Home } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import heroNetwork from '../assets/hero-network.png';
import { CustomerJourney } from './CustomerJourney';

export function WelcomePage() {
  const { setShowAuth } = useApp();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-secondary/95 backdrop-blur-xl shadow-card sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group">
              <BookOpen className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-semibold text-white tracking-tight">KingdomTap</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#benefits" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Solutions
              </a>
              <a href="#about" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                About
              </a>
              <a href="#resources" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Resources
              </a>
              <a href="#help" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                Support
              </a>
              <button
                onClick={() => setShowAuth(true)}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:shadow-primary transition-all font-medium"
              >
                Sign In
              </button>
            </div>
            <button
              onClick={() => setShowAuth(true)}
              className="md:hidden px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-24 md:py-40 overflow-hidden border-b border-white/5">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-dot-pattern bg-dot-pattern opacity-30"></div>
        
        {/* Animated Hero Image */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 w-[200%] h-full">
            <img 
              src={heroNetwork} 
              alt="Real Estate Network"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                animation: 'panRight 60s linear infinite'
              }}
            />
            <img 
              src={heroNetwork} 
              alt="Real Estate Network"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                animation: 'panRight 60s linear infinite',
                left: '100%'
              }}
            />
          </div>
        </div>
        
        <style>{`
          @keyframes panRight {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Real Estate Connections
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent font-extrabold">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-3xl mx-auto">
              Your next impactful connection is just a tap away. Join the professional network built for excellence.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full hover:border-primary/50 transition-colors">
                <span className="text-sm font-medium text-white">Exclusive Deals</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full hover:border-primary/50 transition-colors">
                <span className="text-sm font-medium text-white">Verified Network</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full hover:border-primary/50 transition-colors">
                <span className="text-sm font-medium text-white">Faster Closings</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowAuth(true)}
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-primary transition-all font-semibold text-base inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#about" className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-white/20 hover:border-primary/50 transition-all font-semibold text-base">
                Learn More
              </a>
            </div>
            <p className="mt-8 text-sm text-white/60">
              Trusted by 1,000+ real estate professionals
            </p>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="relative bg-background py-24 md:py-32 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Everything You Need to <span className="bg-gradient-primary bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade tools designed for real estate professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Find Deals"
              description="Access exclusive off-market opportunities from verified sources"
            />
            <FeatureCard
              icon={<DollarSign className="w-10 h-10 text-primary" />}
              title="Secure Funding"
              description="Connect with lenders that match your investment criteria"
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-primary" />}
              title="Grow Network"
              description="Build meaningful relationships with industry professionals"
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-primary" />}
              title="Scale Business"
              description="Leverage tools designed to accelerate your growth"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-hero py-20 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <StatCard
              value="100%"
              label="Verified Users"
              description="Multi-step verification process"
            />
            <StatCard
              value="1,000+"
              label="Active Members"
              description="Professional community"
            />
            <StatCard
              value="$50M+"
              label="Deals Closed"
              description="Platform transaction value"
            />
          </div>
        </div>
        </div>
      </section>

      {/* Who Uses Section */}
      <section id="benefits" className="relative bg-gradient-hero py-24 md:py-32 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6 tracking-tight">
            Built for Every <span className="bg-gradient-primary bg-clip-text text-transparent">Professional</span>
          </h2>
          <p className="text-center text-white/70 mb-20 text-lg">
            Tailored solutions for every role in real estate
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              icon={<TrendingUp className="w-10 h-10 text-primary" />}
              title="Investors"
              description="Access off-market opportunities and funding sources"
            />
            <RoleCard
              icon={<Landmark className="w-10 h-10 text-primary" />}
              title="Lenders"
              description="Connect with qualified borrowers efficiently"
            />
            <RoleCard
              icon={<Briefcase className="w-10 h-10 text-primary" />}
              title="Brokers"
              description="Expand your network and accelerate closings"
            />
            <RoleCard
              icon={<Building2 className="w-10 h-10 text-primary" />}
              title="Wholesalers"
              description="Reach cash buyers and close deals faster"
            />
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="relative bg-gradient-hero py-24 md:py-32 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Trust & <span className="bg-gradient-primary bg-clip-text text-transparent">Security</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              We maintain the highest standards of verification and security to ensure a trusted environment for all our users
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SecurityCard
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Identity Verification"
              description="Every user undergoes a thorough verification process"
            />
            <SecurityCard
              icon={<Lock className="w-8 h-8 text-primary" />}
              title="Secure Platform"
              description="Bank-level security to protect your data and transactions"
            />
            <SecurityCard
              icon={<Award className="w-8 h-8 text-primary" />}
              title="Professional Standards"
              description="High standards for all members of our community"
            />
            <SecurityCard
              icon={<CheckCircle className="w-8 h-8 text-primary" />}
              title="Verified Credentials"
              description="License and experience verification for professionals"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="relative bg-gradient-hero py-24 md:py-32 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Our <span className="bg-gradient-secondary bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-4xl mx-auto">
              At KingdomTap, we believe in the power of meaningful connections to transform the real estate landscape. Our faith-driven mission inspires us to create a platform that not only fosters successful deals but also contributes to building homes for those in need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ValueCard
              icon={<Heart className="w-8 h-8 text-primary" />}
              title="Integrity"
              description="Trust is the foundation of every connection we build."
            />
            <ValueCard
              icon={<Users className="w-8 h-8 text-primary" />}
              title="Community"
              description="We foster a supportive and engaging environment."
            />
            <ValueCard
              icon={<TrendingUp className="w-8 h-8 text-primary" />}
              title="Growth"
              description="We empower our users to grow their networks and their investments."
            />
            <ValueCard
              icon={<Home className="w-8 h-8 text-primary" />}
              title="Impact"
              description="A portion of our profits goes towards housing initiatives for the homeless."
            />
          </div>
        </div>
      </section>

      {/* Customer Journey Section */}
      <CustomerJourney />

      {/* Footer */}
      <footer className="bg-secondary/95 backdrop-blur-xl text-white py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold tracking-tight">KingdomTap</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Empowering real estate professionals to connect, collaborate, and grow
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold mb-2 tracking-tight">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#benefits" className="text-white/60 hover:text-primary transition-colors text-xs">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/60 hover:text-primary transition-colors text-xs">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/60 hover:text-primary transition-colors text-xs">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold mb-2 tracking-tight">Support</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#help" className="text-white/60 hover:text-primary transition-colors text-xs">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/60 hover:text-primary transition-colors text-xs">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold mb-2 tracking-tight">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#privacy" className="text-white/60 hover:text-primary transition-colors text-xs">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-white/60 hover:text-primary transition-colors text-xs">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-white/50 text-xs">
              © 2024 KingdomTap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative bg-card/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-glow hover:border-primary/50 transition-all group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <div className="relative z-10">
        <div className="mb-6 group-hover:scale-110 transition-transform">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label, description }: { value: string; label: string; description: string }) {
  return (
    <div>
      <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3 tracking-tight">{value}</div>
      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{label}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}

function RoleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-glow hover:border-primary/50 transition-all group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <div className="relative z-10">
        <div className="mb-6 group-hover:scale-110 transition-transform">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-glow hover:border-primary/50 transition-all group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <div className="relative z-10">
        <div className="mb-6 group-hover:scale-110 transition-transform">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:shadow-glow hover:border-primary/50 transition-all group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <div className="relative z-10">
        <div className="mb-6 group-hover:scale-110 transition-transform">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
