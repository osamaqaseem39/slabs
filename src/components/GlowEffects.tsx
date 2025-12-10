"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type GlowPosition = {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
};

export default function GlowEffects() {
  const [glowPositions, setGlowPositions] = useState<GlowPosition[]>([]);

  useEffect(() => {
    const generateGlowPositions = () => {
      const numGlows = 12 + Math.floor(Math.random() * 8); // 12-20 glows
      const colors = [
        "rgba(0, 190, 247, 0.3)", // #00bef7
        "rgba(0, 190, 247, 0.2)",
        "rgba(147, 51, 234, 0.25)", // purple
        "rgba(59, 130, 246, 0.2)", // blue
        "rgba(236, 72, 153, 0.2)", // pink
        "rgba(34, 197, 94, 0.15)", // green
        "rgba(251, 146, 60, 0.15)", // orange
      ];
      
      const positions = Array.from({ length: numGlows }, () => ({
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        size: 200 + Math.random() * 400, // 200-600px
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3, // 0-3s delay for animation
      }));
      
      setGlowPositions(positions);
    };

    generateGlowPositions();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" style={{ mixBlendMode: 'screen' }}>
      {glowPositions.map((glow, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            backgroundColor: glow.color,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: glow.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

