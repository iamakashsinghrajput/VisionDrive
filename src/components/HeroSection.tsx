"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Car, FileText } from "lucide-react";
import Image from "next/image";
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const carAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 } },
};

const carViews = [
  { key: "front", src: "/mainimage.png" },
  { key: "left", src: "/leftside.png" },
  { key: "rear", src: "/rear.png" },
  { key: "right", src: "/rightside.png" },
];

export default function HeroSection() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const primaryActionLink = isAuthenticated ? "/cars" : "/signin?callbackUrl=/cars";
  const secondaryActionLink = "/how-it-works";
  
  const [viewIndex, setViewIndex] = useState(0);

  const navigateView = (direction: number) => {
    setViewIndex(prev => (prev + direction + carViews.length) % carViews.length);
  };

  return (
    <section className="relative flex h-[calc(100vh-80px)] min-h-[700px] w-full items-center overflow-hidden bg-black font-sans text-white">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-8 md:grid-cols-2">
        
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeUp} className="mb-6 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            PREMIUM CARS RENTAL
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-display text-6xl font-extrabold leading-none tracking-tighter md:text-7xl lg:text-8xl">
            DRIVE YOUR<br />
            <span className="text-cyan-400">DREAM</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-zinc-400 max-w-md">
            In couple clicks using <b className="font-semibold text-white">only your phone.</b>
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
            <Link
              href={primaryActionLink}
              className="rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20"
            >
              Testdrive Now
            </Link>
            <Link
              href={secondaryActionLink}
              className="group flex items-center gap-2 font-semibold text-zinc-300 transition-colors hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-700 transition-all group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10">
                 <ChevronRight className="h-4 w-4" />
              </div>
              Learn More
            </Link>
          </motion.div>

           <motion.div variants={fadeUp} className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
              <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
                      <Car className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div>
                      <h3 className="font-bold text-white">Free Test-drive</h3>
                      <p className="text-sm text-zinc-400">We provide a free test drive to everyone.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
                      <FileText className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div>
                      <h3 className="font-bold text-white">Fast & Easy</h3>
                      <p className="text-sm text-zinc-400">A driver&apos;s license and 10 minutes to start.</p>
                  </div>
              </div>
            </motion.div>
        </motion.div>

        <div className="relative flex h-full w-full flex-col items-center justify-center">
            <div className="absolute bottom-0 h-1/2 w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/30 via-black/10 to-transparent" />
            
            <motion.div
              variants={carAnimation}
              initial="hidden"
              animate="visible"
              className="relative z-10 w-[120%]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={carViews[viewIndex].src} alt={`Featured Car - ${carViews[viewIndex].key}`} width={1000} height={600} priority />
                </motion.div>
              </AnimatePresence>

               {/* --- NEW NAVIGATION BUTTONS --- */}
              <button onClick={() => navigateView(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
               <button onClick={() => navigateView(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all">
                <ChevronRight size={24} />
              </button>
            </motion.div>

            <div className="mt-4 flex items-center justify-center gap-3">
              {carViews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setViewIndex(i)}
                  className="relative h-2.5 w-2.5 rounded-full bg-zinc-700 transition-colors hover:bg-zinc-600"
                  aria-label={`View ${carViews[i].key}`}
                >
                  {i === viewIndex && (
                    <motion.span
                      layoutId="active-hero-dot"
                      className="absolute inset-0 rounded-full bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}