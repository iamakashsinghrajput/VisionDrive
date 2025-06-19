"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import GoogleIcon from './icons/GoogleIcon';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

type Mode = 'login' | 'signup';

const AuthForm = () => {
    const [mode, setMode] = useState<Mode>('login');
    const [error, setError] = useState('');
    
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-zinc-900">
            
            {/* Left Panel: Form */}
            <div className="flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <Link href="/" className="flex justify-center mb-8">
                        <h1 className="text-3xl font-bold tracking-wider text-gray-300">
                            VISION<span className="text-cyan-400">DRIVE</span>
                        </h1>
                    </Link>
                    
                    <div className="relative w-full bg-zinc-800 rounded-full p-1 flex mb-8">
                        <button onClick={() => setMode('login')} className="relative w-1/2 rounded-full p-2 text-sm font-semibold text-white z-10 transition-colors">Log In</button>
                        <button onClick={() => setMode('signup')} className="relative w-1/2 rounded-full p-2 text-sm font-semibold text-white z-10 transition-colors">Sign Up</button>
                        <motion.div
                            layoutId="auth-pill"
                            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                            className="absolute inset-0 h-full bg-cyan-400/30 border border-cyan-400/50 rounded-full"
                            style={mode === 'login' ? { left: '1.5%', width: '48.5%' } : { left: '50%', width: '50%' }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'login' ? (
                            <LoginForm key="login" setError={setError} callbackUrl={callbackUrl} />
                        ) : (
                            <SignUpForm key="signup" setError={setError} />
                        )}
                    </AnimatePresence>
                     {error && <p className="text-red-500 text-sm text-center pt-4">{error}</p>}
                </div>
            </div>

            {/* Right Panel: Cinematic Video */}
            <div className="hidden lg:block relative overflow-hidden">
                <video
                    src="/auth-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-black/30" />
                <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }} className="space-y-2">
                        <h2 className="text-5xl font-extrabold tracking-tight">The Drive of Your Life</h2>
                        <h2 className="text-5xl font-extrabold tracking-tight text-cyan-400">Awaits.</h2>
                        <p className="text-lg text-gray-300 max-w-md pt-4">
                            Access a world of automotive excellence. Your next adventure is just a login away.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};



const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: 'easeIn' } }
};

type LoginFormProps = {
    setError: React.Dispatch<React.SetStateAction<string>>;
    callbackUrl: string;
};

const LoginForm = ({ setError, callbackUrl }: LoginFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.get('email'),
            password: formData.get('password')
        });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push(callbackUrl);
        }
        setLoading(false);
    };

    return (
        <motion.div variants={formVariants} initial="hidden" animate="visible" exit="exit">
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="email" type="email" placeholder="Email" required className="input-field pl-10" />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="password" type="password" placeholder="Password" required className="input-field pl-10" />
                </div>
                <motion.button type="submit" disabled={loading} className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50">{loading ? "Signing In..." : "Log In"}</motion.button>
            </form>
             <div className="flex items-center my-6"><div className="flex-grow border-t border-zinc-700"></div><span className="px-4 text-xs text-gray-500 uppercase">OR</span><div className="flex-grow border-t border-zinc-700"></div></div>
             <motion.button onClick={() => signIn('google', { callbackUrl })} className="w-full flex items-center justify-center gap-3 bg-zinc-800 border border-zinc-700 py-3 rounded-lg hover:border-cyan-400 transition-colors"><GoogleIcon /> <span className="font-semibold">Continue with Google</span></motion.button>
        </motion.div>
    );
};

// src/components/AuthForm.tsx -> SignUpForm sub-component

type SignUpFormProps = {
    setError: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpForm = ({ setError }: SignUpFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const data = await res.json();
        if (!res.ok) {
            setError(data.message);
        } else {
            router.push(`/verify-otp?email=${formData.get('email')}`);
        }
        setLoading(false);
    };

    return (
        <motion.div variants={formVariants} initial="hidden" animate="visible" exit="exit">
             <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="flex gap-4">
                    <div className="relative w-1/2"><UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="firstName" type="text" placeholder="First Name" required className="input-field pl-10" /></div>
                    <div className="relative w-1/2"><UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="lastName" type="text" placeholder="Last Name" required className="input-field pl-10" /></div>
                </div>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="email" type="email" placeholder="Email" required className="input-field pl-10" /></div>
                <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="password" type="password" placeholder="Password" required className="input-field pl-10" /></div>
                <motion.button type="submit" disabled={loading} className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50">{loading ? "Creating Account..." : "Create Account"}</motion.button>
             </form>
             <div className="flex items-center my-6"><div className="flex-grow border-t border-zinc-700"></div><span className="px-4 text-xs text-gray-500 uppercase">OR</span><div className="flex-grow border-t border-zinc-700"></div></div>
             <motion.button onClick={() => signIn('google')} className="w-full flex items-center justify-center gap-3 bg-zinc-800 border border-zinc-700 py-3 rounded-lg hover:border-cyan-400 transition-colors"><GoogleIcon /> <span className="font-semibold">Continue with Google</span></motion.button>
        </motion.div>
    );
};

export default AuthForm;