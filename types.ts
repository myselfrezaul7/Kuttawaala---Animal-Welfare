export interface Animal {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

// FIX: Added User type for authentication and community features.
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

// FIX: Added Post-related types for the community feature.
export interface PostAuthor {
  id: number;
  name: string;
}

export interface Comment {
    id: number;
    author: PostAuthor;
    text: string;
    timestamp: string;
}

export interface Post {
  id: number;
  author: PostAuthor;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

// FIX: Added Vet type for the online veterinarian consultation feature.
export interface Vet {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  isOnline: boolean;
}
