import React from 'react';
import { X, MapPin, DollarSign, Building2, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface DealFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    locations: string[];
    propertyTypes: string[];
    priceRange: { min: number; max: number };
    minROI: number;
  };
  onFilterChange: (filters: any) => void;
}

export function DealFilters({ isOpen, onClose, filters, onFilterChange }: DealFiltersProps) {
  if (!isOpen) return null;

  const locationOptions = ['Miami, FL', 'Orlando, FL', 'Tampa, FL', 'Jacksonville, FL'];
  const propertyTypeOptions = ['Condo', 'Multi-Family', 'Commercial', 'Single Family', 'Land'];

  const toggleFilter = (category: 'locations' | 'propertyTypes', value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filter Deals</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
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
              <Building2 className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Property Type</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {propertyTypeOptions.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('propertyTypes', type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.propertyTypes.includes(type)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Price Range</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-foreground">Minimum ROI: {filters.minROI}%</label>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={filters.minROI}
              onChange={(e) => onFilterChange({ ...filters, minROI: Number(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onFilterChange({
              locations: [],
              propertyTypes: [],
              priceRange: { min: 0, max: 0 },
              minROI: 0
            })}
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
