import { isAuthenticated } from '../lib/auth-server'
import { redirect } from 'next/navigation'

interface ServerAuthWrapperProps {
  children: React.ReactNode
  redirectTo?: string
}

export default async function ServerAuthWrapper({ 
  children, 
  redirectTo = '/auth' 
}: ServerAuthWrapperProps) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect(redirectTo)
  }

  return <>{children}</>
} 