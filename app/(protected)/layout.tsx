'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth-context'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
        router.push('/auth?redirect=' + encodeURIComponent(window.location.pathname))
    }
  }, [isAuthenticated, loading, router])

  // If still loading auth context, don't show anything
  if (loading) {
    return null
  }

  // If not authenticated, don't show anything (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // User is authenticated, show the protected content immediately
  return <>{children}</>
} 