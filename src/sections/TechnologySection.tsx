"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Model3D from "@/components/Model3D";

type Technology = {
  name: string;
  modelType: "cube" | "pyramid" | "torus";
  description: string;
  stack: string[];
  features: string[];
  useCases: string[];
};

const technologies: Technology[] = [
  {
    name: "Frontend",
    modelType: "cube",
    description: "Modern frontend technologies for building responsive, interactive user interfaces that deliver exceptional user experiences.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "WebGL"],
    features: [
      "Server-side rendering (SSR)",
      "Static site generation (SSG)",
      "Component-based architecture",
      "Responsive design systems",
      "Advanced animations",
      "Performance optimization",
    ],
    useCases: [
      "E-commerce platforms",
      "SaaS applications",
      "Marketing websites",
      "Progressive web apps",
      "Interactive dashboards",
      "Real-time applications",
    ],
  },
  {
    name: "Backend",
    modelType: "pyramid",
    description: "Robust backend solutions for scalable applications and seamless API integrations with enterprise-grade security.",
    stack: ["Node.js", "Express", "GraphQL", "REST APIs", "Serverless", "PostgreSQL", "MongoDB", "Redis"],
    features: [
      "RESTful & GraphQL APIs",
      "Microservices architecture",
      "Real-time communication",
      "Database optimization",
      "Authentication & authorization",
      "Caching strategies",
    ],
    useCases: [
      "API development",
      "Microservices",
      "Real-time systems",
      "Data processing",
      "Authentication services",
      "Third-party integrations",
    ],
  },
  {
    name: "DevOps",
    modelType: "torus",
    description: "Streamlined deployment pipelines and infrastructure management for reliable, scalable operations.",
    stack: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions", "Terraform", "Monitoring", "Security"],
    features: [
      "Automated deployments",
      "Container orchestration",
      "Infrastructure as code",
      "Continuous integration",
      "Performance monitoring",
      "Security scanning",
    ],
    useCases: [
      "Cloud infrastructure",
      "CI/CD pipelines",
      "Container management",
      "Monitoring & logging",
      "Security compliance",
      "Scalable deployments",
    ],
  },
  {
    name: "UI/UX",
    modelType: "cube",
    description: "Creating intuitive, beautiful interfaces that users love. We combine user research, design thinking, and modern aesthetics.",
    stack: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "Accessibility", "Usability Testing"],
    features: [
      "User interface design",
      "User experience research",
      "Interactive prototypes",
      "Design systems",
      "Brand identity",
      "Accessibility compliance",
    ],
    useCases: [
      "Web applications",
      "Mobile apps",
      "Design systems",
      "Brand identity",
      "User research",
      "Prototyping",
    ],
  },
  {
    name: "Digital Marketing",
    modelType: "pyramid",
    description: "Strategic digital marketing solutions that drive growth, engagement, and measurable results across all channels.",
    stack: ["SEO", "SEM", "Social Media", "Content Marketing", "Email Marketing", "Analytics", "PPC", "Conversion Optimization"],
    features: [
      "Search engine optimization",
      "Pay-per-click advertising",
      "Social media management",
      "Content strategy",
      "Email campaigns",
      "Analytics & reporting",
    ],
    useCases: [
      "Brand awareness",
      "Lead generation",
      "E-commerce growth",
      "Content marketing",
      "Social media campaigns",
      "SEO optimization",
    ],
  },
];

function TechnologyAccordionItem({ 
  tech, 
  index, 
  isOpen, 
  onToggle, 
  onHover,
  isFirst, 
  isLast 
}: { 
  tech: Technology; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
  onHover: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div 
      className="relative flex flex-col flex-1 w-full"
      onMouseEnter={onHover}
    >
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className={`group relative flex-shrink-0 flex items-center justify-center p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00bef7]/50 transition-all duration-300 w-full border-b border-gray-200 ${
          isOpen 
            ? "bg-white border-[#00bef7]/30" 
            : "bg-white hover:bg-gray-50 hover:border-[#00bef7]/50"
        } ${
          isFirst ? "rounded-t-[30px]" : ""
        } ${
          isLast && !isOpen ? "rounded-b-[30px] border-b-0" : ""
        }`}
      >
        <h3 
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 leading-tight text-center ${
            isOpen 
              ? "text-gray-900" 
              : "text-gray-900 group-hover:text-[#00bef7]"
          }`}
        >
          {tech.name}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 flex-shrink-0"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${
              isOpen ? "text-gray-900" : "text-gray-600"
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </button>

      {/* Accordion Content - Expands Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden bg-white w-full border-b border-gray-200 ${
              isLast ? "rounded-b-[30px] border-b-0" : ""
            }`}
          >
            <div className="px-8 pt-8 pb-12 w-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Technology Stack */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3">
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tech.stack.map((item) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tech.stack.indexOf(item) * 0.03 }}
                        className="px-3 py-1.5 text-xs rounded-full border border-gray-300 bg-gray-50 text-gray-900 font-medium hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2 flex flex-col items-center">
                    {tech.features.map((feature) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: tech.features.indexOf(feature) * 0.05 }}
                        className="flex items-center gap-2 text-xs text-gray-800 leading-relaxed"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00bef7] flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3">
                    Use Cases
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tech.useCases.map((useCase) => (
                      <motion.span
                        key={useCase}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tech.useCases.indexOf(useCase) * 0.03 }}
                        className="px-2.5 py-1 text-xs rounded-lg border border-gray-300 bg-gray-50 text-gray-900 font-medium"
                      >
                        {useCase}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const accordionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const accordionEls = accordionsRef.current.filter((el): el is HTMLDivElement => Boolean(el));

    const elements = [eyebrowEl, headingEl, ...accordionEls].filter(Boolean);

    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 40 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) {
      timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5 });
    }
    if (headingEl) {
      timeline.to(headingEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    }
    if (accordionEls.length) {
      timeline.to(
        accordionEls,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "-=0.3"
      );
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

  // Scroll-based accordion opening
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const accordionEls = accordionsRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!accordionEls.length) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const rect = sectionEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportCenter = window.innerHeight / 2;

        // Check if section is in viewport
        if (rect.bottom < 0 || rect.top > viewportHeight) {
          return;
        }

        // Find which accordion header is closest to viewport center
        let closestIndex = 0;
        let closestDistance = Infinity;

        accordionEls.forEach((accordionEl, index) => {
          if (!accordionEl) return;
          
          const accordionRect = accordionEl.getBoundingClientRect();
          // Get the header button element (first button in the accordion)
          const headerButton = accordionEl.querySelector('button');
          if (!headerButton) return;
          
          const headerRect = headerButton.getBoundingClientRect();
          const headerCenter = headerRect.top + headerRect.height / 2;
          const distance = Math.abs(viewportCenter - headerCenter);

          // Prefer accordions that are above or at the center
          if (headerCenter <= viewportCenter * 1.3 && distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        // Open the closest accordion if it's within a reasonable distance
        if (closestDistance < viewportHeight * 0.7) {
          setOpenAccordion(closestIndex);
        }
      }, 150); // Throttle scroll events
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleAccordionToggle = (index: number) => {
    setOpenAccordion((current) => (current === index ? null : index));
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#141b38] py-20 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <p
            ref={eyebrowRef}
            className="text-base uppercase tracking-[0.4em] text-[#00bef7] mb-4"
          >
            Technologies
          </p>
          <h2
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
          >
            Our stack
          </h2>
        </div>

        {/* Landscape Accordion */}
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="relative rounded-[30px] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.22)] backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  ref={(el) => {
                    accordionsRef.current[index] = el as HTMLDivElement | null;
                  }}
                  className="relative"
                >
                  <TechnologyAccordionItem
                    tech={tech}
                    index={index}
                    isOpen={openAccordion === index}
                    onToggle={() => handleAccordionToggle(index)}
                    onHover={() => setOpenAccordion(index)}
                    isFirst={index === 0}
                    isLast={index === technologies.length - 1}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
