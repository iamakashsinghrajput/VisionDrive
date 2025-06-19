"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './Logo';
import { useSession } from 'next-auth/react';

const Footer = () => {

  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const fleetLink = isAuthenticated ? "/cars" : "/signin?callbackUrl=/cars";

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];
  
  const exploreLinks = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "FAQ", href: "/faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

return (
    <footer className="bg-black border-t border-zinc-800 text-zinc-400">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm">
              Experience the pinnacle of automotive excellence with our curated fleet of luxury and performance vehicles.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={fleetLink} className="hover:text-cyan-400 transition-colors">The Fleet</Link>
              </li>
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-zinc-500 order-2 sm:order-1">
                    © {new Date().getFullYear()} VISIONDRIVE. All Rights Reserved.
                </p>
                <div className="flex gap-4 order-1 sm:order-2">
                    <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                    <a href="https://github.com/iamakashsinghrajput" aria-label="Github" className="hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="https://www.linkedin.com/in/akashsingh21/" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>
            </div>
            <div className="text-sm text-zinc-600 mt-4">
                Designed by{" "}
                <a
                    href="https://portfolio-lyart-gamma-39.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                    Akash Studios
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;