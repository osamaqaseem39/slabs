"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type Model3DProps = {
  type?: "cube" | "pyramid" | "cylinder" | "sphere" | "torus";
  size?: number;
  color?: string;
  glowColor?: string;
  rotationSpeed?: number;
  autoRotate?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function Model3D({
  type = "cube",
  size = 120,
  color = "#00BDFF",
  glowColor = "#00BDFF",
  rotationSpeed = 0.5,
  autoRotate = true,
  className = "",
  children,
}: Model3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!autoRotate && !isHovered) return;

    const animate = () => {
      setRotation((prev) => ({
        x: prev.x + (autoRotate ? rotationSpeed * 0.3 : 0),
        y: prev.y + (autoRotate ? rotationSpeed : 0),
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate, rotationSpeed, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = ((e.clientX - centerX) / rect.width) * 180;
    const mouseY = ((e.clientY - centerY) / rect.height) * 180;

    setRotation({
      x: mouseY * 0.3,
      y: mouseX,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoRotate) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const renderModel = () => {
    const halfSize = size / 2;
    const style = {
      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      transformStyle: "preserve-3d" as const,
      transition: isHovered ? "none" : "transform 0.1s ease-out",
    };

    switch (type) {
      case "cube":
        return (
          <div style={style} className="relative w-full h-full">
            {/* Front */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translateZ(${halfSize}px)`,
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                border: `1px solid ${color}40`,
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Back */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                border: `1px solid ${color}40`,
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Right */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                border: `1px solid ${color}50`,
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Left */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                border: `1px solid ${color}50`,
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Top */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                background: `linear-gradient(135deg, ${color}25, ${color}15)`,
                border: `1px solid ${color}60`,
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Bottom */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                border: `1px solid ${color}30`,
                backdropFilter: "blur(10px)",
              }}
            />
          </div>
        );

      case "pyramid":
        const pyramidHeight = size * 0.8;
        const baseSize = size;
        return (
          <div style={style} className="relative w-full h-full">
            {/* Base (square) */}
            <div
              className="absolute"
              style={{
                width: `${baseSize}px`,
                height: `${baseSize}px`,
                transform: `rotateX(-90deg) translateZ(-${pyramidHeight * 0.3}px)`,
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                border: `1px solid ${color}50`,
                clipPath: "polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)",
              }}
            />
            {/* Front face */}
            <div
              className="absolute"
              style={{
                width: `${baseSize}px`,
                height: `${pyramidHeight}px`,
                transform: `rotateX(35deg) rotateY(0deg) translateZ(${baseSize * 0.25}px)`,
                background: `linear-gradient(135deg, ${color}30, ${color}15)`,
                border: `1px solid ${color}60`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                transformOrigin: "bottom center",
              }}
            />
            {/* Right face */}
            <div
              className="absolute"
              style={{
                width: `${baseSize}px`,
                height: `${pyramidHeight}px`,
                transform: `rotateX(35deg) rotateY(90deg) translateZ(${baseSize * 0.25}px)`,
                background: `linear-gradient(135deg, ${color}25, ${color}12)`,
                border: `1px solid ${color}55`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                transformOrigin: "bottom center",
              }}
            />
            {/* Back face */}
            <div
              className="absolute"
              style={{
                width: `${baseSize}px`,
                height: `${pyramidHeight}px`,
                transform: `rotateX(35deg) rotateY(180deg) translateZ(${baseSize * 0.25}px)`,
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                border: `1px solid ${color}50`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                transformOrigin: "bottom center",
              }}
            />
            {/* Left face */}
            <div
              className="absolute"
              style={{
                width: `${baseSize}px`,
                height: `${pyramidHeight}px`,
                transform: `rotateX(35deg) rotateY(-90deg) translateZ(${baseSize * 0.25}px)`,
                background: `linear-gradient(135deg, ${color}18, ${color}08)`,
                border: `1px solid ${color}45`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                transformOrigin: "bottom center",
              }}
            />
          </div>
        );

      case "cylinder":
        return (
          <div style={style} className="relative w-full h-full">
            {/* Top circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translateZ(${size * 0.5}px)`,
                background: `radial-gradient(circle, ${color}30, ${color}10)`,
                border: `2px solid ${color}60`,
              }}
            />
            {/* Bottom circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translateZ(-${size * 0.5}px) rotateX(180deg)`,
                background: `radial-gradient(circle, ${color}20, ${color}05)`,
                border: `2px solid ${color}40`,
              }}
            />
            {/* Side (simplified as a rectangle) */}
            <div
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotateY(90deg) translateZ(${size * 0.5}px)`,
                background: `linear-gradient(180deg, ${color}25, ${color}15, ${color}10)`,
                border: `1px solid ${color}50`,
                borderRadius: `${size / 2}px`,
              }}
            />
          </div>
        );

      case "torus":
        return (
          <div style={style} className="relative w-full h-full">
            {/* Outer ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `3px solid ${color}60`,
                boxShadow: `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}20`,
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${size * 0.6}px`,
                height: `${size * 0.6}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: `2px solid ${color}40`,
                boxShadow: `0 0 15px ${glowColor}30`,
              }}
            />
            {/* Glow effect */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${size * 1.2}px`,
                height: `${size * 1.2}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${glowColor}20, transparent 70%)`,
                filter: "blur(10px)",
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className}`}
      style={{
        perspective: "1000px",
        width: `${size}px`,
        height: `${size}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {renderModel()}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

