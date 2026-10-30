import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerContact } from '../types/booking';

interface AuthContextType {
  isAuthenticated: boolean;
  customer: CustomerContact | null;
  login: (phoneOrEmail: string, name?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<CustomerContact>) => void;
}

const DEFAULT_CUSTOMER: CustomerContact = {
  fullName: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@example.com',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sv_auth_token') === 'true';
  });

  const [customer, setCustomer] = useState<CustomerContact | null>(() => {
    const saved = localStorage.getItem('sv_customer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CUSTOMER;
      }
    }
    return DEFAULT_CUSTOMER;
  });

  useEffect(() => {
    if (customer) {
      localStorage.setItem('sv_customer_profile', JSON.stringify(customer));
    }
  }, [customer]);

  const login = async (phoneOrEmail: string, name?: string) => {
    // Simulate OTP / verified login
    const updated: CustomerContact = {
      fullName: name || customer?.fullName || 'Verified Customer',
      phone: phoneOrEmail.includes('@') ? (customer?.phone || '+91 98765 00000') : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : (customer?.email || 'customer@sahivahan.com')
    };
    setCustomer(updated);
    setIsAuthenticated(true);
    localStorage.setItem('sv_auth_token', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sv_auth_token');
  };

  const updateProfile = (data: Partial<CustomerContact>) => {
    if (customer) {
      setCustomer({ ...customer, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, customer, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
