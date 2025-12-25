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
        className="group relative flex h-auto min-h-[350px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm transition-all duration-300 hover:border-[#00bef7]/50 touch-manipulation"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex h-full flex-col rounded-2xl bg-transparent p-4 overflow-hidden">
          <div className="flex justify-center flex-shrink-0 mb-3">
            <div className="relative w-[60px] h-[60px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-contain"
                sizes="60px"
              />
            </div>
          </div>

          <div className="space-y-1.5 flex-shrink-0 mb-3">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {service.title}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#00bef7]/80 leading-tight">
              {service.summaryMobile}
            </p>
          </div>

          <p className="text-xs leading-normal text-gray-700 flex-1 overflow-y-auto min-h-0 mb-3">
            {service.descriptionMobile}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200 flex-shrink-0">
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
      className="group relative flex h-[450px] sm:h-[500px] md:h-[520px] flex-col overflow-hidden rounded-2xl sm:rounded-[30px] border border-white/12 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm perspective-[1600px] cursor-pointer transition-all duration-300 hover:border-[#00bef7]/50 touch-manipulation"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onFlip}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
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
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#00bef7] transition-colors duration-200 leading-tight">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/80 leading-tight p-0 m-0">
          {service.summary}
        </p>
      </div>

      <p className="text-xs sm:text-sm leading-normal text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-1 overflow-y-auto min-h-0 p-0 m-0 mb-2 sm:mb-4 md:mb-6">
        {service.description}
      </p>

      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.4em] pt-2 sm:pt-3 md:pt-4 border-t border-gray-200 flex-shrink-0">
        <span className="inline-flex h-1 w-6 sm:w-8 rounded-full bg-gray-300 group-hover:bg-[#00bef7] transition-colors duration-300" />
        <span className="text-gray-600">Click to Explore</span>
      </div>
    </div>
  );
}

function CardBack({ service }: { service: Service }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col rounded-2xl sm:rounded-[30px] bg-white p-3 sm:p-4 md:p-6 text-left text-gray-900 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
      {/* Header Section - Compact */}
      <div className="space-y-1 sm:space-y-1.5 md:space-y-2 flex-shrink-0 mb-2 sm:mb-3 md:mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00bef7]/80">
            Service Details
          </span>
          <span className="text-[10px] sm:text-xs text-gray-500 truncate ml-1">
            {service.title}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
          {service.title}
        </h3>
        <p className="text-[10px] sm:text-xs leading-normal text-gray-700 line-clamp-2 p-0 m-0">
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
            <li key={feature} className="flex items-start gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs text-gray-700 leading-relaxed">
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
        <span className="text-gray-600 text-[9px] sm:text-[10px]">Click to flip back</span>
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
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);
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

    // Calculate offsets to center all cards, then spread them out
    const calculateCardOffsets = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      
      if (!isLargeScreen || cardEls.length < 3) {
        return { initial: [0, 0, 0], final: [0, 0, 0] };
      }
      
      const middleCard = cardEls[1];
      const leftCard = cardEls[0];
      const rightCard = cardEls[2];
      
      if (middleCard && leftCard && rightCard) {
        // Get natural grid positions
        const middleRect = middleCard.getBoundingClientRect();
        const leftRect = leftCard.getBoundingClientRect();
        const rightRect = rightCard.getBoundingClientRect();
        
        // Calculate offsets from natural positions to center
        // Left card needs to move RIGHT to reach center (positive offset)
        // Right card needs to move LEFT to reach center (negative offset)
        const leftToCenter = middleRect.left - leftRect.left;
        const rightToCenter = middleRect.right - rightRect.right;
        
        return {
          initial: [leftToCenter, 0, rightToCenter], // Offsets to center
          final: [0, 0, 0], // Back to natural positions (x: 0 means no transform = natural grid position)
        };
      }
      
      // Fallback calculation
      const baseOffset = Math.min(window.innerWidth * 0.15, 450);
      return {
        initial: [baseOffset, 0, -baseOffset],
        final: [0, 0, 0],
      };
    };

    const offsets = calculateCardOffsets();

    // Set initial positions: all cards stacked in center
    cardEls.forEach((card, index) => {
      if (card) {
        // All cards start stacked in center with slight offset for stacking effect
        const stackOffset = index * 5; // Small offset to show stacking
        const stackRotation = (index - 1) * 3; // Slight rotation for stacking effect
        const centerX = offsets.initial[index] || 0;
        
        gsap.set(card, {
          opacity: 0,
          x: centerX + stackOffset,
          y: 50,
          rotation: stackRotation,
          scale: 0.9,
          zIndex: cardEls.length - index, // Stack order
        });
      }
    });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    // Animate header elements
    if (eyebrowEl) timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.3 });
    if (headingEl) timeline.to(headingEl, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    if (descriptionEl) timeline.to(descriptionEl, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    
    // Animate cards in parallel
    if (cardEls.length) {
      // Phase 1: All cards stack in center and fade in (parallel)
      cardEls.forEach((card, index) => {
        if (card) {
          const centerX = offsets.initial[index] || 0;
          timeline.to(
            card,
            {
              opacity: 1,
              x: centerX, // Move to center (removing stack offset)
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            0.15 // All cards start at the same time (parallel)
          );
        }
      });

      // Phase 2: Outer cards move left and right to their natural positions (parallel)
      cardEls.forEach((card, index) => {
        if (card && (index === 0 || index === 2)) {
          const finalX = offsets.final[index] || 0;
          timeline.to(
            card,
            {
              x: finalX, // Move to natural grid position
              duration: 0.5,
              ease: "back.out(1.4)",
            },
            ">0.1" // Start after stacking is complete (parallel for both outer cards)
          );
        }
      });
    }

    timelineRef.current = timeline;

    const playTimeline = () => {
      if (hasAnimatedRef.current || !timelineRef.current) return;
      hasAnimatedRef.current = true;
      timelineRef.current.play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playTimeline();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
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
      className="relative min-h-[100vh] bg-[#1a2342] py-20 flex items-center"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-3 sm:mb-4"
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

