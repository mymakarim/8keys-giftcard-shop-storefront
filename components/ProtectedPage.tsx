'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';

interface ProtectedPageProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedPage({ 
  children, 
  redirectTo = '/auth' 
}: ProtectedPageProps) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Wait for auth context to finish loading
    if (!loading && !hasCheckedAuth) {
      setHasCheckedAuth(true);
      
      if (!isAuthenticated) {
        console.log('ProtectedPage: User not authenticated, redirecting from:', pathname);
        setIsRedirecting(true);
        
        const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname)}`;
        console.log('ProtectedPage: Redirecting to:', redirectUrl);
        
        // Use router.replace to avoid adding to history
        router.replace(redirectUrl);
      } else {
        console.log('ProtectedPage: User authenticated, showing protected content');
      }
    }
  }, [loading, isAuthenticated, hasCheckedAuth, pathname, redirectTo, router]);

  // Don't show anything while checking auth or redirecting
  if (loading || !hasCheckedAuth || !isAuthenticated || isRedirecting) {
    return null;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
} 