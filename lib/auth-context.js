'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TRUCKERS, SHIPPERS } from './mock-data';

const AuthContext = createContext(null);

const STORAGE_KEY = 'pratigati_auth';
const ACCOUNTS_KEY = 'pratigati_accounts';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }, []);

  const getRegisteredAccounts = () => {
    try {
      return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const register = (formData, role) => {
    const accounts = getRegisteredAccounts();
    const existing = accounts.find((a) => a.email === formData.email);
    if (existing) {
      throw new Error('An account with this email already exists');
    }

    const id = `${role}-${Date.now()}`;
    const profile = {
      id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role,
      avatar: formData.name?.charAt(0).toUpperCase(),
      ...(role === 'trucker'
        ? {
            vehicleNumber: formData.vehicleNumber || '',
            vehicleType: formData.vehicleType || 'heavy-truck',
            vehicleCapacity: formData.vehicleCapacity ? Number(formData.vehicleCapacity) : 0,
            currentLocation: formData.currentLocation || 'delhi',
            preferredRoutes: formData.preferredRoutes || [],
            rating: 0,
            reliabilityScore: 0,
            completedTrips: 0,
            totalEarnings: 0,
            emptyKmReduced: 0,
            co2Saved: 0,
            fuelSaved: 0,
            costSaved: 0,
          }
        : {
            companyName: formData.companyName || formData.name,
            businessType: formData.businessType || 'Manufacturing',
            commonPickups: formData.commonPickups || [],
            commonDeliveries: formData.commonDeliveries || [],
            activeShipments: 0,
            completedShipments: 0,
            totalSpent: 0,
            costSaved: 0,
            co2Saved: 0,
            emptyKmReduced: 0,
          }),
    };

    accounts.push({ email: formData.email, password: formData.password, role, profile });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    const userData = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role,
      avatar: profile.avatar,
      profile,
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  const login = (email, role) => {
    const accounts = getRegisteredAccounts();
    const registered = accounts.find((a) => a.email === email && a.role === role);

    let profile = null;
    if (registered) {
      profile = registered.profile;
    } else if (role === 'trucker') {
      profile = TRUCKERS.find((t) => t.email === email) || TRUCKERS[0];
    } else if (role === 'shipper') {
      profile = SHIPPERS.find((s) => s.email === email) || SHIPPERS[0];
    } else if (role === 'admin') {
      profile = {
        id: 'admin-001',
        name: 'Platform Admin',
        email: email || 'admin@pratigati.in',
        avatar: 'AD',
        role: 'admin',
      };
    }

    const userData = {
      id: profile.id,
      name: profile.name,
      email: profile.email || email,
      role,
      avatar: profile.avatar || profile.name?.charAt(0).toUpperCase(),
      profile,
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push('/');
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    if (updates.profile) {
      updated.profile = { ...user.profile, ...updates.profile };
    }
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const accounts = getRegisteredAccounts();
    const idx = accounts.findIndex((a) => a.email === user.email);
    if (idx >= 0) {
      accounts[idx].profile = updated.profile;
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
