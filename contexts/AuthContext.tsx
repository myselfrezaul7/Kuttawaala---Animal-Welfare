import * as React from 'react';
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

// --- SECURITY WARNING ---
// This is a MOCK authentication system for demonstration purposes only.
// It uses localStorage, which is NOT secure for storing user data or session information
// in a real-world application. Passwords are also stored in plaintext in localStorage, which is extremely insecure.
//
// In a production environment, you should ALWAYS:
// 1. Use a secure, server-side authentication mechanism (e.g., OAuth, JWTs).
// 2. Never store passwords in plaintext. Use strong hashing algorithms (e.g., bcrypt).
// 3. Handle authentication and session management on the server, not the client.
// --------------------

const USERS_STORAGE_KEY = 'kuttawaala_users';
const CURRENT_USER_STORAGE_KEY = 'kuttawaala_currentUser';

// Safely interact with localStorage, which might not be available or could be full.
const safeLocalStorageGet = <T,>(key: string, defaultValue: T): T => {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

const safeLocalStorageSet = <T,>(key: string, value: T): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

const safeLocalStorageRemove = (key: string): void => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from localStorage key “${key}”:`, error);
    }
}

const getInitialUsers = (): User[] => {
    const users = safeLocalStorageGet<User[] | null>(USERS_STORAGE_KEY, null);
    if (users) {
        return users;
    }
    safeLocalStorageSet(USERS_STORAGE_KEY, MOCK_USERS);
    return MOCK_USERS;
};

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    () => safeLocalStorageGet<User | null>(CURRENT_USER_STORAGE_KEY, null)
  );

  useEffect(() => {
    if(currentUser) {
        safeLocalStorageSet(CURRENT_USER_STORAGE_KEY, currentUser);
    } else {
        safeLocalStorageRemove(CURRENT_USER_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const users = getInitialUsers();
    // In a real app, this password check would be a request to a secure backend.
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return userWithoutPassword;
    } else {
      throw new Error("Invalid email or password");
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<User> => {
    const users = getInitialUsers();
    if (users.some(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }
    const newUser: User = { id: Date.now(), name, email, password };
    const updatedUsers = [...users, newUser];
    safeLocalStorageSet(USERS_STORAGE_KEY, updatedUsers);
    
    // Do not keep password in the client-side state
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  }, []);

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