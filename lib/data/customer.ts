export interface Customer {
  id: string;
  email: string;
  default_billing_address_id?: string | null;
  default_shipping_address_id?: string | null;
  company_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  addresses?: any[]; // StoreCustomerAddress array
  metadata?: Record<string, any>;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  // Legacy fields for backward compatibility
  billing_address?: any;
  shipping_addresses?: any[];
  payment_sessions?: any[];
  orders?: any[];
}

// Client-side functions for compatibility
export async function loginCustomer(email: string, password: string): Promise<Customer | null> {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    console.log('loginCustomer: Starting login process for', email);
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    console.log('loginCustomer: Attempting login with:', { email, backendUrl, publishableKey: publishableKey || 'missing' });
    
    const response = await fetch(`${backendUrl}/auth/customer/emailpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    console.log('loginCustomer: Login response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('loginCustomer: Login failed:', errorText);
      throw new Error(`Login failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('loginCustomer: Login successful, token received');
    
    // Store the JWT token with httpOnly for better security
    if (data.token) {
      console.log('loginCustomer: Storing token in httpOnly cookie');
      
      try {
        // Use fetch to set httpOnly cookie via API route
        const tokenResponse = await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: data.token }),
        });
        
        if (!tokenResponse.ok) {
          console.error('loginCustomer: Failed to store token in httpOnly cookie:', await tokenResponse.text());
          throw new Error('Failed to store authentication token in httpOnly cookie');
        }
        
        console.log('loginCustomer: Token stored in httpOnly cookie successfully');
        
        // Store fallback token in localStorage for production compatibility
        if (typeof window !== 'undefined') {
          localStorage.setItem('_medusa_jwt_fallback', data.token);
          console.log('loginCustomer: Fallback token stored in localStorage');
        }
        
      } catch (cookieError) {
        console.error('loginCustomer: Error with httpOnly cookie storage, using localStorage fallback:', cookieError);
        
        // If httpOnly cookie fails, at least store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('_medusa_jwt_fallback', data.token);
          console.log('loginCustomer: Token stored in localStorage as fallback');
        } else {
          throw new Error('Failed to store authentication token');
        }
      }
      
      // Verify token was stored correctly by attempting to retrieve it
      const verifyToken = await getCurrentToken();
      if (!verifyToken) {
        console.error('loginCustomer: Token verification failed - no token could be retrieved');
        throw new Error('Token storage verification failed');
      }
      
      console.log('loginCustomer: Token storage verification successful');
    } else {
      console.error('loginCustomer: No token received from login response');
      throw new Error('No authentication token received');
    }

    // Return customer data from JWT token
    if (data.token) {
      const userFromToken = decodeJWT(data.token);
      if (userFromToken) {
        const customerData: Customer = {
          id: userFromToken.actor_id,
          email: userFromToken.email || email,
          first_name: userFromToken.first_name,
          last_name: userFromToken.last_name,
          created_at: new Date(userFromToken.iat * 1000).toISOString(),
          updated_at: new Date().toISOString(),
          metadata: {
            jwt_issued_at: userFromToken.iat,
            jwt_expires_at: userFromToken.exp,
            customer_id: userFromToken.app_metadata?.customer_id
          }
        };
        console.log('loginCustomer: Returning customer data:', customerData.email);
        return customerData;
      } else {
        console.error('loginCustomer: Failed to decode JWT token');
        throw new Error('Failed to decode authentication token');
      }
    }
    
    console.error('loginCustomer: No token available for customer data extraction');
    return null;
  } catch (error) {
    console.error('loginCustomer: Error during login process:', error);
    return null;
  }
}

export async function logoutCustomer(): Promise<void> {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    // Call Medusa logout endpoint
    await fetch(`${backendUrl}/store/auth/token`, {
      method: 'DELETE',
      headers: {
        'x-publishable-api-key': publishableKey || '',
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Clear the httpOnly cookie via API route
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      console.log('logoutCustomer: httpOnly cookie cleared via API');
    } catch (error) {
      console.error('Error clearing auth token:', error);
    }
    
    // Clear fallback localStorage token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('_medusa_jwt_fallback');
      console.log('logoutCustomer: Fallback token cleared from localStorage');
    }
  }
}

export async function registerCustomer(data: {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}): Promise<Customer | null> {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    
    console.log('Attempting registration with:', { email: data.email, backendUrl, publishableKey: publishableKey ? 'present' : 'missing' });
    
    // First get registration token
    const registerResponse = await fetch(`${backendUrl}/auth/customer/emailpass/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
      credentials: 'include',
    });

    console.log('Registration response status:', registerResponse.status);

    if (!registerResponse.ok) {
      const errorText = await registerResponse.text();
      console.error('Registration failed:', errorText);
      throw new Error(`Registration failed: ${registerResponse.status} ${errorText}`);
    }

    const registrationData = await registerResponse.json();
    console.log('Registration successful, creating customer');

    // Then create the customer using the registration token
    const createCustomerResponse = await fetch(`${backendUrl}/store/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${registrationData.token}`,
        'x-publishable-api-key': publishableKey || '',
      },
      body: JSON.stringify({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      }),
      credentials: 'include',
    });

    console.log('Create customer response status:', createCustomerResponse.status);

    if (!createCustomerResponse.ok) {
      const errorText = await createCustomerResponse.text();
      console.error('Create customer failed:', errorText);
      throw new Error(`Create customer failed: ${createCustomerResponse.status} ${errorText}`);
    }

    console.log('Customer created successfully, attempting login');

    // Finally login to get the authentication token
    const loginResponse = await fetch(`${backendUrl}/auth/customer/emailpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
      credentials: 'include',
    });

    console.log('Login after registration response status:', loginResponse.status);

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error('Login after registration failed:', errorText);
      throw new Error(`Login after registration failed: ${loginResponse.status} ${errorText}`);
    }

    const loginData = await loginResponse.json();
    console.log('Login after registration successful, token received');

    if (loginData.token) {
      // Use fetch to set httpOnly cookie via API route
      await fetch('/api/auth/set-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: loginData.token }),
      });
      console.log('Registration: Token stored in httpOnly cookie successfully');
    }

    // Return customer data from JWT token
    if (loginData.token) {
      const userFromToken = decodeJWT(loginData.token);
      if (userFromToken) {
        const customerData: Customer = {
          id: userFromToken.actor_id,
          email: userFromToken.email || data.email,
          first_name: userFromToken.first_name || data.first_name,
          last_name: userFromToken.last_name || data.last_name,
          created_at: new Date(userFromToken.iat * 1000).toISOString(),
          updated_at: new Date().toISOString(),
          metadata: {
            jwt_issued_at: userFromToken.iat,
            jwt_expires_at: userFromToken.exp,
            customer_id: userFromToken.app_metadata?.customer_id
          }
        };
        return customerData;
      }
    }
    return null;
  } catch (error) {
    console.error('Error registering customer:', error);
    return null;
  }
}

// Function to get current JWT token (client-side) - now using API route with fallback
export async function getCurrentToken(): Promise<string | null> {
  try {
    // First try to get token from httpOnly cookie via API route
    const response = await fetch('/api/auth/get-token', {
      method: 'GET',
      credentials: 'include',
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Log debug information
      if (data.debug) {
        console.log('getCurrentToken: Debug info:', data.debug);
      }
      
      if (data.token) {
        console.log('getCurrentToken: Token retrieved from httpOnly cookie');
        return data.token;
      } else {
        console.log('getCurrentToken: No token found in httpOnly cookie');
      }
    } else {
      console.log('getCurrentToken: API route failed:', response.status);
    }
    
    // Fallback: try localStorage (for development or if httpOnly cookies fail)
    if (typeof window !== 'undefined') {
      const fallbackToken = localStorage.getItem('_medusa_jwt_fallback');
      if (fallbackToken) {
        console.log('getCurrentToken: Using fallback token from localStorage');
        return fallbackToken;
      }
    }
    
    console.log('getCurrentToken: No token found in any storage method');
    return null;
  } catch (error) {
    console.log('getCurrentToken: Error fetching token:', error);
    
    // Fallback to localStorage if API call fails
    if (typeof window !== 'undefined') {
      const fallbackToken = localStorage.getItem('_medusa_jwt_fallback');
      if (fallbackToken) {
        console.log('getCurrentToken: Using fallback token due to API error');
        return fallbackToken;
      }
    }
    
    return null;
  }
}

// Function to validate JWT token (client-side)
export function validateToken(token: string): boolean {
  if (!token) return false;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

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

/**
 * Get current customer details from Medusa API
 */
export async function getCurrentCustomer(): Promise<Customer | null> {
  try {
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    const token = await getCurrentToken();
    
    if (!token) {
      console.log('No token available for getCurrentCustomer');
      return null;
    }
    
    console.log('Getting current customer from Medusa API');
    
    const response = await fetch(`${backendUrl}/store/customers/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-publishable-api-key': publishableKey || '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to get current customer:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    console.log('Current customer data from API:', data);
    
    if (data.customer) {
      const customer = data.customer;
      return {
        id: customer.id,
        email: customer.email,
        default_billing_address_id: customer.default_billing_address_id,
        default_shipping_address_id: customer.default_shipping_address_id,
        company_name: customer.company_name,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        addresses: customer.addresses || [],
        metadata: customer.metadata || {},
        deleted_at: customer.deleted_at,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
        // Legacy fields for backward compatibility
        billing_address: customer.billing_address,
        shipping_addresses: customer.shipping_addresses || customer.addresses || [],
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current customer:', error);
    return null;
  }
} 