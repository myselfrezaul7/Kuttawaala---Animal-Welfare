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
    isError?: boolean;
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

// FIX: Re-added Vet type to resolve compilation errors for the Online Vet feature, which appears to be deprecated but its component files remain.
export interface Vet {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  isOnline: boolean;
}

// FIX: Replaced the Vet type with VetClinic for the new "Find a Vet" directory.
export interface VetClinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  website?: string;
  mapUrl: string;
  hours: string;
}


// FIX: Added SuccessStory type for the homepage.
export interface SuccessStory {
  id: number;
  name: string;
  imageUrl: string;
  story: string;
}