import { motion } from 'framer-motion';

type NotificationCardProps = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    timestamp: string;
    className?: string;
    delay: number;
};

export const NotificationCard = ({ icon, title, subtitle, timestamp, className, delay }: NotificationCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
            className={`absolute bg-zinc-900/50 backdrop-blur-lg border border-zinc-700/50 rounded-2xl p-4 flex items-start gap-4 shadow-2xl ${className}`}
        >
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-grow">
                <h4 className="font-semibold text-sm text-white">{title}</h4>
                <p className="text-zinc-400 text-sm">{subtitle}</p>
            </div>
            <p className="text-xs text-zinc-500 ml-auto flex-shrink-0">{timestamp}</p>
        </motion.div>
    );
};