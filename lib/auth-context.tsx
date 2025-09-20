'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Customer, loginCustomer, logoutCustomer, registerCustomer, getCurrentToken, validateToken, getCurrentCustomer } from './data/customer';

// Local decodeJWT function for extracting user info from token
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: { email: string; password: string; first_name?: string; last_name?: string }) => Promise<boolean>;
  refreshCustomer: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const refreshCustomer = async () => {
    try {
      console.log('Auth Context: Starting authentication check');
      setError(null);
      
      // Check if we have a valid token
      const token = await getCurrentToken();
      console.log('Auth Context: Token check result:', !!token);
      
      if (token && validateToken(token)) {
        console.log('Auth Context: Valid token found, fetching customer data');
        
        try {
          // Try to get customer data from Medusa API first
          const customerData = await getCurrentCustomer();
          if (customerData) {
            console.log('Auth Context: Customer data retrieved from API:', customerData.email);
            setCustomer(customerData);
            return;
          }
        } catch (apiError) {
          console.warn('Auth Context: API call failed, falling back to JWT decode:', apiError);
        }
        
        // Fallback to JWT decoding if API call fails
        console.log('Auth Context: Using JWT token data as fallback');
        const userFromToken = decodeJWT(token);
        if (userFromToken) {
          console.log('Auth Context: Token decoded successfully for user:', userFromToken.email);
          const fallbackCustomerData: Customer = {
            id: userFromToken.actor_id || userFromToken.sub, // Support different token formats
            email: userFromToken.email || 'unknown@email.com',
            first_name: userFromToken.first_name,
            last_name: userFromToken.last_name,
            created_at: new Date(userFromToken.iat * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            metadata: {
              jwt_issued_at: userFromToken.iat,
              jwt_expires_at: userFromToken.exp,
              customer_id: userFromToken.app_metadata?.customer_id,
              source: 'jwt_fallback'
            }
          };
          setCustomer(fallbackCustomerData);
          console.log('Auth Context: Customer restored from token:', fallbackCustomerData.email);
          return;
        }
      } else if (token) {
        console.log('Auth Context: Token found but invalid/expired, clearing');
        // Token exists but is invalid - clear it
        await logoutCustomer();
      } else {
        console.log('Auth Context: No token found');
      }
      
      // If no valid token, clear customer state
      setCustomer(null);
    } catch (error) {
      console.error('Auth Context: Error refreshing customer:', error);
      setError('Failed to verify authentication');
      setCustomer(null);
    } finally {
      setLoading(false);
      setHasInitialized(true);
      console.log('Auth Context: Authentication check completed');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Auth Context: Starting login process for:', email);
      setLoading(true);
      setError(null);
      
      const customerData = await loginCustomer(email, password);
      
      if (customerData) {
        console.log('Auth Context: Login successful, setting customer data:', customerData.email);
        setCustomer(customerData);
        
        // Verify the login was successful by checking the token
        const token = await getCurrentToken();
        if (!token || !validateToken(token)) {
          console.error('Auth Context: Login succeeded but token is invalid');
          setError('Authentication failed - invalid token');
          setCustomer(null);
          return false;
        }
        
        console.log('Auth Context: Login and token validation successful');
        return true;
      } else {
        console.log('Auth Context: Login failed - no customer data received');
        setError('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Auth Context: Login error:', error);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await logoutCustomer();
      setCustomer(null);
      setError(null);
      console.log('Auth Context: Logout successful');
    } catch (error) {
      console.error('Auth Context: Logout error:', error);
      setError('Logout failed');
      // Still clear customer state even if logout API fails
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { email: string; password: string; first_name?: string; last_name?: string }): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const customerData = await registerCustomer(data);
      if (customerData) {
        setCustomer(customerData);
        console.log('Auth Context: Registration successful for:', customerData.email);
        return true;
      } else {
        setError('Registration failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Auth Context: Registration error:', error);
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client side after component mounts
    if (typeof window !== 'undefined' && !hasInitialized) {
      console.log('Auth Context: Initializing authentication on client side');
      refreshCustomer();
    }
  }, [hasInitialized]);

  const value: AuthContextType = {
    customer,
    loading,
    error,
    login,
    logout,
    register,
    refreshCustomer,
    isAuthenticated: !!customer && !loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 