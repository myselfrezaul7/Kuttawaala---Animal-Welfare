import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_POSTS } from '../constants';
import type { Post } from '../types';

const POSTS_STORAGE_KEY = 'kuttawaala_posts';

const getInitialPosts = (): Post[] => {
  try {
    const posts = window.localStorage.getItem(POSTS_STORAGE_KEY);
    if (posts) {
      return JSON.parse(posts);
    } else {
      // If no posts, initialize with mock data
      window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(MOCK_POSTS));
      return MOCK_POSTS;
    }
  } catch (error) {
    console.error("Error reading posts from localStorage", error);
    return MOCK_POSTS;
  }
};

const CommunityPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>(getInitialPosts);

  useEffect(() => {
    try {
        window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error("Error writing posts to localStorage", error);
    }
  }, [posts]);

  const handleAddPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">Community Hub</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          Share stories, ask questions, and connect with fellow animal lovers.
        </p>
      </div>

      {isAuthenticated ? (
        <CreatePostForm onAddPost={handleAddPost} />
      ) : (
        <div className="bg-orange-50 dark:bg-slate-800 border-l-4 border-orange-500 dark:border-orange-500/50 text-orange-800 dark:text-orange-200 p-6 rounded-r-lg mb-8 text-center">
          <p className="font-bold text-lg">Want to join the conversation?</p>
          <p className="mt-2">
            <Link to="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Log in</Link> or <Link to="/signup" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">sign up</Link> to create your own posts.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;