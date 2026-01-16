import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FeedPost } from './FeedPost';

interface HomeFeedProps {
  filter?: string;
  searchQuery?: string;
  refreshKey?: number;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  post_type: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

const mockPosts: Post[] = [
  {
    id: '1',
    user_id: 'user-1',
    content: 'Just closed on a fantastic multi-family property in downtown Miami! 15% ROI projected. Who else is investing in South Florida?',
    post_type: 'post',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Sarah Johnson',
      avatar_url: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=5BB5D1&color=fff'
    }
  },
  {
    id: '2',
    user_id: 'user-2',
    content: 'Looking for a hard money lender for a fix & flip in Orlando. Property is already under contract. Anyone interested?',
    post_type: 'deal',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Mike Chen',
      avatar_url: 'https://ui-avatars.com/api/?name=Mike+Chen&background=FFC107&color=000'
    }
  },
  {
    id: '3',
    user_id: 'user-3',
    content: 'Market update: Tampa Bay area seeing 12% appreciation YoY. Great time to invest in commercial real estate here!',
    post_type: 'post',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Alex Rodriguez',
      avatar_url: 'https://ui-avatars.com/api/?name=Alex+Rodriguez&background=0A3D62&color=fff'
    }
  }
];

export function HomeFeed({ filter = 'all', searchQuery = '' }: HomeFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery
      ? post.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesFilter = 
      filter === 'all' || 
      (filter === 'deals' && post.post_type === 'deal');

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No posts yet</p>
        <p className="text-muted-foreground text-sm mt-2">
          Be the first to share something!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
