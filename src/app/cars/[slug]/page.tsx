// src/app/cars/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getCarById } from "@/lib/carsData";
import { notFound, useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Gauge, Zap, GitCommit, Users } from "lucide-react";
import clsx from "clsx";

type ImageView = 'side' | 'front' | 'back';

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="flex flex-col items-center justify-center text-center bg-zinc-900 p-4 rounded-lg border border-zinc-800 h-full">
    <div className="text-cyan-400 mb-2">{icon}</div>
    <p className="font-semibold text-white mt-1">{value}</p>
    <p className="text-xs text-zinc-400">{label}</p>
  </div>
);

export default function CarDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const car = getCarById(slug);
  const [currentView, setCurrentView] = useState<ImageView>('side');

  useEffect(() => {
    if (!car) {
      notFound();
    }
  }, [car]);

  if (!car) {
    return <div className="bg-vision-black min-h-screen"></div>;
  }

  const imageViews: { key: ImageView, src: string }[] = [
    { key: 'side', src: car.images.side },
    { key: 'front', src: car.images.front },
    { key: 'back', src: car.images.back },
  ];

  return (
    <div className="bg-vision-black min-h-screen text-white font-sans">
      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="mb-8">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Fleet
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          <div className="w-full lg:sticky lg:top-24 h-max">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 shadow-2xl shadow-black/50 bg-zinc-900 border border-zinc-800">
              <AnimatePresence mode="wait">
                <motion.div key={currentView} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="w-full h-full">
                  <Image src={car.images[currentView]} alt={`${car.name} ${currentView} view`} fill className="object-contain" priority sizes="(max-width: 1024px) 100vw, 50vw"/>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {imageViews.map(view => (
                <button key={view.key} onClick={() => setCurrentView(view.key)} className={clsx("relative aspect-video w-full rounded-lg overflow-hidden transition-all duration-300 ring-offset-4 ring-offset-vision-black", currentView === view.key ? 'ring-2 ring-cyan-400' : 'opacity-60 hover:opacity-100')}>
                  <Image src={view.src} alt={`${car.name} ${view.key} thumbnail`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-cyan-400 font-bold tracking-wider">{car.brand}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter my-1">{car.name}</h1>
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold">About this Vehicle</h3>
                <p className="text-zinc-400 max-w-prose text-base leading-relaxed">{car.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SpecItem icon={<Gauge size={28} />} label="Horsepower" value={`${car.specs.horsepower} HP`} />
                <SpecItem icon={<Zap size={28} />} label="Engine" value={car.specs.engine} />
                <SpecItem icon={<GitCommit size={28} />} label="Drivetrain" value={car.specs.drive} />
                <SpecItem icon={<Users size={28} />} label="Seats" value={`${car.specs.seats}`} />
            </div>
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-zinc-300">
                    {car.featuresList.slice(0, 8).map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-2 p-6 bg-gradient-to-r from-zinc-900 to-zinc-800/80 rounded-xl border border-zinc-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div>
                    <p className="text-gray-400 text-sm">Price per day</p>
                    <p className="text-4xl font-bold text-cyan-400">₹{car.pricePerDay.toLocaleString()}</p>
                </div>
                 {/* --- THIS IS THE CHANGE --- */}
                 <Link href={`/booking/${car.id}`} className="w-full sm:w-auto text-center px-10 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-500 transition-all hover:shadow-cyan-glow hover:-translate-y-0.5">
                    Book This Car
                 </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}