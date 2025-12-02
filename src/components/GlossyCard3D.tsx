"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  type ReactNode,
  type CSSProperties,
} from "react";

type GlossyCard3DProps = {
  children: ReactNode;
  className?: string;
  flipOnHover?: boolean;
  isFlipped?: boolean;
  tiltIntensity?: number;
  glossyIntensity?: number;
  backContent?: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const GlossyCard3D = forwardRef<HTMLDivElement, GlossyCard3DProps>(
  function GlossyCard3D(
    {
      children,
      className = "",
      flipOnHover = false,
      isFlipped: externalIsFlipped,
      tiltIntensity = 15,
      glossyIntensity = 0.6,
      backContent,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) {
    const internalRef = useRef<HTMLDivElement>(null);
    const [internalIsFlipped, setInternalIsFlipped] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    // Use external flip state if provided, otherwise use internal
    const isFlipped =
      externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

    // Combine refs
    const cardRef = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      const card = internalRef.current;
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (rect.height / 2)) * -tiltIntensity;
        const rotateY = (mouseX / (rect.width / 2)) * tiltIntensity;

        setTilt({ x: rotateX, y: rotateY });

        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: relativeX, y: relativeY });
      };

      const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
        if (flipOnHover && externalIsFlipped === undefined) {
          setInternalIsFlipped(false);
        }
        onMouseLeave?.();
      };

      const handleMouseEnter = () => {
        setIsHovered(true);
        if (flipOnHover && externalIsFlipped === undefined) {
          setInternalIsFlipped(true);
        }
        onMouseEnter?.();
      };

      if (isHovered) {
        card.addEventListener("mousemove", handleMouseMove);
      }

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [
      isHovered,
      tiltIntensity,
      flipOnHover,
      externalIsFlipped,
      onMouseEnter,
      onMouseLeave,
    ]);

    const handleClick = () => {
      if (flipOnHover && externalIsFlipped === undefined) {
        setInternalIsFlipped(!internalIsFlipped);
      }
    };

    const cardStyle: CSSProperties = {
      transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
        isFlipped ? "rotateY(180deg)" : ""
      }`,
      transformStyle: "preserve-3d",
      transition: isHovered
        ? "none"
        : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    };

    const shineStyle: CSSProperties = {
      background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, ${glossyIntensity * (isHovered ? 0.5 : 0.15)}) 0%, transparent 70%)`,
      opacity: isHovered ? 1 : 0.4,
      transition: "opacity 0.4s ease, background 0.1s ease",
    };

    const glowStyle: CSSProperties = {
      background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0, 189, 255, ${isHovered ? 0.3 : 0.1}) 0%, transparent 60%)`,
      opacity: isHovered ? 1 : 0,
      transition: "opacity 0.4s ease",
    };

    return (
      <div
        ref={cardRef}
        className={`relative h-full [perspective:1200px] ${className}`}
        onClick={handleClick}
      >
        <div
          style={cardStyle}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Front Face */}
          <div className="relative h-full w-full [backface-visibility:hidden]">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-transparent shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
              {/* Animated glow effect */}
              <div
                className="pointer-events-none absolute -inset-[2px] rounded-3xl blur-xl"
                style={glowStyle}
              />

              {/* Glossy shine overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={shineStyle}
              />

              {/* Animated gradient border glow */}
              <div
                className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#00BDFF]/30 via-[#00BDFF]/15 to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Inner glow effect */}
              <div className="absolute inset-[1px] rounded-[23px] bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-60" />

              {/* Subtle reflection lines */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background: `linear-gradient(${
                    (mousePosition.x - 0.5) * 45 + 135
                  }deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full w-full">{children}</div>
            </div>
          </div>

          {/* Back Face (if flipOnHover is true) */}
          {flipOnHover && backContent && (
            <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-transparent shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
                {/* Animated glow effect for back */}
                <div
                  className="pointer-events-none absolute -inset-[2px] rounded-3xl blur-xl"
                  style={glowStyle}
                />

                {/* Glossy shine overlay for back */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={shineStyle}
                />

                {/* Animated gradient border glow */}
                <div
                  className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#00BDFF]/30 via-[#00BDFF]/15 to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-[1px] rounded-[23px] bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-60" />

                {/* Subtle reflection lines */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    background: `linear-gradient(${
                      (mousePosition.x - 0.5) * 45 + 135
                    }deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
                  }}
                />

                {/* Back content */}
                <div className="relative z-10 h-full w-full">{backContent}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default GlossyCard3D;

