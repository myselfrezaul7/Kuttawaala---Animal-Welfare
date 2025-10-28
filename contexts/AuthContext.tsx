import React, { createContext, useState, useContext, useEffect } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

// For demonstration purposes, we'll use localStorage to simulate a user database.
// In a real application, this would be handled by a backend server.

const USERS_STORAGE_KEY = 'kuttawaala_users';
const CURRENT_USER_STORAGE_KEY = 'kuttawaala_currentUser';

const getInitialUsers = (): User[] => {
  try {
    const users = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (users) {
      return JSON.parse(users);
    } else {
      // If no users, initialize with mock data
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
  } catch (error) {
    console.error("Error reading users from localStorage", error);
    return MOCK_USERS;
  }
};

const getInitialCurrentUser = (): User | null => {
    try {
        const user = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error reading current user from localStorage", error);
        return null;
    }
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getInitialCurrentUser);

  useEffect(() => {
    try {
        if(currentUser) {
            window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
        } else {
            window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        }
    } catch (error) {
        console.error("Error writing current user to localStorage", error);
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<User> => {
    const users = getInitialUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return userWithoutPassword;
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = async (name: string, email: string, password: string): Promise<User> => {
    const users = getInitialUsers();
    if (users.some(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }
    const newUser: User = { id: Date.now(), name, email, password };
    const updatedUsers = [...users, newUser];
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
