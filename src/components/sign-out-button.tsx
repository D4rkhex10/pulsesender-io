'use client';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push('/auth/sign-in');
  }

  return (
    <button className="btn-ghost-sm" onClick={handleSignOut}>
      sign out
    </button>
  );
}
