import React, { useEffect, useRef } from 'react';
import { Settings, LogOut, Camera, Star, Trophy } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ProfileMenuProps {
  onClose: () => void;
  onOpenSettings: () => void;
}

export function ProfileMenu({ onClose, onOpenSettings }: ProfileMenuProps) {
  const { user, setUser } = useApp();
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!user) return null;

  const level = Math.floor(user.kingdomScore / 300);
  const progressToNextLevel = (user.kingdomScore % 300) / 300;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app, upload to server here
        console.log('Upload photo:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    onClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
      <div 
        ref={menuRef}
        className="absolute top-full right-0 mt-2 w-72 bg-card rounded-xl shadow-lg border border-border z-50 overflow-hidden animate-scale-in"
      >
        {/* Header with Profile Photo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold ring-2 ring-border">
                  {getInitials(user.name)}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-accent hover:bg-accent/90 rounded-full transition-colors shadow-md"
                aria-label="Change profile photo"
              >
                <Camera className="w-3 h-3 text-accent-foreground" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              
              {/* KingdomScore Compact Display */}
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-accent" fill="currentColor" />
                    <span className="text-xs font-medium text-foreground">Level {level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-semibold text-accent">{user.kingdomScore}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {Math.round(progressToNextLevel * 100)}% to Level {level + 1}
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={() => {
            onOpenSettings();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-muted transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
