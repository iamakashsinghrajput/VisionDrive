"use client";
import { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

const GridCanvas = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSpacing = 50;
      const perspective = 0.5;
      
      const mouseInfluenceY = (mouseY.get() - canvas.height / 2) / canvas.height;

      for (let i = 0; i < canvas.height / gridSpacing * 2; i++) {
        const y = i * gridSpacing;
        const p = (y / (canvas.height * 2)) * perspective + 1;
        const lineWidth = 1 / p;
        
        ctx.beginPath();
        ctx.moveTo(0, y + mouseInfluenceY * 50 * (1 - y / canvas.height));
        ctx.lineTo(canvas.width, y + mouseInfluenceY * 50 * (1- y / canvas.height));
        ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - y / canvas.height)})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default GridCanvas;