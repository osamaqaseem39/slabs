"use client";

import { useEffect, useState } from "react";

type GlowPosition = {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
};

export default function GlowEffects() {
  const [glowPositions, setGlowPositions] = useState<GlowPosition[]>([]);

  useEffect(() => {
    const generateGlowPositions = () => {
      // Reduced from 12-20 to 4-6 glows for better performance
      const numGlows = 4 + Math.floor(Math.random() * 3); // 4-6 glows
      const colors = [
        "rgba(0, 190, 247, 0.25)", // #00bef7
        "rgba(0, 190, 247, 0.15)",
        "rgba(147, 51, 234, 0.2)", // purple
        "rgba(59, 130, 246, 0.15)", // blue
      ];
      
      const positions = Array.from({ length: numGlows }, () => ({
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        size: 300 + Math.random() * 200, // 300-500px (reduced size range)
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2, // 0-2s delay
        duration: 12 + Math.random() * 8, // 12-20s duration
      }));
      
      setGlowPositions(positions);
    };

    generateGlowPositions();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" style={{ mixBlendMode: 'screen' }}>
      {glowPositions.map((glow, index) => (
        <div
          key={index}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            backgroundColor: glow.color,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
            willChange: 'opacity, transform',
            animation: `glowPulse ${glow.duration}s ease-in-out infinite`,
            animationDelay: `${glow.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

