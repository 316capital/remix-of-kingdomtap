import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Image, Video } from 'lucide-react';
import { toast } from 'sonner';

interface PostComposerProps {
  onPostCreated?: () => void;
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const { user } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if (!content.trim() || !user) return;

    setIsPosting(true);
    setTimeout(() => {
      toast.success('Post created successfully!');
      setContent('');
      setIsExpanded(false);
      onPostCreated?.();
      setIsPosting(false);
    }, 500);
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
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-medium text-sm">
              {getInitials(user?.name || 'U')}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left px-4 py-3 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground"
            >
              What's on your mind?
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none min-h-[100px] text-foreground placeholder:text-muted-foreground"
                autoFocus
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-accent"
                    title="Add image"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-accent"
                    title="Add video"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={!content.trim() || isPosting}
                    className="px-6 py-2 rounded-lg text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isPosting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
