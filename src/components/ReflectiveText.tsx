"use client";
import { motion, MotionValue, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef } from "react";

const ReflectiveText = ({ children, mouseX, mouseY }: { children: React.ReactNode, mouseX: MotionValue, mouseY: MotionValue }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const glintX = useMotionValue(0);
  const glintY = useMotionValue(0);

  useMotionValueEvent(mouseX, "change", (latestX) => {
    const el = ref.current;
    if (el) {
      const { left, width } = el.getBoundingClientRect();
      const relativeX = latestX - left;
      glintX.set((relativeX / width) * 100);
    }
  });

  useMotionValueEvent(mouseY, "change", (latestY) => {
    const el = ref.current;
    if (el) {
      const { top, height } = el.getBoundingClientRect();
      const relativeY = latestY - top;
      glintY.set((relativeY / height) * 100);
    }
  });
  
  const glintBackground = useTransform(
    [glintX, glintY],
    ([latestX, latestY]) => `radial-gradient(circle at ${latestX}% ${latestY}%, white, transparent 40%)`
  );

  return (
    <div className="bg-black mix-blend-screen">
      <h1 ref={ref} className="relative select-none text-center font-display text-[18vw] font-black leading-[0.85] text-white md:text-[12vw]">
        {children}
        <motion.span
          className="absolute inset-0 bg-clip-text text-transparent"
          style={{ 
            backgroundImage: glintBackground,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            mixBlendMode: 'color-dodge', 
            opacity: 0.8
          }}
        >{children}</motion.span>
      </h1>
    </div>
  );
};

export default ReflectiveText;