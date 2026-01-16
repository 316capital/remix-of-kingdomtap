import React, { useState } from 'react';
import { X, User, Bell, Lock, Shield, UserCog, Mail, MapPin, Briefcase, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { UserRole } from '@/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, setUser } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: user?.experience || ''
  });

  // Role change request state
  const [roleChangeData, setRoleChangeData] = useState({
    requestedRole: user?.role || 'investor' as UserRole,
    reason: '',
    companyName: user?.companyName || '',
    brokerLicense: user?.brokerLicense || '',
    brokerLicenseState: user?.brokerLicenseState || '',
    nmlsNumber: user?.nmlsNumber || ''
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dealAlerts: true,
    matchNotifications: true,
    messageNotifications: true,
    weeklyDigest: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    showDeals: true
  });

  if (!isOpen || !user) return null;

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        name: profileData.name,
        email: profileData.email,
        location: profileData.location,
        experience: profileData.bio
      });
      toast.success('Profile updated successfully');
      setIsSaving(false);
    }, 500);
  };

  const handleRoleChangeRequest = () => {
    if (!roleChangeData.reason.trim()) {
      toast.error('Please provide a reason for the role change');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      toast.success('Role change request submitted for approval');
      setRoleChangeData({ ...roleChangeData, reason: '' });
      setIsSaving(false);
    }, 500);
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Notification preferences updated');
      setIsSaving(false);
    }, 300);
  };

  const handleSavePrivacy = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Privacy settings updated');
      setIsSaving(false);
    }, 300);
  };

  const roleLabels: Record<UserRole, string> = {
    investor: 'Investor',
    lender: 'Lender',
    broker: 'Broker',
    wholesaler: 'Wholesaler'
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="p-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="role">
              <UserCog className="w-4 h-4 mr-2" />
              Role
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="City, State"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4" />
                Bio / Experience
              </Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell us about your experience..."
                className="min-h-[100px]"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </TabsContent>

          {/* Role Change Tab */}
          <TabsContent value="role" className="space-y-4">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Current Role</span>
                <Badge variant="secondary">{roleLabels[user.role]}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Role changes require admin approval and may take 1-2 business days
              </p>
            </div>

            <div>
              <Label htmlFor="requestedRole" className="mb-2 block">Request New Role</Label>
              <select
                id="requestedRole"
                value={roleChangeData.requestedRole}
                onChange={(e) => setRoleChangeData({ ...roleChangeData, requestedRole: e.target.value as UserRole })}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-foreground"
              >
                <option value="investor">Investor</option>
                <option value="lender">Lender</option>
                <option value="broker">Broker</option>
                <option value="wholesaler">Wholesaler</option>
              </select>
            </div>

            {/* Conditional credential fields */}
            {(roleChangeData.requestedRole === 'broker' || roleChangeData.requestedRole === 'lender') && (
              <>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={roleChangeData.companyName}
                    onChange={(e) => setRoleChangeData({ ...roleChangeData, companyName: e.target.value })}
                    placeholder="Your Company LLC"
                  />
                </div>

                {roleChangeData.requestedRole === 'broker' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brokerLicense">Broker License #</Label>
                        <Input
                          id="brokerLicense"
                          value={roleChangeData.brokerLicense}
                          onChange={(e) => setRoleChangeData({ ...roleChangeData, brokerLicense: e.target.value })}
                          placeholder="BK123456"
                        />
                      </div>
                      <div>
                        <Label htmlFor="brokerLicenseState">License State</Label>
                        <Input
                          id="brokerLicenseState"
                          value={roleChangeData.brokerLicenseState}
                          onChange={(e) => setRoleChangeData({ ...roleChangeData, brokerLicenseState: e.target.value })}
                          placeholder="CA"
                        />
                      </div>
                    </div>
                  </>
                )}

                {roleChangeData.requestedRole === 'lender' && (
                  <div>
                    <Label htmlFor="nmlsNumber">NMLS Number</Label>
                    <Input
                      id="nmlsNumber"
                      value={roleChangeData.nmlsNumber}
                      onChange={(e) => setRoleChangeData({ ...roleChangeData, nmlsNumber: e.target.value })}
                      placeholder="123456"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <Label htmlFor="reason" className="mb-2 block">Reason for Role Change *</Label>
              <Textarea
                id="reason"
                value={roleChangeData.reason}
                onChange={(e) => setRoleChangeData({ ...roleChangeData, reason: e.target.value })}
                placeholder="Explain why you're requesting this role change..."
                className="min-h-[100px]"
              />
            </div>

            <button
              onClick={handleRoleChangeRequest}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              <UserCog className="w-4 h-4" />
              {isSaving ? 'Submitting...' : 'Submit Role Change Request'}
            </button>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Deal Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about new deals matching your criteria</p>
                </div>
                <Switch
                  checked={notifications.dealAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, dealAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Match Notifications</p>
                  <p className="text-sm text-muted-foreground">When someone matches with you</p>
                </div>
                <Switch
                  checked={notifications.matchNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, matchNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Message Notifications</p>
                  <p className="text-sm text-muted-foreground">When you receive new messages</p>
                </div>
                <Switch
                  checked={notifications.messageNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, messageNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">Summary of activity and opportunities</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                />
              </div>
            </div>

            <button
              onClick={handleSaveNotifications}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Profile Visibility</p>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                </div>
                <Switch
                  checked={privacy.profileVisibility}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisibility: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Show Email</p>
                  <p className="text-sm text-muted-foreground">Display email on your public profile</p>
                </div>
                <Switch
                  checked={privacy.showEmail}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Show Phone</p>
                  <p className="text-sm text-muted-foreground">Display phone number on your public profile</p>
                </div>
                <Switch
                  checked={privacy.showPhone}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Show Deals</p>
                  <p className="text-sm text-muted-foreground">Display your posted deals publicly</p>
                </div>
                <Switch
                  checked={privacy.showDeals}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showDeals: checked })}
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Data & Privacy</p>
                    <p className="text-sm text-muted-foreground">
                      Your data is encrypted and secure. We never share your information with third parties without your consent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSavePrivacy}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
