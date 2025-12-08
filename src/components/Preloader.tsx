"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const readinessRef = useRef({ window: false, hero: false });
  const [allReady, setAllReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const resolveReady = useCallback((key: "window" | "hero") => {
    if (!readinessRef.current[key]) {
      readinessRef.current[key] = true;
      if (readinessRef.current.window && readinessRef.current.hero) {
        setAllReady(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleWindowLoaded = () => resolveReady("window");

    if (document.readyState === "complete") {
      handleWindowLoaded();
    } else {
      window.addEventListener("load", handleWindowLoaded, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleWindowLoaded as () => void);
    };
  }, [resolveReady]);

  useEffect(() => {
    const handleHeroReady = () => resolveReady("hero");
    window.addEventListener("hero:video-ready", handleHeroReady, { once: true });

    const fallbackTimer = window.setTimeout(() => {
      resolveReady("hero");
    }, 7000);

    return () => {
      window.removeEventListener("hero:video-ready", handleHeroReady as () => void);
      window.clearTimeout(fallbackTimer);
    };
  }, [resolveReady]);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        let next = prev;

        if (allReady) {
          next = prev + (100 - prev) * 0.25;
        } else {
          next = Math.min(prev + Math.random() * 5 + 1, 96);
        }

        if (next >= 99.5) {
          next = 100;
          window.clearInterval(interval);
          window.setTimeout(() => setIsHidden(true), 350);
        }

        return next;
      });
    }, 140);

    return () => {
      window.clearInterval(interval);
    };
  }, [allReady, shouldRender]);

  useEffect(() => {
    if (isHidden && containerRef.current) {
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        yPercent: -10,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setShouldRender(false),
      });
    }
  }, [isHidden]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#141b38]"
    >
      <div className="flex flex-col items-center gap-10 px-6 text-white">
        <div className="preloader-logo-wrapper">
          <Image
            src="/logo-w.png"
            alt="Company Logo"
            width={240}
            height={80}
            priority
            className="preloader-logo"
          />
        </div>

        <div className="w-72 max-w-[80vw]">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00bef7] via-[#00bef7] to-[#00bef7]"
              style={{
                width: `${Math.min(progress, 100)}%`,
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
