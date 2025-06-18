// src/components/Navbar.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu as MenuIcon, X, User, Settings, LogOut, Lock, Car } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/cars', label: 'Cars', protected: true },
  { href: '/bikes', label: 'Bikes', protected: true },
  { href: '/how-it-works', label: 'How It Works', protected: false },
  { href: '/faq', label: 'FAQ', protected: false },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const router = useRouter();

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  const handleSignIn = () => router.push('/signin');
  const handleSignUp = () => router.push('/signup');

  const renderNavLink = (link: typeof navLinks[0], isMobile = false) => {
    if (link.protected && !isAuthenticated) {
      return (
        <button key={link.href} onClick={handleSignIn} title="Please log in to access" className={ isMobile ? "py-2 text-lg text-gray-500 flex items-center gap-2" : "text-gray-500 cursor-not-allowed transition-colors flex items-center gap-1" }>
          {link.label} <Lock size={isMobile ? 16 : 12} />
        </button>
      );
    }
    return (
      <Link key={link.href} href={link.href} onClick={() => isMobile && setIsMobileMenuOpen(false)} className={isMobile ? "py-2 text-lg" : "text-gray-300 hover:text-white transition-colors"}>
        {link.label}
      </Link>
    );
  };

  return (
    <header className="relative bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 text-white font-sans z-50 sticky top-0">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-medium tracking-wide">
            <span>VISION</span><span className="font-extrabold text-cyan-400">DRIVE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            {navLinks.map(link => renderNavLink(link))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {status === 'loading' && <div className="h-9 w-9 bg-zinc-700 rounded-full animate-pulse"></div>}
          
          {status === 'unauthenticated' && (
            <>
              <button onClick={handleSignIn} className="text-sm font-semibold hover:text-cyan-400 transition-colors px-3 py-2">
                Log In
              </button>
              <button onClick={handleSignUp} className="bg-cyan-400 text-zinc-900 text-sm font-semibold px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors">
                Sign Up
              </button>
            </>
          )}

          {isAuthenticated && (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center justify-center rounded-full h-9 w-9 bg-zinc-700 ring-2 ring-transparent hover:ring-cyan-400 transition-all">
                {session.user?.image ? (
                  <Image src={session.user.image} alt={session.user.name || 'User Avatar'} width={36} height={36} className="rounded-full" />
                ) : (
                  <User size={20} className="text-gray-300" />
                )}
              </Menu.Button>
              <AnimatePresence>
                <Menu.Items as={motion.div} variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute right-0 mt-2 w-56 origin-top-right bg-zinc-900 border border-zinc-700 rounded-md shadow-lg focus:outline-none">
                  <div className="px-1 py-1">
                    <div className="px-4 py-2 border-b border-zinc-700 mb-1">
                        <p className="text-sm font-semibold text-white">{session.user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/bookings" className={`${active ? 'bg-zinc-700' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-300`}>
                          <Car className="mr-2 h-4 w-4" /> My Bookings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/account/settings" className={`${active ? 'bg-zinc-700' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-300`}>
                          <Settings className="mr-2 h-4 w-4" /> Account Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => signOut()} className={`${active ? 'bg-red-500/20 text-red-400' : 'text-gray-300'} group flex rounded-md items-center w-full px-4 py-2 text-sm`}>
                          <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </AnimatePresence>
            </Menu>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800">
              <div className="flex flex-col gap-4 p-6">
                {navLinks.map(link => renderNavLink(link, true))}
                <div className="border-t border-zinc-700 mt-4 pt-6">
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center">
                                {session.user?.image ? ( <Image src={session.user.image} alt="User" width={40} height={40} className="rounded-full" /> ) : ( <User size={24} className="text-gray-300" /> )}
                              </div>
                              <div>
                                  <p className="font-semibold">{session.user?.name}</p>
                                  <p className="text-sm text-gray-400">{session.user?.email}</p>
                              </div>
                          </div>
                          <Link href="/account/bookings" onClick={() => setIsMobileMenuOpen(false)} className="bg-zinc-800 w-full text-left py-3 px-4 rounded-md font-semibold flex items-center gap-3"><Car size={16}/> My Bookings</Link>
                          <Link href="/account/settings" onClick={() => setIsMobileMenuOpen(false)} className="bg-zinc-800 w-full text-left py-3 px-4 rounded-md font-semibold flex items-center gap-3"><Settings size={16}/> Account Settings</Link>
                          <button onClick={() => {signOut(); setIsMobileMenuOpen(false);}} className="bg-red-500/20 text-red-400 w-full text-center py-3 rounded-md font-semibold flex items-center justify-center gap-3"><LogOut size={16}/>Sign Out</button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                          <button onClick={() => {handleSignIn(); setIsMobileMenuOpen(false);}} className="bg-zinc-800 w-full text-center py-3 rounded-md font-semibold">Log In</button>
                          <button onClick={() => {handleSignUp(); setIsMobileMenuOpen(false);}} className="bg-cyan-400 text-zinc-900 w-full text-center py-3 rounded-md font-semibold">Sign Up</button>
                        </div>
                    )}
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;