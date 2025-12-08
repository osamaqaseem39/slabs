"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { smoothScrollIntoView, DEFAULT_SCROLL_DURATION } from "@/lib/smoothScroll";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToTarget = (target: string, event?: MouseEvent<Element>) => {
    if (event) {
      event.preventDefault();
    }

    if (typeof window === "undefined") return;

    const el = document.querySelector(target);
    if (el instanceof HTMLElement) {
      smoothScrollIntoView(el, { duration: DEFAULT_SCROLL_DURATION });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "py-3" : "py-0"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-3xl border transition-all duration-500 transform-gpu ${
            scrolled
              ? "border-white/20 shadow-[0_12px_48px_rgba(15,23,42,0.25)] backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl px-6 py-2 h-16"
              : "border-transparent bg-transparent shadow-none px-0 py-0 h-20"
          }`}
          style={scrolled ? {
            background: "linear-gradient(to right, #141b38, #00bdff)"
          } : {}}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/logo-full.png"
              alt="Company Logo"
              width={350}
              height={117}
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              onClick={(event) => scrollToTarget("#services", event)}
              className="text-white transition-colors duration-300 hover:text-[#00bef7]"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(event) => scrollToTarget("#portfolio", event)}
              className="text-white transition-colors duration-300 hover:text-[#00bef7]"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              onClick={(event) => scrollToTarget("#contact", event)}
              className="text-white transition-colors duration-300 hover:text-[#00bef7]"
            >
              Contact
            </a>
            <motion.button
              className="px-6 py-2 text-white rounded-full font-semibold"
              style={{ backgroundColor: "#00bef7" }}
              whileHover={{ scale: 1.05, backgroundColor: "#00bef7" }}
              whileTap={{ scale: 0.95 }}
              onClick={(event) => scrollToTarget("#contact", event)}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white transition-colors duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
