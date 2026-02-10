"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/Preloader";
import GlowEffects from "@/components/GlowEffects";
import HeroSection from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";
import TechnologySection from "@/sections/TechnologySection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import AboutSection from "@/sections/AboutSection";
import WhyChooseUsSection from "../sections/WhyChooseUsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import PortfolioSection from "../sections/PortfolioSection";
import ContactSection from "@/sections/ContactSection";
import FooterSection from "../sections/FooterSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const clearHash = () => {
      if (!window.location.hash) {
        return;
      }

      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    };

    const handleScroll = () => {
      clearHash();
    };

    clearHash();
    window.addEventListener("hashchange", clearHash);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", clearHash);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen relative">
      <GlowEffects />
      <Preloader />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TechnologySection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
