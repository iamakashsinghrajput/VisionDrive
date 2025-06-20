"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronRight, ChevronLeft, Car, FileText } from "lucide-react";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/WavyBackground";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const carAnimation = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 15, delay: 0.6 } },
};

const brandLogos = [
  { name: "Tata", src: "/icons/tata.svg" },
  { name: "Kia", src: "/icons/kia2.svg" },
  { name: "BMW", src: "/brands/bmw.svg" },
  { name: "Porsche", src: "/brands/porsche.svg" },
  { name: "Mercedes", src: "/brands/mercedes.svg" },
];

export default function HeroSection() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const primaryActionLink = isAuthenticated ? "/cars" : "/signin?callbackUrl=/cars";
  const secondaryActionLink = "/how-it-works";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-500, 500], [2, -2]);
  const rotateY = useTransform(mouseX, [-500, 500], [-2, 2]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section onMouseMove={handleMouseMove} className="relative flex h-[calc(100vh-80px)] min-h-[800px] w-full items-center overflow-hidden font-sans">
      <div className="mx-auto grid h-full w-full grid-cols-1 md:grid-cols-2">
        
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 flex h-full flex-col bg-black justify-between p-8 sm:p-12 lg:p-16">
          <div>
            <motion.div variants={fadeUp} className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 w-fit">
              PREMIUM CARS RENTAL
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-6xl font-extrabold leading-none tracking-tighter md:text-7xl lg:text-8xl">
              DRIVE YOUR<br />
              <span className="text-cyan-400">DREAM</span>
            </motion.h1>
            <br/>
             <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
                <Link
                  href={primaryActionLink}
                  className="rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3 font-bold text-black transition-transform hover:scale-105 shadow-lg shadow-cyan-400/20"
                >
                  Testdrive Now
                </Link>
                <Link
                  href={secondaryActionLink}
                  className="group flex items-center gap-2 font-semibold text-zinc-300 transition-colors hover:text-white"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-zinc-700 flex items-center justify-center transition-all group-hover:border-cyan-400 group-hover:bg-cyan-400/10">
                     <ChevronRight className="h-4 w-4" />
                  </div>
                  Learn More
                </Link>
             </motion.div>
          </div>
          
          
          <motion.div variants={fadeUp} className="grid w-full grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-slate-200 border border-slate-300">
                    <Car className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                    <h3 className="font-bold text-cyan-400">Free Test-drive</h3>
                    <p className="text-sm text-slate-200">We provide a free test drive to everyone.</p>
                </div>
            </div>
             <div className="flex gap-4 items-start">
                 <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-slate-200 border border-slate-300">
                    <FileText className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                    <h3 className="font-bold text-cyan-400">Fast & Easy</h3>
                    <p className="text-sm text-slate-200">A driver&apos;s license and 10 minutes to start.</p>
                </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-start gap-8">
            {brandLogos.map((brand) => (
              <Image key={brand.name} src={brand.src} alt={brand.name} width={50} height={20} className="h-8 w-auto opacity-50" />
            ))}
          </div>
        </motion.div>

        <div className="relative h-full w-full bg-black">
          <WavyBackground className="absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]" />
          
          <motion.div
            variants={carAnimation}
            initial="hidden"
            animate="visible"
            style={{ rotateX, rotateY, perspective: "1200px" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[130%] max-w-none">
                <Image src="/mainImage.png" alt="Featured Car" width={1200} height={700} priority />
            </div>
          </motion.div>

          <div className="absolute top-8 right-8 text-white font-semibold">
              <p>VISIONDRIVE / 2025</p>
          </div>
          
          <div className="absolute left-[-2rem] bottom-1/2 transform translate-y-1/2 -rotate-90 origin-bottom-left text-white tracking-widest uppercase font-bold text-lg flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/20">
                <Image src="/icons/mercedes.svg" alt="Mercedes Logo" width={24} height={24} />
              </div>
              <p>Mercedes Benz G-Class</p>
          </div>

          <div className="absolute left-1/2 bottom-[20%] transform -translate-x-1/2 text-white flex items-center gap-4 p-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"><ChevronLeft size={20}/></button>
              <div className="font-bold text-lg">360°</div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"><ChevronRight size={20}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}