"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";

type Service = {
  title: string;
  image: string;
  description: string;
  summary: string;
  features: string[];
  highlights: string[];
};

type ServicesSectionProps = {
  id?: string;
};

const services: Service[] = [
  {
    title: "Web Development",
    image: "/service1.png",
    description: "Crafting high-performance, scalable web applications that deliver exceptional user experiences and drive business growth.",
    summary: "From concept to deployment, we build web applications that perform.",
    features: [
      "Custom web applications",
      "Full-stack development",
      "API integration & development",
      "Performance optimization",
      "Responsive design",
      "Progressive Web Apps (PWA)",
    ],
    highlights: [
      "Modern frameworks (Next.js, React, Node.js)",
      "Cloud-native architecture",
      "SEO-optimized solutions",
    ],
  },
  {
    title: "UI/UX Design",
    image: "/service2.png",
    description: "Creating intuitive, beautiful interfaces that users love. We combine user research, design thinking, and modern aesthetics to craft experiences that convert.",
    summary: "Design that bridges user needs with business objectives.",
    features: [
      "User interface design",
      "User experience research",
      "Interactive prototypes",
      "Design systems",
      "Brand identity",
      "Accessibility compliance",
    ],
    highlights: [
      "User-centered approach",
      "Design-to-code handoff",
      "Continuous design iteration",
    ],
  },
  {
    title: "Digital Strategy",
    image: "/service3.png",
    description: "Strategic consulting to align your digital presence with business goals. We analyze, plan, and execute data-driven strategies that deliver measurable results.",
    summary: "Strategic planning that transforms vision into action.",
    features: [
      "Digital transformation",
      "Technical consulting",
      "Product strategy",
      "Growth planning",
      "Analytics & insights",
      "Roadmap development",
    ],
    highlights: [
      "Data-driven decisions",
      "Scalable solutions",
      "Long-term partnerships",
    ],
  },
];

function ServiceCard({ service, index, isFlipped, onFlip }: { service: Service; index: number; isFlipped: boolean; onFlip: () => void }) {
  return (
    <motion.article
      className="group relative flex h-[500px] md:h-[520px] flex-col overflow-hidden rounded-[30px] border border-white/12 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm perspective-[1600px] cursor-pointer transition-all duration-300 hover:border-[#00bef7]/50"
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
    <div className="absolute inset-0 flex h-full flex-col rounded-[30px] bg-transparent p-6 [backface-visibility:hidden] overflow-hidden">
      <div className="flex justify-center flex-shrink-0 mb-6">
        <div className="relative w-[120px] h-[120px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain"
            sizes="120px"
          />
        </div>
      </div>

      <div className="space-y-2 flex-shrink-0 mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#00bef7] transition-colors duration-200 leading-tight">
          {service.title}
        </h3>
        <p className="text-sm uppercase tracking-[0.3em] text-[#00bef7]/80 leading-tight p-0 m-0">
          {service.summary}
        </p>
      </div>

      <p className="text-sm leading-normal text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-1 overflow-y-auto min-h-0 p-0 m-0 mb-6">
        {service.description}
      </p>

      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.4em] pt-4 border-t border-gray-200 flex-shrink-0">
        <span className="inline-flex h-1 w-8 rounded-full bg-gray-300 group-hover:bg-[#00bef7] transition-colors duration-300" />
        <span className="text-gray-600">Click to Explore</span>
      </div>
    </div>
  );
}

function CardBack({ service }: { service: Service }) {
  return (
    <div className="absolute inset-0 flex h-full flex-col rounded-[30px] bg-white p-6 text-left text-gray-900 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
      {/* Header Section - Compact */}
      <div className="space-y-2 flex-shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm uppercase tracking-[0.3em] text-[#00bef7]/80">
            Service Details
          </span>
          <span className="text-xs text-gray-500 truncate ml-1">
            {service.title}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {service.title}
        </h3>
        <p className="text-xs leading-normal text-gray-700 line-clamp-2 p-0 m-0">
          {service.description}
        </p>
      </div>

      {/* Features List - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[#00bef7]/70 flex-shrink-0 mb-2 p-0 m-0">
          Core Services
        </p>
        <ul className="space-y-1.5 pr-1">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
              <span className="mt-1 h-1 w-1 rounded-full bg-[#00bef7] flex-shrink-0" />
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights Section - Compact */}
      <div className="space-y-2 pt-3 border-t border-white/10 flex-shrink-0 mb-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[#00bef7]/70 p-0 m-0">
          Key Highlights
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.highlights.map((highlight) => (
            <span
              key={highlight}
              className="px-2.5 py-0.5 text-xs rounded-full border border-[#00bef7]/40 bg-[#00bef7]/15 text-[#00bef7] leading-tight"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Compact */}
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.3em] pt-3 border-t border-white/10 flex-shrink-0">
        <span className="inline-flex h-1 w-8 rounded-full bg-[#00bef7]" />
        <span className="text-gray-600 text-[10px]">Click to flip back</span>
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
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <p
            ref={eyebrowRef}
            className="text-base uppercase tracking-[0.4em] text-white mb-4"
          >
            Services
          </p>
          <h2
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
          >
            What we do
          </h2>
          <p
            ref={descriptionRef}
            className="text-sm md:text-base text-[#00bef7] leading-normal max-w-3xl mx-auto"
          >
            We deliver end-to-end solutions that combine strategy, design, and development to help your business thrive in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
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

