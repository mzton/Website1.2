import type { AuthFormData, RegisterFormData } from '@/types/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/** Result returned on successful authentication. */
type AuthSuccess = { 
  user: { 
    id: string; 
    email: string; 
    name: string; 
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }; 
  token: string;
}

/** Standardized error shape for authentication failures. */
type AuthError = { error: string }

/**
 * Attempts to log a user in using email and password.
 */
export async function loginUser(data: AuthFormData): Promise<AuthSuccess | AuthError> {
  try {
    // Basic validation: ensure required credentials are present
    if (!data.email || !data.password) {
      return { error: 'Email and password are required' };
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return { error: 'Invalid email or password' };
    }

    // TODO: Generate a real JWT token here
    const token = 'stub-token';

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Failed to log in' };
  }
}

/**
 * Registers a new user with the provided details.
 */
export async function registerUser(data: RegisterFormData): Promise<AuthSuccess | AuthError> {
  try {
    // Basic validation: ensure all required registration fields are present
    if (!data.email || !data.password || !data.name || !data.role) {
      return { error: 'Missing required fields' };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
      },
    });

    const token = 'stub-token';

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  } catch (error) {
    console.error('Register error:', error);
    return { error: 'Failed to register user' };
  }
}