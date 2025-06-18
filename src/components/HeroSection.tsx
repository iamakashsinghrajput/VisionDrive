"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Car, CalendarCheck, Headset, ChevronDown } from "lucide-react";
import Link from "next/link";

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeroSection = () => {
  const headline = "Unleash Your Journey";
  const headlineWords = headline.split(" ");
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const fleetLink = isAuthenticated
    ? "/cars"
    : "/signin?callbackUrl=/cars";

  const features = [
    { icon: <Car className="h-7 w-7 text-cyan-300" />, text: "Premium Fleet Selection" },
    { icon: <CalendarCheck className="h-7 w-7 text-cyan-300" />, text: "Seamless Booking Process" },
    { icon: <Headset className="h-7 w-7 text-cyan-300" />, text: "24/7 VIP Concierge" },
  ];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/herovid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 z-10 bg-radial-gradient-hero" />

      <div className="relative z-20 flex flex-col items-center text-center text-white px-4">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter font-display"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordAnimation}
              className={`inline-block mr-4 ${word === "Journey" ? "text-cyan-400" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-2xl text-lg text-gray-300 tracking-wide"
        >
          Go beyond transportation. Rent an experience. Our curated fleet is ready for your next adventure.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
            <Link
                href={fleetLink}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3 text-base font-bold text-zinc-900 transition-all duration-300 hover:shadow-cyan-glow hover:-translate-y-1"
            >
                Browse The Fleet
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          <Link
            href="/how-it-works"
            className="w-full sm:w-auto text-center rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:border-white/50"
          >
            How It Works
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full z-20 pb-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="flex items-center justify-center gap-4 p-4 rounded-xl bg-black/20 backdrop-blur-md border border-white/10"
            >
              {feature.icon}
              <span className="font-medium text-white">{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="absolute bottom-24 md:bottom-32 z-20"
        >
          <ChevronDown className="h-8 w-8 text-white/50 animate-bounce" />
       </motion.div>
    </section>
  );
};

export default HeroSection;