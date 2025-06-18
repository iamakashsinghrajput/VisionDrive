// src/app/verify-otp/page.tsx
"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layouts/AuthLayout';

function VerifyOTPComponent() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
    });
    
    const data = await res.json();
    if (!res.ok) {
        setError(data.message);
        setLoading(false);
    } else {
        setSuccess(data.message);
        setTimeout(() => router.push('/signin'), 2000);
    }
  };

  return (
    <AuthLayout>
        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
        <p className="text-gray-400 mb-8">We&apos;ve sent a 6-digit code to <span className="text-white font-semibold">{email}</span>. Please enter it below.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="_ _ _ _ _ _" maxLength={6} required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white text-center text-2xl tracking-[0.5em] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button type="submit" disabled={loading || !!success} className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
        </form>
    </AuthLayout>
  );
}

// Wrap with Suspense because useSearchParams must be used in a Client Component that is a child of a Suspense boundary.
export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOTPComponent />
        </Suspense>
    )
}