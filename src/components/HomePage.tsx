import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { UserProgress } from './UserProgress';
import { SearchBar } from './SearchBar';
import { PostComposer } from './PostComposer';
import { MatchmakingBanner } from './MatchmakingBanner';
import { FeedFilters } from './FeedFilters';
import { HomeFeed } from './HomeFeed';
import { RoleBasedCTA } from './RoleBasedCTA';
import { MatchmakingView } from './MatchmakingView';
import { MessagesView } from './MessagesView';
import { ConnectionsView } from './ConnectionsView';
import { DealsFeed } from './DealsFeed';

export function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedRefresh, setFeedRefresh] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <PostComposer onPostCreated={() => setFeedRefresh(prev => prev + 1)} />
            <MatchmakingBanner onStartMatching={() => setActiveTab('discover')} />
            <FeedFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <HomeFeed filter={activeFilter} searchQuery={searchQuery} refreshKey={feedRefresh} />
            <RoleBasedCTA onAction={() => setActiveTab('post')} />
          </div>
        );
      case 'discover':
        return <MatchmakingView />;
      case 'post':
        return <DealsFeed />;
      case 'records':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Public Records Search</h2>
            <p className="text-muted-foreground">Coming soon - Access property records and analytics</p>
          </div>
        );
      case 'messages':
        return <MessagesView />;
      case 'network':
        return <ConnectionsView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>
    </div>
  );
}
