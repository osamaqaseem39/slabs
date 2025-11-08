"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="text-white py-16 px-4"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo-full.jpeg"
                alt="Company Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain filter brightness-0 invert"
              />
            </motion.div>
            <p className="mb-6 leading-relaxed opacity-80">
              Leading digital marketing agency specializing in WordPress
              development, SEO, and comprehensive digital solutions. Grow your
              business online with our expert team.
            </p>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                (social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-sm">{social[0]}</span>
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3 opacity-80">
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:opacity-100">
                  WordPress Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  SEO Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  E-Commerce Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web Design
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <ul className="space-y-4 opacity-80">
              <li className="flex items-start">
                <span className="mr-3">📧</span>
                <a href="mailto:info@example.com" className="hover:text-white transition-colors hover:opacity-100">
                  info@example.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📱</span>
                <a href="tel:+1234567890" className="hover:text-white transition-colors hover:opacity-100">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📍</span>
                <span>123 Business Street<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center opacity-60" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
          <p>
            © {new Date().getFullYear()} Digital Marketing Agency. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
