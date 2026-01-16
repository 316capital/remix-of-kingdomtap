import React, { useState } from 'react';
import { MapPin, TrendingUp, DollarSign, SlidersHorizontal } from 'lucide-react';
import { mockDeals } from '../lib/mockData';
import { DealFilters } from './DealFilters';
import { Button } from './ui/button';

export function DealsFeed() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    locations: [],
    propertyTypes: [],
    priceRange: { min: 0, max: 0 },
    minROI: 0
  });

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-foreground">Exclusive Deals</h2>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        <p className="text-muted-foreground">Discover off-market investment opportunities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDeals.map((deal) => (
          <div key={deal.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
            <img
              src={deal.images[0]}
              alt={deal.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-foreground mb-3">{deal.title}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{deal.location}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold text-foreground">
                    ${deal.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{deal.roi}% ROI</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{deal.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground capitalize">{deal.propertyType}</span>
                <Button size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DealFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}
