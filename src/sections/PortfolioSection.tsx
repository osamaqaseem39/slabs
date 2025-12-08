"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type Project = {
  name: string;
  image: string;
  category: string;
  description: string;
  technologies: string[];
  client?: string;
};

const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    image: "/project1.jpg",
    category: "Web Development",
    description: "A high-performance e-commerce platform built with Next.js and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe API"],
    client: "RetailTech Solutions",
  },
  {
    name: "SaaS Dashboard Redesign",
    image: "/project2.jpg",
    category: "UI/UX Design",
    description: "Complete redesign of a SaaS analytics dashboard focusing on user experience, accessibility, and modern design principles. Increased user engagement by 45% and reduced task completion time by 30%.",
    technologies: ["Figma", "React", "Design System", "User Research"],
    client: "DataViz Pro",
  },
  {
    name: "Digital Transformation Strategy",
    image: "/project3.jpg",
    category: "Digital Strategy",
    description: "Comprehensive digital transformation roadmap for a legacy enterprise, including cloud migration strategy, modern tech stack recommendations, and phased implementation plan resulting in 60% cost reduction.",
    technologies: ["AWS", "Microservices", "DevOps", "Analytics"],
    client: "Enterprise Corp",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const modelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const modelEls = modelsRef.current.filter((el): el is HTMLDivElement => Boolean(el));

    const elements = [eyebrowEl, headingEl, ...modelEls].filter(Boolean);

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
    if (modelEls.length) {
      timeline.to(
        modelEls,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
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

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#00bdff] py-20 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p
            ref={eyebrowRef}
            className="mb-6 text-sm uppercase tracking-[0.4em] text-white"
          >
            Portfolio
          </p>
          <h2
            ref={headingRef}
            className="mb-6 text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white"
          >
            Our work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={(el) => {
                modelsRef.current[index] = el;
              }}
              className="group relative flex flex-col h-[500px] rounded-3xl overflow-hidden cursor-pointer bg-white"
            >
              {/* Image Container - Contained */}
              <div className="relative flex-1 p-6 flex items-center justify-center bg-white">
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Title at Bottom with Gradient */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-[#00bdff]/80 via-[#00bdff]/70 to-[#1040c6]/80 p-6 backdrop-blur-sm">
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {project.name}
                </h3>
              </div>

              {/* Gradient Overlay - Opens from Bottom on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141b38] via-[#141b38]/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none group-hover:pointer-events-auto">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out" style={{ transitionDelay: '100ms' }}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-[0.3em] text-[#00bef7] font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {project.name}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-white/90 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.client && (
                      <div className="text-xs text-white/70 italic">
                        Client: {project.client}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs rounded-full border border-[#00bef7]/50 bg-[#00bef7]/20 text-white backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1.5 text-xs rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
