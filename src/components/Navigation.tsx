import React, { useState } from 'react';
import { Home, Search, Building2, FileText, MessageCircle, User, Bell, Plus, Star, Trophy, Menu, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ProfileMenu } from './ProfileMenu';
import { CreateDealModal } from './CreateDealModal';
import { SettingsModal } from './SettingsModal';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  if (!user) return null;

  const level = Math.floor(user.kingdomScore / 300);
  const progressToNextLevel = (user.kingdomScore % 300) / 300;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'post', label: 'Post Deal', icon: Building2 },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'network', label: 'Network', icon: User },
  ];

  const unreadCount = 3; // Mock notification count

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
            {/* Left Section - Logo & Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <button 
                onClick={() => onTabChange('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
              >
                <Building2 className="w-8 h-8 text-primary" />
                <span className="hidden sm:block text-lg font-semibold text-foreground tracking-tight">
                  KingdomTap
                </span>
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search Kingdom Tap..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Center - Navigation Icons */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`relative p-3 rounded-lg transition-all ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Section - KingdomScore, Actions & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* KingdomScore - Desktop */}
              <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-accent border border-border rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" fill="currentColor" />
                  <span className="text-xs font-medium text-foreground">Lvl {level}</span>
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progressToNextLevel * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">{user.kingdomScore}</span>
                </div>
              </div>

              {/* Add Deal Button */}
              <button 
                onClick={() => setShowDealModal(true)}
                className="p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all hover:scale-105 shadow-md"
                title="Create Post or Deal"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Notification Bell */}
              <button className="hidden sm:flex relative p-2 text-muted-foreground hover:bg-accent/10 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-border"
                  />
                </button>
                
              {showProfileMenu && (
                <ProfileMenu 
                  onClose={() => setShowProfileMenu(false)}
                  onOpenSettings={() => setShowSettings(true)}
                />
              )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:bg-accent/10 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden border-t border-border bg-card py-4 absolute left-0 right-0 z-50 shadow-lg">
              <div className="flex flex-col space-y-1 px-4">
                {/* Mobile Search */}
                <div className="mb-3 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Mobile KingdomScore */}
                <div className="mb-3 p-3 bg-gradient-gold rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-secondary" fill="currentColor" />
                      <span className="text-sm font-semibold text-secondary">Level {level}</span>
                      <div className="w-20 h-2 bg-secondary/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full transition-all"
                          style={{ width: `${progressToNextLevel * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-semibold text-secondary">{user.kingdomScore}</span>
                    </div>
                  </div>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'text-primary bg-accent/10'
                          : 'text-foreground hover:bg-accent/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Mobile Notifications */}
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent/5 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
      
      {/* Deal Modal */}
      <CreateDealModal 
        isOpen={showDealModal} 
        onClose={() => setShowDealModal(false)} 
      />
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
}
