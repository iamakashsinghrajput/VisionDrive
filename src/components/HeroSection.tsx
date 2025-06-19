"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { MouseEvent, useRef} from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const GridCanvas = dynamic(() => import("./GridCanvas"), { ssr: false });

const HeroSection = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const fleetLink = isAuthenticated ? "/cars" : "/signin?callbackUrl=/cars";

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const scale = useTransform(scrollYProgress, [0, 1], [1, 25]);
  const zDrive = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const zBeyond = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const blur = useTransform(scrollYProgress, [0.85, 1], ["blur(0px)", "blur(40px)"]);

  return (
    <div ref={heroRef} className="relative z-0 h-[200vh] w-full">
      <div
        onMouseMove={handleMouseMove}
        className="sticky top-0 h-[93vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#101015]" />
        
        <GridCanvas mouseX={mouseX} mouseY={mouseY} />
        
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{
            opacity,
            filter: blur,
            perspective: "1000px",
          }}
        >
          <motion.div style={{ scale, transformStyle: "preserve-3d" }}>
            <h1 className="relative select-none text-center font-display text-8xl font-black text-white/90 md:text-9xl">
              <motion.div style={{ translateZ: zDrive }}>DRIVE</motion.div>
              <motion.div style={{ translateZ: zBeyond }}>BEYOND</motion.div>
            </h1>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute inset-0 z-30"
        >
          <div className="absolute bottom-0 w-full p-6 md:p-8">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-white">
                  <span>VISION</span>
                  <span className="text-[#00BFFF]">DRIVE</span>
                </div>
                <Link
                  href={fleetLink}
                  className="group flex items-center gap-3 rounded-md border-2 border-white/30 px-5 py-2 font-mono text-sm font-semibold text-white/90 transition-colors duration-300 hover:border-[#00BFFF] hover:text-white"
                >
                  ACCESS_FLEET
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;