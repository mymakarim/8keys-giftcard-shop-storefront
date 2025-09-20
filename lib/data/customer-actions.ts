"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export interface StoreCustomer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  metadata?: Record<string, any>;
}

export const retrieveCustomerServer =
  async (): Promise<StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    try {
      const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
      const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
      
      const response = await fetch(`${backendUrl}/store/customers/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-publishable-api-key': publishableKey || '',
          ...authHeaders,
        },
        cache: 'force-cache',
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.customer
    } catch (error) {
      console.error('Error retrieving customer:', error)
      return null
    }
  }

export const updateCustomerServer = async (body: any) => {
  const headers = await getAuthHeaders()

  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    const response = await fetch(`${backendUrl}/store/customers/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey || '',
        ...headers,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to update customer')
    }

    const data = await response.json()
    const cacheTag = await getCacheTag("customers")
    revalidateTag(cacheTag)

    return data.customer
  } catch (error) {
    console.error('Error updating customer:', error)
    throw error
  }
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    // Register the user
    const registerResponse = await fetch(`${backendUrl}/store/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey || '',
      },
      body: JSON.stringify(customerForm),
    })

    if (!registerResponse.ok) {
      throw new Error('Registration failed')
    }

    // Login to get token
    const loginResponse = await fetch(`${backendUrl}/store/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey || '',
      },
      body: JSON.stringify({ email: customerForm.email, password }),
    })

    if (!loginResponse.ok) {
      throw new Error('Login failed')
    }

    const loginData = await loginResponse.json()
    await setAuthToken(loginData.access_token)

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    return loginData.customer
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    const response = await fetch(`${backendUrl}/store/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableKey || '',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    await setAuthToken(data.access_token)
    
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
  } catch (error: any) {
    return error.toString()
  }
}

export async function signout() {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    await fetch(`${backendUrl}/store/auth/token`, {
      method: 'DELETE',
      headers: {
        'x-publishable-api-key': publishableKey || '',
      },
    })
  } catch (error) {
    console.error('Error during logout:', error)
  }

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/auth`)
} 