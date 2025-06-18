// src/components/ParticleBackground.tsx
"use client";
import { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [dots, setDots] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 animate-pulse"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: '2px', height: '2px', animationDelay: `${dot.delay}s`, animationDuration: '5s' }}
        />
      ))}
    </div>
  );
};
export default ParticleBackground;