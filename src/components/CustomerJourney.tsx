import React from 'react';
import { Search, Users, Handshake, TrendingUp, ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface JourneyStage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

const journeyStages: JourneyStage[] = [
  {
    id: 'discovery',
    icon: <Search className="w-6 h-6" />,
    title: 'Discovery',
    subtitle: 'Find Your Opportunity',
    description: 'Access exclusive off-market deals and connect with verified professionals.',
    cta: 'Explore Properties'
  },
  {
    id: 'engagement',
    icon: <Users className="w-6 h-6" />,
    title: 'Engagement',
    subtitle: 'Build Relationships',
    description: 'Engage with industry professionals and expand your network.',
    cta: 'Connect with Advisors'
  },
  {
    id: 'transaction',
    icon: <Handshake className="w-6 h-6" />,
    title: 'Transaction',
    subtitle: 'Close with Confidence',
    description: 'Secure funding and manage transactions seamlessly.',
    cta: 'Join Syndication'
  },
  {
    id: 'growth',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Growth',
    subtitle: 'Scale Your Portfolio',
    description: 'Leverage analytics and automate processes to grow exponentially.',
    cta: 'Start Growing'
  }
];

export function CustomerJourney() {
  const { setShowAuth } = useApp();

  return (
    <section className="relative bg-gradient-hero py-24 md:py-32 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Journey Starts Here</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            From Discovery to <span className="bg-gradient-primary bg-clip-text text-transparent">Growth</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience a seamless journey through the KingdomTap ecosystem
          </p>
        </div>

        {/* Diagonal Journey Flow */}
        <div className="relative max-w-6xl mx-auto">
          {journeyStages.map((stage, index) => (
            <div key={stage.id} className="relative mb-24 last:mb-0">
              {/* Journey Card */}
              <div 
                className={`relative ${
                  index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                } max-w-lg mx-auto md:mx-0`}
                style={{
                  marginLeft: index % 2 === 0 ? `${index * 60}px` : 'auto',
                  marginRight: index % 2 === 1 ? `${index * 60}px` : 'auto'
                }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-glow hover:border-primary/50 transition-all group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-primary/20">
                          {stage.icon}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Step {index + 1}</span>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{stage.title}</h3>
                        </div>
                      </div>
                      
                      {/* Stage Indicator */}
                      <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                        <span className="text-lg font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-white mb-3">{stage.subtitle}</h4>
                    <p className="text-white/70 text-base mb-6 leading-relaxed">{stage.description}</p>

                    <button
                      onClick={() => setShowAuth(true)}
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-sm"
                    >
                      {stage.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Connecting Flow Line */}
              {index < journeyStages.length - 1 && (
                <>
                  {/* Desktop - Elegant curved flow */}
                  <div className="hidden md:block absolute left-1/2 top-full w-96 h-24 -translate-x-1/2">
                    <svg 
                      className="w-full h-full" 
                      viewBox="0 0 400 100"
                      style={{
                        transform: index % 2 === 0 ? 'translateX(-20%)' : 'translateX(20%)'
                      }}
                    >
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id={`glow-${index}`}>
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Glow background line */}
                      <path
                        d={index % 2 === 0 
                          ? "M 100 20 Q 200 50, 300 85"
                          : "M 300 20 Q 200 50, 100 85"
                        }
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.4"
                        filter={`url(#glow-${index})`}
                      />
                      
                      {/* Main line with gradient */}
                      <path
                        d={index % 2 === 0 
                          ? "M 100 20 Q 200 50, 300 85"
                          : "M 300 20 Q 200 50, 100 85"
                        }
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="8 4"
                        opacity="0.9"
                      />
                      
                      {/* Arrow head - filled triangle */}
                      <path
                        d={index % 2 === 0
                          ? "M 300 85 L 290 78 L 294 88 Z"
                          : "M 100 85 L 110 78 L 106 88 Z"
                        }
                        fill="hsl(var(--primary))"
                        opacity="0.9"
                      />
                      
                      {/* Animated glowing orb */}
                      <circle r="4" fill="hsl(var(--primary))" filter={`url(#glow-${index})`}>
                        <animateMotion
                          dur="3s"
                          repeatCount="indefinite"
                          path={index % 2 === 0 
                            ? "M 100 20 Q 200 50, 300 85"
                            : "M 300 20 Q 200 50, 100 85"
                          }
                        />
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>

                  {/* Mobile - Elegant vertical flow */}
                  <div className="md:hidden flex justify-center my-8">
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/60 to-primary/20"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                        <MoveRight className="w-5 h-5 text-primary rotate-90" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xl">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Begin Your Journey?</h3>
            <p className="text-white/70 text-sm mb-4">
              Join thousands of professionals transforming their real estate business
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="group px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:shadow-primary transition-all font-semibold inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
