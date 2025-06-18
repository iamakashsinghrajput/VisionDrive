"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

type AnimatedCounterProps = {
  from?: number;
  to: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationOptions?: any;
  suffix?: string;
  className?: string;
};

const AnimatedCounter = ({ from = 0, to, animationOptions, suffix = "", className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        ...animationOptions,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, animationOptions]);

  return (
    <span className={className}>
      <span ref={ref}>{from}</span>
      {suffix}
    </span>
  );
};

const StatCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex flex-col items-center justify-center p-8 text-center">
    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gray-700"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gray-700"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gray-700"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gray-700"></div>
    {children}
  </div>
);


const StatsSection = () => {
  const stats = [
    { value: 12, suffix: "", text: "Years on the rental market" },
    { value: 50, suffix: "+", text: "Luxury vehicles in our fleet" },
    { value: 15, suffix: "M", text: "Dollars value of our fleet" },
  ];

  return (
    <section className="bg-zinc-900 text-white py-24 sm:py-32">
      <div className="container mx-auto px-6">
        
        <div className="mb-20">
          <p className="text-center text-gray-400 text-xs uppercase tracking-[0.2em] mb-12">
            [ ESTABLISHED & TRUSTED ]
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <AnimatedCounter 
                  to={stat.value}
                  suffix={stat.suffix}
                  className="font-mono text-5xl md:text-7xl font-bold italic text-cyan-400"
                />
                <p className="mt-2 text-gray-400 text-sm">{stat.text}</p>
              </StatCard>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-8">
            [ LUXURY & EXOTIC CAR RENTALS ]
          </p>
          <h2 className="text-4xl md:text-6xl font-bold italic">
            RENT. RIDE.{" "}
            <span className="bg-cyan-400 text-zinc-900 px-4 py-1 rounded-md">
              ENJOY.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-gray-300">
            Luxury rentals are more than just making a statement; they are about experiencing the very best that life has to offer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;