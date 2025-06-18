"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Users, Zap } from 'lucide-react';
import type { Car } from '@/lib/carsData';

const hoverViews: (keyof Omit<Car['images'], 'side' | 'interior'>)[] = ['front', 'left', 'right', 'back'];

export const CarCard = ({ car }: { car: Car }) => {
  const [currentImage, setCurrentImage] = useState(car.images.side);
  const [isHovered, setIsHovered] = useState(false);
  const viewIndex = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        viewIndex.current = (viewIndex.current + 1) % hoverViews.length;
        setCurrentImage(car.images[hoverViews[viewIndex.current]]);
      }, 1000);
    } else {
      setCurrentImage(car.images.side);
    }
    return () => clearInterval(interval);
  }, [isHovered, car.images]);

  return (
    <Link href={`/cars/${car.id}`} className="block">
      <div 
        className="group bg-zinc-900 rounded-xl p-4 flex flex-col h-full border border-transparent hover:border-cyan-400/50 transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-40 mb-4">
          <AnimatePresence>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${car.name} view`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-gray-400">{car.brand}</p>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{car.name}</h3>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center border-t border-zinc-800 pt-3">
            <div className="text-xs">
              <Zap size={18} className="mx-auto text-zinc-500 mb-1" />
              {car.specs.horsepower} HP
            </div>
            <div className="text-xs">
              <SlidersHorizontal size={18} className="mx-auto text-zinc-500 mb-1" />
              {car.specs.transmission}
            </div>
            <div className="text-xs">
              <Users size={18} className="mx-auto text-zinc-500 mb-1" />
              {car.specs.seats} Seats
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-t border-zinc-800 pt-3">
          <p className="text-sm text-gray-400">Starts from</p>
          <p className="text-xl font-bold text-cyan-400">₹{car.pricePerDay.toLocaleString()}<span className="text-sm font-normal text-gray-300">/day</span></p>
        </div>
      </div>
    </Link>
  );
};

export const CarCardSkeleton = () => (
    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col h-full animate-pulse">
        <div className="relative h-40 mb-4 bg-zinc-800 rounded-lg"></div>
        <div className="flex-grow">
            <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-zinc-800 rounded w-2/3"></div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-800 pt-3">
                <div className="h-8 bg-zinc-800 rounded"></div>
                <div className="h-8 bg-zinc-800 rounded"></div>
                <div className="h-8 bg-zinc-800 rounded"></div>
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-t border-zinc-800 pt-3">
            <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
            <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
        </div>
    </div>
);
