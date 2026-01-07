"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";

type Service = {
  title: string;
  image: string;
  description: string;
  descriptionMobile: string;
  summary: string;
  summaryMobile: string;
  features: string[];
  highlights: string[];
};

type ServicesSectionProps = {
  id?: string;
};

const services: Service[] = [
  {
    title: "AI Development & Automation",
    image: "/service1.png",
    description: "Harness the power of artificial intelligence to automate workflows, create intelligent agents, and build AI-powered solutions that transform your business operations.",
    descriptionMobile: "AI automation and intelligent agents for your business.",
    summary: "AI-powered solutions that automate and enhance your business.",
    summaryMobile: "AI automation solutions.",
    features: [
      "AI agents & chatbots",
      "AI automation workflows",
      "AI video generation",
      "AI image creation",
      "Machine learning integration",
      "Natural language processing",
    ],
    highlights: [
      "Custom AI solutions",
      "Voice AI agents (call handling)",
      "AI content generation",
    ],
  },
  {
    title: "Web & Mobile Development",
    image: "/service2.png",
    description: "Building high-performance web and mobile applications using modern frameworks. From MERN stack to Next.js, we create scalable solutions that drive growth.",
    descriptionMobile: "Modern web and mobile apps with MERN and Next.js.",
    summary: "Modern development stack for web and mobile applications.",
    summaryMobile: "Web & mobile apps.",
    features: [
      "MERN stack development",
      "React & Next.js applications",
      "Mobile app development",
      "CMS development (WordPress, Shopify)",
      "Custom WordPress plugins & themes",
      "Shopify Plus & custom apps",
    ],
    highlights: [
      "Full-stack expertise",
      "E-commerce solutions",
      "API development & integration",
    ],
  },
  {
    title: "Video & Graphics Production",
    image: "/service3.png",
    description: "Professional video editing and graphic design services. From YouTube content to AI-generated videos, we create compelling visual content that engages audiences.",
    descriptionMobile: "Professional video editing and graphic design.",
    summary: "Creative video and graphics that captivate and convert.",
    summaryMobile: "Video & graphics.",
    features: [
      "YouTube video editing (long & short form)",
      "Reels & social media videos",
      "Animations & motion graphics",
      "UGC & VSL content",
      "Logo & brand design",
      "Thumbnails & book covers",
    ],
    highlights: [
      "AI video generation",
      "AI image creation",
      "Professional quality output",
    ],
  },
  {
    title: "SEO & Digital Marketing",
    image: "/service1.png",
    description: "Comprehensive SEO optimization and social media marketing strategies. From GBM optimization to technical SEO, we boost your online visibility and engagement.",
    descriptionMobile: "SEO and social media marketing strategies.",
    summary: "Data-driven SEO and marketing that drives results.",
    summaryMobile: "SEO & marketing.",
    features: [
      "GBM optimization",
      "On-page & off-page SEO",
      "Technical SEO audits",
      "Geo-fencing strategies",
      "Social media marketing",
      "Content marketing",
    ],
    highlights: [
      "Full-service SEO",
      "Local & global optimization",
      "Measurable ROI",
    ],
  },
  {
    title: "Game Development",
    image: "/service2.png",
    description: "Creating engaging games and interactive experiences. From concept to launch, we develop games that captivate players and drive engagement.",
    descriptionMobile: "Engaging games and interactive experiences.",
    summary: "Interactive game experiences that engage and entertain.",
    summaryMobile: "Game development.",
    features: [
      "2D & 3D game development",
      "Mobile game development",
      "Game mechanics & design",
      "Multiplayer integration",
      "Game optimization",
      "Publishing & distribution",
    ],
    highlights: [
      "Cross-platform games",
      "Modern game engines",
      "End-to-end development",
    ],
  },
];

function ServiceCard({ service, index, isFlipped, onFlip }: { service: Service; index: number; isFlipped: boolean; onFlip: () => void }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, render simple card without flip functionality
  if (isMobile) {
    return (
      <motion.article
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_18px_42px_rgba(15,23,42,0.22)] transition-all duration-300 hover:border-[#00bef7]/50 hover:bg-white/15 touch-manipulation"
        style={{ willChange: 'transform, opacity' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: index * 0.1 
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col rounded-2xl bg-transparent p-4">
          <div className="flex justify-center mb-2">
            <div className="relative w-[50px] h-[50px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-contain"
                sizes="50px"
              />
            </div>
          </div>

          <div className="space-y-1 mb-2">
            <h3 className="text-base font-bold text-white leading-tight">
              {service.title}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#00bef7]/90 leading-tight">
              {service.summaryMobile}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-white/80 mb-2.5">
            {service.descriptionMobile}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/20">
            {service.highlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-0.5 text-[10px] rounded-full border border-[#00bef7]/40 bg-[#00bef7]/15 text-[#00bef7] leading-tight"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    );
  }

  // Desktop: render flip card
  return (
    <motion.article
      className="group relative flex h-[450px] sm:h-[500px] md:h-[520px] flex-col overflow-hidden rounded-2xl sm:rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-lg shadow-[0_18px_42px_rgba(15,23,42,0.22)] perspective-[1600px] cursor-pointer transition-all duration-300 hover:border-[#00bef7]/50 hover:bg-white/15 touch-manipulation"
      style={{ willChange: 'transform' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onFlip}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ willChange: 'transform' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front Side */}
        <CardFront service={service} />
        {/* Back Side */}
        <CardBack service={service} />
      </motion.div>
    </motion.article>
  );
}

function CardFront({ service }: { service: Service }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col rounded-2xl sm:rounded-[30px] bg-transparent p-3 sm:p-4 md:p-6 [backface-visibility:hidden] overflow-hidden">
      <div className="flex justify-center flex-shrink-0 mb-2 sm:mb-4 md:mb-6">
        <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
          />
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 md:space-y-2 flex-shrink-0 mb-2 sm:mb-4 md:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#00bef7] transition-colors duration-200 leading-tight">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/90 leading-tight p-0 m-0">
          {service.summary}
        </p>
      </div>

      <p className="text-xs sm:text-sm leading-normal text-white/80 group-hover:text-white transition-colors duration-200 flex-1 overflow-y-auto min-h-0 p-0 m-0 mb-2 sm:mb-4 md:mb-6">
        {service.description}
      </p>

      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] pt-2 sm:pt-3 md:pt-4 border-t border-white/20 flex-shrink-0">
        <span className="inline-flex h-1 w-6 sm:w-8 rounded-full bg-white/30 group-hover:bg-[#00bef7] transition-colors duration-300" />
        <span className="text-white/70">Click to Explore</span>
      </div>
    </div>
  );
}

function CardBack({ service }: { service: Service }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col rounded-2xl sm:rounded-[30px] bg-white/10 backdrop-blur-lg border border-white/20 p-3 sm:p-4 md:p-6 text-left text-white [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
      {/* Header Section - Compact */}
      <div className="space-y-1 sm:space-y-1.5 md:space-y-2 flex-shrink-0 mb-2 sm:mb-3 md:mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/80">
            Service Details
          </span>
          <span className="text-[10px] sm:text-xs text-white/60 truncate ml-1">
            {service.title}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
          {service.title}
        </h3>
        <p className="text-[10px] sm:text-xs leading-normal text-white/80 line-clamp-2 p-0 m-0">
          {service.description}
        </p>
      </div>

      {/* Features List - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto mb-1.5 sm:mb-2 md:mb-3">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/70 flex-shrink-0 mb-1 sm:mb-1.5 md:mb-2 p-0 m-0">
          Core Services
        </p>
        <ul className="space-y-0.5 sm:space-y-1 md:space-y-1.5 pr-1">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs text-white/80 leading-relaxed">
              <span className="mt-1 h-1 w-1 rounded-full bg-[#00bef7] flex-shrink-0" />
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights Section - Compact */}
      <div className="space-y-1 sm:space-y-1.5 md:space-y-2 pt-1.5 sm:pt-2 md:pt-3 border-t border-white/10 flex-shrink-0 mb-1.5 sm:mb-2 md:mb-3">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/70 p-0 m-0">
          Key Highlights
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {service.highlights.map((highlight) => (
            <span
              key={highlight}
              className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs rounded-full border border-[#00bef7]/40 bg-[#00bef7]/15 text-[#00bef7] leading-tight"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Compact */}
      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] pt-1.5 sm:pt-2 md:pt-3 border-t border-white/10 flex-shrink-0">
        <span className="inline-flex h-1 w-6 sm:w-8 rounded-full bg-[#00bef7]" />
        <span className="text-white/70 text-[9px] sm:text-[10px]">Click to flip back</span>
      </div>
    </div>
  );
}

export default function ServicesSection({ id = "services" }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const cardEls = cardsRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    const elements = [eyebrowEl, headingEl, descriptionEl].filter(Boolean);

    if (!elements.length) return;

    // Set initial states for header elements
    gsap.set(elements, { opacity: 0, y: 40 });

    // Set initial states for cards: scale from 50% (0.5) to 100% (1.0)
    cardEls.forEach((card) => {
      if (card) {
        gsap.set(card, {
          opacity: 0,
          scale: 0.5, // Start at 50%
          force3D: true, // Enable hardware acceleration
        });
      }
    });

    // Animate header elements on initial intersection
    const headerTimeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) headerTimeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.3, force3D: true });
    if (headingEl) headerTimeline.to(headingEl, { opacity: 1, y: 0, duration: 0.4, force3D: true }, "-=0.15");
    if (descriptionEl) headerTimeline.to(descriptionEl, { opacity: 1, y: 0, duration: 0.4, force3D: true }, "-=0.15");

    let headerAnimated = false;

    // Scroll-based animation for cards
    const updateCardScale = () => {
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // rect.top is relative to viewport (negative when section is above viewport)
      // Animation starts when section top is at 80% of viewport (just entering)
      // Animation completes when section top is at 20% of viewport (scrolled up)
      const animationStart = windowHeight * 0.8;
      const animationEnd = windowHeight * 0.2;
      const animationRange = animationStart - animationEnd; // 0.6 * windowHeight
      
      // Calculate progress: 0 when rect.top = animationStart, 1 when rect.top = animationEnd
      // As user scrolls down, rect.top decreases, so we invert: (start - current) / range
      const rawProgress = (animationStart - rect.top) / animationRange;
      const scrollProgress = Math.max(0, Math.min(1, rawProgress));
      
      // Animate header elements once section starts entering
      if (!headerAnimated && scrollProgress > 0.1) {
        headerAnimated = true;
        headerTimeline.play();
      }

      // Apply scale and opacity to each card with slight stagger
      cardEls.forEach((card, index) => {
        if (card) {
          // Add slight stagger delay (each card starts slightly later)
          const staggerDelay = index * 0.05;
          const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - staggerDelay) / (1 - staggerDelay)));
          
          // Calculate scale: from 0.5 (50%) to 1.0 (100%) based on scroll progress
          const cardScale = 0.5 + adjustedProgress * 0.5;
          const cardOpacity = Math.min(1, adjustedProgress * 1.5);
          
          gsap.to(card, {
            scale: cardScale,
            opacity: cardOpacity,
            duration: 0.1,
            ease: "none",
            force3D: true,
          });
        }
      });
    };

    // Throttle scroll updates for performance
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateCardScale();
        rafId = null;
      });
    };

    // Initial update
    updateCardScale();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      headerTimeline.kill();
    };
  }, []);

  const handleCardFlip = (index: number) => {
    setFlippedCard((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#1a2342] py-20 flex items-center z-10"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10 md:mb-12">
          <p
            ref={eyebrowRef}
            className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white mb-3 sm:mb-4"
          >
            Services
          </p>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 max-w-layout-xl leading-tight"
          >
            What we do
          </h2>
          <p
            ref={descriptionRef}
            className="text-xs sm:text-sm md:text-base text-[#00bef7] leading-normal max-w-3xl mx-auto px-4"
          >
            <span className="sm:hidden">AI, web, mobile, and digital solutions.</span>
            <span className="hidden sm:inline">From AI development and automation to web & mobile apps, we deliver cutting-edge solutions powered by artificial intelligence and modern development frameworks.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                cardsRef.current[index] = el as HTMLDivElement | null;
              }}
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)' // Force hardware acceleration
              }}
            >
              <ServiceCard
                service={service}
                index={index}
                isFlipped={flippedCard === index}
                onFlip={() => handleCardFlip(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

