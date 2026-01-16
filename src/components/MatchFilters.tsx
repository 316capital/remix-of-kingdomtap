import React from 'react';
import { X, MapPin, Award, Target } from 'lucide-react';
import { UserRole } from '../types';
import { Button } from './ui/button';

interface MatchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    roles: UserRole[];
    locations: string[];
    experience: string[];
    goals: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function MatchFilters({ isOpen, onClose, filters, onFilterChange }: MatchFiltersProps) {
  if (!isOpen) return null;

  const roleOptions: UserRole[] = ['investor', 'lender', 'broker', 'wholesaler'];
  const locationOptions = ['Miami, FL', 'Orlando, FL', 'Tampa, FL', 'Jacksonville, FL'];
  const experienceOptions = ['0-2 years', '3-5 years', '5-10 years', '10+ years'];
  const goalOptions = ['Fix & Flip', 'Buy & Hold', 'Commercial', 'Luxury Properties', 'Wholesaling'];

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filter Matches</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Role</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map(role => (
                <button
                  key={role}
                  onClick={() => toggleFilter('roles', role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    filters.roles.includes(role)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Location</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {locationOptions.map(location => (
                <button
                  key={location}
                  onClick={() => toggleFilter('locations', location)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.locations.includes(location)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Experience</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceOptions.map(exp => (
                <button
                  key={exp}
                  onClick={() => toggleFilter('experience', exp)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.experience.includes(exp)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Goals</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleFilter('goals', goal)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.goals.includes(goal)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onFilterChange({ roles: [], locations: [], experience: [], goals: [] })}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button onClick={onClose} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
