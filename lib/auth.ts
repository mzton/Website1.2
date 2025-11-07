import type { AuthFormData, RegisterFormData } from '@/types/auth'

type AuthSuccess = { user: { id: string; email: string; name?: string; role?: string }; token: string }
type AuthError = { error: string }

export async function loginUser(data: AuthFormData): Promise<AuthSuccess | AuthError> {
  if (!data.email || !data.password) {
    return { error: 'Email and password are required' }
  }
  // Minimal stub to allow builds; replace with real auth as needed
  return {
    user: { id: 'stub-user', email: data.email },
    token: 'stub-token',
  }
}

export async function registerUser(data: RegisterFormData): Promise<AuthSuccess | AuthError> {
  if (!data.email || !data.password || !data.name || !data.role) {
    return { error: 'Missing required fields' }
  }
  return {
    user: { id: 'stub-user', email: data.email, name: data.name, role: data.role },
    token: 'stub-token',
  }
}