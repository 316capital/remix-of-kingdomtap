import React, { useState } from 'react';
import { Home, MessageCircle, Briefcase, Users, LogOut, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { DealsFeed } from './DealsFeed';
import { MatchmakingView } from './MatchmakingView';
import { MessagesView } from './MessagesView';
import { ConnectionsView } from './ConnectionsView';
import logo from '../assets/kingdomtap-logo.png';

type Tab = 'feed' | 'matchmaking' | 'deals' | 'messages' | 'connections';

export function Dashboard() {
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('feed');

  if (!user) return null;

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-secondary shadow-lg sticky top-0 z-40 border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="KingdomTap" className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <div className="hidden md:block">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-secondary-foreground">{user.name}</p>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded">
                      {user.kingdomScore}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-secondary-foreground hover:text-primary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary md:hidden z-40">
        <div className="flex justify-around items-center h-16">
          <NavButton
            icon={<Home className="w-6 h-6" />}
            label="Feed"
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
          />
          <NavButton
            icon={<Users className="w-6 h-6" />}
            label="Match"
            active={activeTab === 'matchmaking'}
            onClick={() => setActiveTab('matchmaking')}
          />
          <NavButton
            icon={<Briefcase className="w-6 h-6" />}
            label="Deals"
            active={activeTab === 'deals'}
            onClick={() => setActiveTab('deals')}
          />
          <NavButton
            icon={<MessageCircle className="w-6 h-6" />}
            label="Messages"
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-4 mb-6">
          <TabButton
            label="Feed"
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
          />
          <TabButton
            label="Matchmaking"
            active={activeTab === 'matchmaking'}
            onClick={() => setActiveTab('matchmaking')}
          />
          <TabButton
            label="Deals"
            active={activeTab === 'deals'}
            onClick={() => setActiveTab('deals')}
          />
          <TabButton
            label="Messages"
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
          />
          <TabButton
            label="Connections"
            active={activeTab === 'connections'}
            onClick={() => setActiveTab('connections')}
          />
        </div>

        {/* Content */}
        <div>
          {activeTab === 'feed' && <DealsFeed />}
          {activeTab === 'matchmaking' && <MatchmakingView />}
          {activeTab === 'deals' && <DealsFeed />}
          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'connections' && <ConnectionsView />}
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-semibold transition-all ${
        active
          ? 'bg-primary text-primary-foreground shadow-gold-glow'
          : 'bg-card text-foreground hover:bg-muted border border-border'
      }`}
    >
      {label}
    </button>
  );
}
