"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';

function ResetPasswordComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push('/forgot-password');
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.message || 'Failed to reset password. The link may be invalid or expired.');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen w-full flex flex-col justify-center items-center p-8 bg-zinc-900">
                <div className="w-full max-w-sm text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Password Reset Successful!</h1>
                    <p className="text-gray-400 mb-6">You can now log in with your new password.</p>
                    <Link href="/signin" className="w-full inline-block px-8 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-500 transition-colors">
                        Back to Log In
                    </Link>
                </div>
            </div>
        );
    }
    
    if (!token) return null;

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-zinc-900">
            <div className="flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Set a New Password</h2>
                        <p className="text-gray-400 mt-2">Create a new, strong password for your account.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input name="password" type="password" placeholder="New Password" required className="input-field pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input name="confirmPassword" type="password" placeholder="Confirm New Password" required className="input-field pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50">
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block relative overflow-hidden">
                <video src="/auth-video.mp4" autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-black/30" />
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full bg-black" />}>
            <ResetPasswordComponent />
        </Suspense>
    );
}