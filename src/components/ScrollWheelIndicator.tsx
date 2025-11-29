"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import useUnifiedSectionScroll from "@/hooks/useUnifiedSectionScroll";
import { smoothScrollIntoView, DEFAULT_SCROLL_DURATION } from "@/lib/smoothScroll";

type SectionConfig = {
  id: string;
  label: string;
};

const SECTION_CONFIG: SectionConfig[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "technology", label: "Technology" },
  { id: "how-it-works", label: "How It Works" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function ScrollWheelIndicator() {
  const [activeSection, setActiveSection] = useState<string>(SECTION_CONFIG[0]?.id ?? "");
  const [hasMounted, setHasMounted] = useState(false);
  const sectionIds = useMemo(() => SECTION_CONFIG.map((section) => section.id), []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const globalWindow = window as typeof window & {
      __heroThirdScrollComplete?: boolean;
    };

    if (globalWindow.__heroThirdScrollComplete) {
      setActiveSection("services");
    }

    const handleThirdScrollComplete = () => {
      setActiveSection("services");
    };

    window.addEventListener("hero:third-scroll-complete", handleThirdScrollComplete);

    return () => {
      window.removeEventListener("hero:third-scroll-complete", handleThirdScrollComplete);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (topEntry) {
          setActiveSection((prev) => (prev === topEntry.target.id ? prev : topEntry.target.id));
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: Array.from({ length: 11 }, (_, index) => index / 10),
      }
    );

    SECTION_CONFIG.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScrollExtremes = () => {
      if (window.scrollY < window.innerHeight * 0.25) {
        setActiveSection("home");
        return;
      }

      const doc = document.documentElement;
      const scrollBottom = doc.scrollHeight - (window.scrollY + window.innerHeight);
      if (scrollBottom < window.innerHeight * 0.25) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScrollExtremes, { passive: true });
    handleScrollExtremes();

    return () => {
      window.removeEventListener("scroll", handleScrollExtremes);
    };
  }, []);

  const activeSectionMeta = useMemo(() => {
    const fallback = SECTION_CONFIG[0];
    return SECTION_CONFIG.find((section) => section.id === activeSection) ?? fallback;
  }, [activeSection]);

  const activeIndex = useMemo(() => {
    const index = SECTION_CONFIG.findIndex((section) => section.id === activeSectionMeta.id);
    return index >= 0 ? index : 0;
  }, [activeSectionMeta.id]);

  const handleScrollTo = useCallback((targetId: string) => {
    if (typeof window === "undefined") {
      return false;
    }

    const element = document.getElementById(targetId);
    if (element) {
      smoothScrollIntoView(element, { duration: DEFAULT_SCROLL_DURATION });
      return true;
    }
    return false;
  }, []);

  useUnifiedSectionScroll({
    sections: sectionIds,
    activeId: activeSectionMeta.id,
    navigate: handleScrollTo,
    enabled: hasMounted,
  });

  return (
    <motion.div
      className="pointer-events-none fixed left-6 top-1/3 z-40 hidden -translate-y-1/2 flex-col items-start gap-4 lg:flex"
      initial={{ opacity: 0, x: -24 }}
      animate={hasMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-auto relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_18px_36px_rgba(15,23,42,0.35)] backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={hasMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <motion.span
          className="absolute left-1 top-[18px] h-8 w-[2px] rounded-full bg-[#00BDFF] shadow-[0_0_12px_rgba(0,189,255,0.8)]"
          initial={false}
          animate={{ top: 18 + activeIndex * 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {SECTION_CONFIG.map((section, index) => {
          const isActive = section.id === activeSectionMeta.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => handleScrollTo(section.id)}
              className={`flex h-8 items-center pl-4 pr-3 text-left text-xs uppercase tracking-[0.35em] transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/40 hover:text-white/60"
              }`}
              initial={{ opacity: 0, x: -12 }}
              animate={hasMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.18 + index * 0.06,
              }}
            >
              {section.label}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

