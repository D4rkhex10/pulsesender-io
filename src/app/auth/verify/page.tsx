'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (result.error) {
        setError(result.error.message ?? 'Invalid or expired code');
      } else {
        router.push('/onboarding');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed — try again';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResent(false);
    setError('');
    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'email-verification',
      });
      if (result.error) {
        setError(result.error.message ?? 'Failed to resend code');
      } else {
        setResent(true);
      }
    } catch {
      setError('Failed to resend code');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">VERIFY EMAIL</h1>
        <p className="auth-subtitle">
          We sent a verification code to<br />
          <strong style={{ color: 'var(--text-primary)' }}>{email || 'your email'}</strong>
        </p>

        <form onSubmit={handleVerify} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          {resent && <div className="auth-success">New code sent — check your inbox</div>}

          <div className="settings-field">
            <label className="settings-label">Verification Code</label>
            <input
              type="text"
              className="settings-input"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              autoComplete="one-time-code"
              style={{ letterSpacing: '0.3em', textAlign: 'center', fontSize: '18px' }}
            />
          </div>

          <button type="submit" className="btn-primary auth-btn" disabled={loading || code.length < 4}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <p className="auth-footer">
          Didn&apos;t get a code?{' '}
          <button onClick={handleResend} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>
            Resend
          </button>
        </p>
        <p className="auth-footer" style={{ marginTop: '8px' }}>
          Code expires in 15 minutes
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card"><p className="auth-subtitle">Loading...</p></div></div>}>
      <VerifyForm />
    </Suspense>
  );
}
