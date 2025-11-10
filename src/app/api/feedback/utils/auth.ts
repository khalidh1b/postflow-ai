import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user?.id || null;
  } catch (error) {
    return null;
  }
};

export async function requireAuth(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error('Authentication required');
  }
  return userId;
};