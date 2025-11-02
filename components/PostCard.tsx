import React from 'react';
import type { Post } from '../types';
import { UserIcon, ThumbsUpIcon, ChatBubbleIcon } from './icons';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {

  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  }

  return (
    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-slate-700/50 flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-7 h-7 text-slate-800 dark:text-slate-200" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-50 text-lg">{post.author.name}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{timeSince(post.timestamp)}</p>
          </div>
        </div>
        <p className="text-slate-800 dark:text-slate-200 text-base mb-4 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.imageUrl && (
        <div className="bg-black/10">
          <img src={post.imageUrl} alt="Post content" className="w-full max-h-[500px] object-cover" />
        </div>
      )}

      <div className="px-6 py-3 border-t border-white/30 dark:border-white/10 flex justify-around">
        <button className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors rounded-lg px-4 py-2 hover:bg-white/20 dark:hover:bg-black/20">
          <ThumbsUpIcon className="w-5 h-5" />
          <span>Like ({post.likes})</span>
        </button>
        <button className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors rounded-lg px-4 py-2 hover:bg-white/20 dark:hover:bg-black/20">
          <ChatBubbleIcon className="w-5 h-5" />
          <span>Comment ({post.comments.length})</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;