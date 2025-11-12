import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import type { AuthFormData } from '@/types/auth';

/**
 * POST /api/auth/login
 *
 * Accepts an AuthFormData payload and attempts to authenticate a user.
 * Validates presence and basic format in alignment with types/auth.ts and
 * the Prisma User model (unique email, stored hashed password).
 */

export async function POST(request: NextRequest) {
  try {
    const body: AuthFormData = await request.json();
    const email = body?.email?.trim();
    const password = body?.password ?? '';
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const result = await loginUser({ email, password });

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}