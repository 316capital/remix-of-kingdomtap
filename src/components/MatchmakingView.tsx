import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, MapPin, Award, Linkedin, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { mockMatches } from '../lib/mockData';
import { MatchFilters } from './MatchFilters';
import { Button } from './ui/button';

export function MatchmakingView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    roles: [],
    locations: [],
    experience: [],
    goals: []
  });
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentMatch = mockMatches[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < mockMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart !== null) {
      setDragOffset(clientX - dragStart);
    }
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      handleSwipe(dragOffset > 0 ? 'right' : 'left');
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const resetMatches = () => {
    setCurrentIndex(0);
  };

  if (!currentMatch) return null;

  return (
    <div className="max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Find Your Match</h2>
          <p className="text-muted-foreground text-sm">Swipe to connect with professionals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={resetMatches}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[500px] mb-6">
        <div
          ref={cardRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => dragStart !== null && handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => dragStart !== null && handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
            transition: dragStart === null ? 'transform 0.3s ease-out' : 'none'
          }}
          className="bg-card rounded-2xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing select-none h-full"
        >
          <div className="relative h-56">
            <img
              src={currentMatch.avatar}
              alt={currentMatch.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white">{currentMatch.name}</h3>
                {currentMatch.verified && (
                  <div className="bg-primary p-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-white/90 capitalize">{currentMatch.role}</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{currentMatch.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{currentMatch.experience}</span>
              </div>
            </div>

            {currentMatch.licenseNumber && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  License: <span className="font-semibold text-foreground">{currentMatch.licenseNumber}</span>
                </p>
              </div>
            )}

            {currentMatch.linkedInVerified && (
              <div className="flex items-center gap-2 text-primary">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn Verified</span>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Goals & Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentMatch.goals.map((goal, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          onClick={() => handleSwipe('left')}
          variant="outline"
          size="lg"
          className="flex-1 h-14"
        >
          <XCircle className="w-5 h-5 mr-2" />
          Pass
        </Button>
        <Button
          onClick={() => handleSwipe('right')}
          size="lg"
          className="flex-1 h-14"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Connect
        </Button>
      </div>

      <p className="text-center text-muted-foreground text-sm">
        {currentIndex + 1} of {mockMatches.length} matches
      </p>

      <MatchFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}
