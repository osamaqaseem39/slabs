"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

type TestimonialEntry = {
  serviceTitle: string;
  quote: string;
  author: string;
  role?: string;
};

const TESTIMONIALS: TestimonialEntry[] = [
  {
    serviceTitle: "Medical Billing & Revenue Cycle Management",
    quote: "Our clean claim rate went from 78% to 94% in six months. Denials dropped and cash flow improved dramatically.",
    author: "Dr. Patricia N.",
    role: "Multi-Specialty Practice Owner",
  },
  {
    serviceTitle: "Medical Billing & Revenue Cycle Management",
    quote: "They integrated with our EHR and took over billing end-to-end. We finally have time to focus on patients, not paperwork.",
    author: "Linda G.",
    role: "Practice Administrator",
  },
  {
    serviceTitle: "Medical Billing & Revenue Cycle Management",
    quote: "Synovo Labs understood our specialty coding from day one. Reimbursements are faster and our staff is less stressed.",
    author: "Robert F.",
    role: "Cardiology Practice Manager",
  },
  {
    serviceTitle: "AI Development & Automation",
    quote: "Synovo Labs built an AI agent that cut our support tickets by 40%. The team understood our workflow from day one.",
    author: "Sarah M.",
    role: "Operations Director",
  },
  {
    serviceTitle: "AI Development & Automation",
    quote: "Their voice AI handles after-hours calls seamlessly. Our patients get answers and we get peace of mind.",
    author: "James K.",
    role: "Healthcare Admin",
  },
  {
    serviceTitle: "Web & Mobile Development",
    quote: "Our new platform went live on time and our users love it. Synovo Labs delivered exactly what we needed.",
    author: "Alex T.",
    role: "Startup Founder",
  },
  {
    serviceTitle: "Web & Mobile Development",
    quote: "They integrated our Shopify store with our internal systems. Sales and operations are finally in sync.",
    author: "Maria L.",
    role: "E-commerce Manager",
  },
  {
    serviceTitle: "Video & Graphics Production",
    quote: "Our YouTube channel grew 3x after they took over editing. Thumbnails and pacing are on point.",
    author: "Chris R.",
    role: "Content Creator",
  },
  {
    serviceTitle: "Video & Graphics Production",
    quote: "They delivered a full VSL and ad creatives in two weeks. Conversion rate improved immediately.",
    author: "David P.",
    role: "Marketing Lead",
  },
  {
    serviceTitle: "SEO & Digital Marketing",
    quote: "We went from page 5 to top 3 for our main keywords. Their technical SEO and content strategy made the difference.",
    author: "Jennifer W.",
    role: "Brand Manager",
  },
  {
    serviceTitle: "SEO & Digital Marketing",
    quote: "Local visibility and GBM optimization brought us a steady stream of new patients. ROI was clear within months.",
    author: "Michael H.",
    role: "Practice Owner",
  },
  {
    serviceTitle: "Game Development",
    quote: "They built our mobile game from concept to store. Art, mechanics, and polish — everything we asked for.",
    author: "Elena V.",
    role: "Indie Game Developer",
  },
  {
    serviceTitle: "Game Development",
    quote: "Our multiplayer prototype became a full release. Synovo Labs understood game design and tech equally well.",
    author: "Tom S.",
    role: "Studio Lead",
  },
];

const SERVICE_OPTIONS = ["All", ...Array.from(new Set(TESTIMONIALS.map((t) => t.serviceTitle)))];

function getServiceShortLabel(title: string): string {
  if (title === "All") return "All services";
  const short: Record<string, string> = {
    "Medical Billing & Revenue Cycle Management": "Medical Billing",
    "AI Development & Automation": "AI & Automation",
    "Web & Mobile Development": "Web & Mobile",
    "Video & Graphics Production": "Video & Graphics",
    "SEO & Digital Marketing": "SEO & Marketing",
    "Game Development": "Game Development",
  };
  return short[title] ?? title.split(" ").slice(0, 2).join(" ");
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const filtered = filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.serviceTitle === filter);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const elements = [eyebrowEl, headingEl, descriptionEl].filter(Boolean);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 40 });
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    if (eyebrowEl) timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5 });
    if (headingEl) timeline.to(headingEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    if (descriptionEl) timeline.to(descriptionEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) timeline.play();
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(sectionEl);
    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, []);

  // Reset carousel to first item when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const showCount = filtered.length;
  const hasMultiple = showCount > 1;

  const handlePrev = () => {
    if (!showCount) return;
    setCurrentIndex((prev) => (prev - 1 + showCount) % showCount);
  };

  const handleNext = () => {
    if (!showCount) return;
    setCurrentIndex((prev) => (prev + 1) % showCount);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#1a2342] py-20 flex items-center z-10"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-14">
          <p
            ref={eyebrowRef}
            className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white mb-3 sm:mb-4"
          >
            Testimonials
          </p>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 max-w-layout-xl leading-tight"
          >
            What our clients say
          </h2>
          <p
            ref={descriptionRef}
            className="text-xs sm:text-sm md:text-base text-[#00bef7] leading-normal max-w-3xl mx-auto px-4"
          >
            Real feedback from practices and teams we’ve worked with — from medical billing to AI, web, and more.
          </p>
        </div>

        {/* Filter by service */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {SERVICE_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                filter === option
                  ? "bg-[#00bef7] text-[#0f172a] border border-[#00bef7]"
                  : "border border-white/30 bg-white/5 text-white/80 hover:border-[#00bef7]/50 hover:text-white"
              }`}
            >
              {getServiceShortLabel(option)}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {showCount > 0 && (
            <motion.article
              key={`${filtered[currentIndex].serviceTitle}-${filtered[currentIndex].author}-${currentIndex}`}
              className="relative flex flex-col rounded-2xl sm:rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-lg p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-[#00bef7]/50 hover:bg-white/15"
              initial={{ opacity: 0, x: 40, opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#00bef7]/90 mb-2 sm:mb-3">
                {filtered[currentIndex].serviceTitle}
              </p>
              <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed flex-1 mb-4 sm:mb-6">
                &ldquo;{filtered[currentIndex].quote}&rdquo;
              </blockquote>
              <footer className="border-t border-white/20 pt-3 sm:pt-4">
                <cite className="not-italic text-white font-semibold text-sm sm:text-base">
                  {filtered[currentIndex].author}
                </cite>
                {filtered[currentIndex].role && (
                  <span className="block text-[10px] sm:text-xs text-white/70 mt-0.5">
                    {filtered[currentIndex].role}
                  </span>
                )}
              </footer>
            </motion.article>
          )}

          {hasMultiple && (
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-full border border-white/30 text-xs sm:text-sm text-white/80 hover:border-[#00bef7]/60 hover:text-white transition-colors"
              >
                Prev
              </button>
              <div className="flex items-center gap-1.5">
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === currentIndex ? "bg-[#00bef7]" : "bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="px-3 py-1.5 rounded-full border border-white/30 text-xs sm:text-sm text-white/80 hover:border-[#00bef7]/60 hover:text-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
