import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; message: string; }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

   useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    // Mock API call
    return new Promise(resolve => {
      setTimeout(() => {
        if (username === 'user' && pass === 'password') {
          const loggedInUser: User = { id: 1, username: 'user' };
          setUser(loggedInUser);
          setIsAuthenticated(true);
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
  };

  const changePassword = async (currentPass: string, newPass: string): Promise<{ success: boolean; message: string; }> => {
    // Mock API call
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, you'd verify the current password against the server/database.
            // Here, we'll just check against the mock password.
            if (currentPass === 'password') {
                // In a real app, you'd now send the new password to be updated.
                console.log(`Password changed successfully for user: ${user?.username}`);
                resolve({ success: true, message: 'تم تغيير كلمة المرور بنجاح' });
            } else {
                resolve({ success: false, message: 'كلمة المرور الحالية غير صحيحة' });
            }
        }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};