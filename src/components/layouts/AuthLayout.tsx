import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivityCard = ({
    name,
    avatar,
    message,
    time,
    className,
    delay = 0
}: {
    name: string,
    avatar: string,
    message: string,
    time: string,
    className?: string,
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
        className={`absolute bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-start gap-4 ${className}`}
    >
        <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center font-bold text-black text-lg">
            {avatar}
        </div>
        <div>
            <div className="flex items-center gap-2">
                <p className="font-bold text-white">{name}</p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>
            <p className="text-gray-300 text-sm">{message}</p>
        </div>
    </motion.div>
);

// The main layout component
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen w-full bg-black text-white grid grid-cols-1 md:grid-cols-2 font-sans">
            {/* Left Side: Form */}
            <div className="relative flex flex-col items-center justify-center p-8">
                {/* Back Button */}
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                    <span className="font-semibold text-sm">BACK</span>
                </Link>

                {/* 24/7 Support Circle */}
                <div className="absolute top-8 right-8 flex flex-col items-center justify-center w-20 h-20 border border-gray-700 rounded-full">
                    <p className="text-xl font-bold font-display">24/7</p>
                    <p className="text-xs text-gray-400 tracking-widest">SUPPORT</p>
                </div>
                
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>

            {/* Right Side: Visuals */}
            <div className="hidden md:block relative">
                <Image
                    src="https://images.unsplash.com/photo-1614208182983-92ec38b30143?q=80&w=2574&auto=format&fit=crop"
                    alt="Futuristic sports car"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                
                {/* Floating Activity Cards */}
                <div className="relative w-full h-full flex items-center justify-center p-12">
                     <ActivityCard 
                        name="Alex R."
                        avatar="A"
                        message="Just booked the 911 GT3. Can't wait!"
                        time="5m ago"
                        className="bottom-[30%] left-[-10%]"
                        delay={0.2}
                    />
                    <ActivityCard 
                        name="Maria G."
                        avatar="M"
                        message="The rental process was seamless. 5 stars!"
                        time="2h ago"
                        className="top-[25%] right-[-5%]"
                        delay={0.4}
                    />
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;