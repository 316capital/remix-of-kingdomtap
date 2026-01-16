import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

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

interface FeedPostProps {
  post: Post;
}

export function FeedPost({ post }: FeedPostProps) {
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 20) + 5);
  const [commentsCount, setCommentsCount] = useState(Math.floor(Math.random() * 10));
  const [sharesCount, setSharesCount] = useState(Math.floor(Math.random() * 5));
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      content: commentText.trim(),
      created_at: new Date().toISOString(),
      profiles: {
        full_name: 'You'
      }
    };

    setComments(prev => [...prev, newComment]);
    setCommentsCount(prev => prev + 1);
    setCommentText('');
    toast.success('Comment added!');
  };

  const handleShare = () => {
    setSharesCount(prev => prev + 1);
    toast.success('Post shared!');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        {post.profiles?.avatar_url ? (
          <img
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-medium text-sm">
            {getInitials(post.profiles?.full_name || 'User')}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{post.profiles?.full_name || 'Anonymous'}</h4>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
        {post.post_type === 'deal' && (
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            Deal
          </span>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Engagement Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
            isLiked
              ? 'text-red-500 bg-red-50'
              : 'text-muted-foreground hover:text-red-500 hover:bg-muted'
          }`}
        >
          <Heart 
            className="w-5 h-5" 
            fill={isLiked ? 'currentColor' : 'none'}
          />
          <span className="text-sm font-medium">{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{commentsCount}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">{sharesCount}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border px-4 py-3 bg-muted/30">
          {/* Existing Comments */}
          {comments.length > 0 && (
            <div className="space-y-3 mb-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-medium text-xs flex-shrink-0">
                    {getInitials(comment.profiles?.full_name || 'U')}
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-2">
                      <p className="font-medium text-sm text-foreground">{comment.profiles?.full_name}</p>
                      <p className="text-sm text-foreground">{comment.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded-full bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-foreground"
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="p-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
