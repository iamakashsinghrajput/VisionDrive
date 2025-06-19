// components/AuraText.tsx
"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";

const AuraText = ({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number>; }) => {
  // State to hold window dimensions safely
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // useEffect runs only on the client, after mount
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Now, we can safely use the state values in our transforms
  const flareX = useTransform(mouseX, (val) => val - windowSize.width / 2 - 192);
  const flareY = useTransform(mouseY, (val) => val - windowSize.height / 2 - 192);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative h-auto w-full max-w-4xl">
        {/* Effect 1: The Aura Background */}
        <motion.div
          className="absolute inset-[-20%] z-0 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 opacity-70"
          style={{ filter: "blur(100px)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Effect 2: The Cursor Light (Now using safe values) */}
        <motion.div
          className="absolute z-20 h-96 w-96 rounded-full bg-white opacity-80"
          style={{
            x: flareX,
            y: flareY,
            filter: "blur(120px)",
          }}
        />

        {/* The Text Itself */}
        <h1 className="relative z-10 select-none text-center font-display text-[18vw] font-black leading-[0.85] text-white/80 mix-blend-overlay md:text-[12vw]">
          DRIVE
          <br />
          BEYOND
        </h1>
      </div>
    </div>
  );
};

export default AuraText;