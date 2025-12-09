"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Expert Team",
    description: "Work with seasoned professionals who bring years of experience and industry expertise to every project.",
    icon: "👥",
    features: [
      "Senior developers & designers",
      "Cross-functional expertise",
      "Proven track record",
      "Continuous learning culture",
    ],
  },
  {
    title: "Fast Delivery",
    description: "Agile methodologies and efficient workflows ensure your project moves forward quickly without compromising quality.",
    icon: "⚡",
    features: [
      "Agile development process",
      "Weekly sprint reviews",
      "Rapid prototyping",
      "Quick iterations",
    ],
  },
  {
    title: "Quality Focus",
    description: "Every line of code and every design decision is made with quality, scalability, and maintainability in mind.",
    icon: "✨",
    features: [
      "Code quality standards",
      "Comprehensive testing",
      "Performance optimization",
      "Best practices",
    ],
  },
  {
    title: "Long-term Support",
    description: "We don't just build and leave. We provide ongoing support, maintenance, and updates to keep your project thriving.",
    icon: "🛡️",
    features: [
      "Ongoing maintenance",
      "Regular updates",
      "24/7 support available",
      "Scalability planning",
    ],
  },
];

const STATS = [
  { label: "Projects Delivered", value: "100+" },
  { label: "Happy Clients", value: "50+" },
  { label: "Years Experience", value: "5+" },
  { label: "Team Members", value: "15+" },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const statsRef = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const cardEls = cardsRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    const statEls = statsRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    const elements = [eyebrowEl, headingEl, descriptionEl, ...cardEls, ...statEls].filter(Boolean);

    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 40 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5 });
    if (headingEl) timeline.to(headingEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    if (descriptionEl) timeline.to(descriptionEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    if (cardEls.length) {
      timeline.to(cardEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.3");
    }
    if (statEls.length) {
      timeline.to(statEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.2");
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

  cardsRef.current.length = BENEFITS.length;
  statsRef.current.length = STATS.length;

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#141b38] py-20 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p
            ref={eyebrowRef}
            className="text-base uppercase tracking-[0.4em] text-[#00bef7] mb-4"
          >
            Why Choose Us
          </p>
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4 whitespace-nowrap"
          >
            Built to scale with you
          </h2>
          <p
            ref={descriptionRef}
            className="text-sm md:text-base text-white/70 leading-normal max-w-3xl mx-auto"
          >
            We combine expertise, speed, and quality to deliver solutions that grow with your business. 
            Our team is committed to your success, from initial concept to long-term support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 max-w-7xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              ref={(el) => {
                cardsRef.current[index] = el as HTMLDivElement | null;
              }}
              className="group relative overflow-hidden rounded-[30px] border border-white/12 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm transition-all duration-500 hover:border-[#00bef7]/50 hover:bg-white/90 p-8"
              whileHover={{ y: -8 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#00bef7] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <ul className="mt-auto space-y-2 pt-6 border-t border-gray-200">
                  {benefit.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00bef7] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#00bef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={(el) => {
                statsRef.current[index] = el as HTMLDivElement | null;
              }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-700 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
