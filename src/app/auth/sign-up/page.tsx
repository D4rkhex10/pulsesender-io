'use client';

import { useState, Suspense } from 'react';
import { authClient } from '@/lib/auth/client';
import { useRouter, useSearchParams } from 'next/navigation';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierId = searchParams.get('tier');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authClient.signUp.email({ name, email, password });
      if (result.error) {
        setError(result.error.message ?? 'Sign up failed');
      } else {
        // Subscribe to selected tier if coming from pricing
        if (tierId) {
          try {
            await fetch('/api/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tierId }),
            });
          } catch {
            // Non-blocking — subscription can be retried later
          }
        }

        if (result.data?.user && !result.data.user.emailVerified) {
          // Explicitly send OTP for email verification
          await authClient.emailOtp.sendVerificationOtp({ email, type: 'email-verification' });
          router.push('/auth/verify?email=' + encodeURIComponent(email));
        } else {
          router.push('/onboarding');
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">CREATE ACCOUNT</h1>
        <p className="auth-subtitle">Get started with PulseSender</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="settings-field">
            <label className="settings-label">Name</label>
            <input
              type="text"
              className="settings-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">Email</label>
            <input
              type="email"
              className="settings-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">Password</label>
            <input
              type="password"
              className="settings-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <a href="/auth/sign-in" className="auth-link">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card"><p className="auth-subtitle">Loading...</p></div></div>}>
      <SignUpForm />
    </Suspense>
  );
}
