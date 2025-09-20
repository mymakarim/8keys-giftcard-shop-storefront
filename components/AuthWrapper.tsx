'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import Loading from './Loading';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthWrapper({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth' 
}: AuthWrapperProps) {
  const { customer, loading, isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      setShouldRedirect(true);
      // Add a small delay to show the loading state
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);
    }
  }, [loading, requireAuth, isAuthenticated, redirectTo]);

  if (loading) {
    return <Loading />;
  }

  if (shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-cyan mx-auto mb-4"></div>
          <p className="text-gaming-cyan font-semibold">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-cyan mx-auto mb-4"></div>
          <p className="text-gaming-cyan font-semibold">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 