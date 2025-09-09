'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, profileImage?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication - in production, this would connect to a real backend
const MOCK_USERS: { [key: string]: User & { password: string } } = {
  'admin@sharonzhang.dev': {
    id: '1',
    email: 'admin@sharonzhang.dev',
    password: 'admin123',
    name: 'Sharon Zhang',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('portfolio_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('portfolio_user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    MOCK_USERS[email] = { ...newUser, password };
    setUser(newUser);
    localStorage.setItem('portfolio_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portfolio_user');
  };

  const updateProfile = (name: string, profileImage?: string) => {
    if (user) {
      const updatedUser = { ...user, name, profileImage: profileImage || user.profileImage };
      setUser(updatedUser);
      localStorage.setItem('portfolio_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};