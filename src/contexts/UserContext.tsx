import React, { createContext, useContext, useState, ReactNode } from 'react';
import supabase from '../data/supabase';

interface User {
  id: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  deleteProfile: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    if (error || !data) return false;
    const userObj = { id: data.id.toString(), username: data.username };
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    return true;
  };

  const register = async (username: string, password: string) => {
    // Check if username exists
    const { data: existing } = await supabase
      .from('Users')
      .select('id')
      .eq('username', username)
      .single();
    if (existing) return false;
    const { data, error } = await supabase
      .from('Users')
      .insert([{ username, password }])
      .select()
      .single();
    if (error || !data) return false;
    const userObj = { id: data.id.toString(), username: data.username };
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const deleteProfile = async () => {
    if (!user) return false;
    // Delete all tasks for user
    await supabase.from('Tasks').delete().eq('userId', user.id);
    // Delete user
    const { error } = await supabase.from('Users').delete().eq('id', user.id);
    if (error) return false;
    logout();
    return true;
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, deleteProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}; 