// src/app/account/settings/page.tsx
"use client";

import { useSession } from 'next-auth/react';
import { User, Mail,Trash2 } from 'lucide-react';

const SettingsCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="p-6 border-b border-zinc-800">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-zinc-400 mt-1">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

export default function AccountSettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Account Settings</h2>
            
            <SettingsCard
                title="Personal Information"
                description="Update your name and email address."
            >
                <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input type="text" defaultValue={session?.user?.name?.split(' ')[0] || ''} className="input-auth pl-10" />
                        </div>
                         <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input type="text" defaultValue={session?.user?.name?.split(' ')[1] || ''} className="input-auth pl-10" />
                        </div>
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <input type="email" value={session?.user?.email || ''} readOnly className="input-auth pl-10 bg-zinc-800 cursor-not-allowed" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-5 py-2 bg-cyan-400 text-black font-semibold rounded-md text-sm hover:bg-cyan-500 transition-colors">Save Changes</button>
                    </div>
                </form>
            </SettingsCard>

             <SettingsCard
                title="Delete Account"
                description="Permanently delete your account and all associated data. This action cannot be undone."
            >
                <div className="flex justify-end">
                     <button className="flex items-center gap-2 px-5 py-2 bg-red-600/20 text-red-400 font-semibold rounded-md text-sm hover:bg-red-600/30 hover:text-red-300 transition-colors">
                        <Trash2 size={16} />
                        Delete My Account
                    </button>
                </div>
            </SettingsCard>
        </div>
    );
}