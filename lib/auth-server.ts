import "server-only"
import { cookies } from "next/headers"

export const getAuthHeaders = async (): Promise<
  { authorization: string } | {}
> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("_medusa_jwt")?.value

    if (!token) {
      return {}
    }

    return { authorization: `Bearer ${token}` }
  } catch {
    return {}
  }
}

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("_medusa_jwt")?.value
    return token || null
  } catch {
    return null
  }
}

// Function to decode JWT token (server-side)
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('binary').split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Function to check if JWT token is expired
function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getAuthToken()
    if (!token) return false
    
    return !isTokenExpired(token)
  } catch {
    return false
  }
}

export const getCustomerFromToken = async (): Promise<any | null> => {
  try {
    const token = await getAuthToken()
    if (!token || isTokenExpired(token)) return null
    
    const userFromToken = decodeJWT(token)
    if (userFromToken) {
      return {
        id: userFromToken.actor_id,
        email: userFromToken.email || 'unknown@email.com',
        first_name: userFromToken.first_name,
        last_name: userFromToken.last_name,
        created_at: new Date(userFromToken.iat * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        metadata: {
          jwt_issued_at: userFromToken.iat,
          jwt_expires_at: userFromToken.exp,
          customer_id: userFromToken.app_metadata?.customer_id
        }
      }
    }
    return null
  } catch {
    return null
  }
} 