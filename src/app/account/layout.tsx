"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, Car } from 'lucide-react';
import clsx from 'clsx';

const accountNavLinks = [
  { name: 'My Bookings', href: '/account/bookings', icon: Car },
  { name: 'Account Settings', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-vision-black min-h-screen text-white">
      <header className="py-8 bg-black border-b border-zinc-800">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Your Account</h1>
          <p className="mt-2 text-zinc-400">Manage your bookings and personal information.</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <div className="sticky top-24 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <nav className="flex flex-col gap-2">
                {accountNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-cyan-400 text-black'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}