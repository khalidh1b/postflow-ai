import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from '../types';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return null;
    };
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  };
};