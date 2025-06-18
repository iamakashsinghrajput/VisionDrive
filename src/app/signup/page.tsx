"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, User as UserIcon, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { signIn } from 'next-auth/react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (res.ok) {
                router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
            } else {
                const data = await res.json();
                setError(data.message || 'An error occurred during sign up.');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black p-4 font-sans overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
                src="/auth-bg.mp4" 
            />
            <div className="absolute inset-0 bg-black/60 z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50"
            >
                <div className="p-8 sm:p-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center"
                    >
                        <motion.div variants={itemVariants}>
                            <Logo />
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center my-8">
                            <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                            <p className="text-gray-400 mt-2">Join VISIONDRIVE for exclusive access.</p>
                        </motion.div>
                        
                        <form onSubmit={handleSubmit} className="w-full space-y-5">
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                                <div className="relative w-full sm:w-1/2">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input-auth pl-12" />
                                </div>
                                <div className="relative w-full sm:w-1/2">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input-auth pl-12" />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-auth pl-12" />
                            </motion.div>
                            <motion.div variants={itemVariants} className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-auth pl-12" />
                            </motion.div>
                            
                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-2 text-red-400 text-sm text-center"
                                >
                                    <AlertCircle size={16} /> {error}
                                </motion.p>
                            )}

                            <motion.div variants={itemVariants}>
                                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold tracking-wide py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60">
                                   {loading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </motion.div>
                        </form>

                        <motion.div variants={itemVariants} className="flex items-center my-6 w-full">
                            <div className="flex-grow border-t border-zinc-700"></div>
                            <span className="px-4 text-xs text-gray-500 uppercase font-medium">OR</span>
                            <div className="flex-grow border-t border-zinc-700"></div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="w-full">
                            <button onClick={() => signIn('google', { callbackUrl: '/cars' })} className="w-full flex items-center justify-center gap-3 bg-zinc-800/80 border border-zinc-700 py-3 rounded-lg hover:bg-zinc-700/80 hover:border-zinc-600 transition-colors">
                                <GoogleIcon /> 
                                <span className="font-semibold text-gray-200">Continue with Google</span>
                            </button>
                        </motion.div>
                        
                        <motion.p variants={itemVariants} className="text-center text-sm text-gray-400 mt-8">
                            Already have an account? <Link href="/signin" className="text-cyan-400 font-semibold hover:underline">Log In</Link>
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}