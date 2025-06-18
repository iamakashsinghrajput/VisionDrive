
"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, KeyRound } from 'lucide-react';

// Wrapper to use Suspense
function VerifyOtpComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
        if (!email) {
            router.push('/signup');
        }
    }, [email, router]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            if (res.ok) {
                router.push('/signin?status=verified');
            } else {
                const data = await res.json();
                setError(data.message || 'Invalid OTP or it has expired.');
            }
        } catch {
            setError('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // We can re-use the register route to send a new OTP
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // The API needs firstName and lastName, but it will find the existing user by email
                // and just update the OTP. We can send dummy values.
                body: JSON.stringify({ email, firstName: 'User', lastName: ' ' }),
            });

            if (res.ok) {
                setSuccessMessage('A new verification code has been sent to your email.');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to send new code.');
            }
        } catch {
            setError('Failed to connect to the server.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-vision-black text-gray-300 font-sans flex overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 z-10">
                <div className="w-full max-w-md">
                    <Link href="/signup" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Sign Up
                    </Link>

                    <h1 className="text-5xl font-bold font-display text-white mb-2">Verify Your Account</h1>
                    <p className="text-zinc-400 mb-10">
                        Enter the 6-digit code sent to <strong className="text-cyan-400">{email}</strong>.
                    </p>

                    <form onSubmit={handleVerify} className="space-y-5">
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="_ _ _ _ _ _"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                className="input-auth pl-12 text-center tracking-[0.5em]"
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
                        {successMessage && <p className="text-green-500 text-sm pt-1">{successMessage}</p>}
                        
                        <div className="flex items-center justify-between pt-4">
                            <button type="button" onClick={handleResendOtp} disabled={resendLoading} className="text-sm text-cyan-400 hover:underline font-semibold disabled:opacity-50 disabled:cursor-wait">
                                {resendLoading ? 'Sending...' : 'Resend Code'}
                            </button>
                            <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-md hover:bg-cyan-500 transition-all hover:shadow-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* RIGHT SIDE - VISUAL (Consistent with other pages) */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image src="/assets/images/auth-visual.jpg" alt="Luxury car showcase" layout="fill" objectFit="cover" quality={90} priority />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-vision-black/80 to-vision-black"></div>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="bg-vision-black h-screen" />}>
            <VerifyOtpComponent />
        </Suspense>
    )
}