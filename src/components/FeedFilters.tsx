import React from 'react';
import { TrendingUp, Building2, Users, MessageSquare } from 'lucide-react';

interface FeedFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  const filters = [
    { id: 'all', label: 'All', icon: TrendingUp },
    { id: 'deals', label: 'Deals', icon: Building2 },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all hover:scale-105 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-foreground hover:bg-muted hover:text-primary border border-border'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
