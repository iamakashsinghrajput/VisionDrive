"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const res = await fetch('/api/auth/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
            } else {
                setError(data.message);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-vision-black text-gray-300 font-sans flex">
            <div className="w-full flex flex-col justify-center items-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <Link href="/signin" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-10 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Sign In
                    </Link>

                    <h1 className="text-5xl font-bold font-display text-white mb-2">Reset Password</h1>
                    <p className="text-zinc-400 mb-10">Enter your email and we&aposl;ll send you a link to get back into your account.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-auth pl-12" />
                        </div>
                        
                        {message && <p className="text-green-500 text-sm pt-1">{message}</p>}
                        {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
                        
                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full px-8 py-3 bg-cyan-400 text-black font-bold rounded-md hover:bg-cyan-500 transition-all hover:shadow-cyan-glow disabled:opacity-50">
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}