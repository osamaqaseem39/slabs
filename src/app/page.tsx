"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/Preloader";
import HeroSection from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";

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

  return (
    <main ref={containerRef} className="min-h-screen">
      <Preloader />
      <Navbar />
      <HeroSection />
      <ServicesSection />

      <section id="about" className="min-h-[100vh] bg-gray-800 flex items-center">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Section 3</h2>
            <p className="text-xl text-white/80">This is another dummy section for scroll testing</p>
          </div>
        </div>
      </section>
      
      <section id="contact" className="min-h-[100vh] bg-gray-700 flex items-center">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Section 4</h2>
            <p className="text-xl text-white/80">This is another dummy section for scroll testing</p>
          </div>
        </div>
      </section>
    </main>
  );
}
