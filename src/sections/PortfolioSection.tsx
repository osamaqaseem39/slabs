"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShoppingCart, LayoutDashboard, TrendingUp, LucideIcon } from "lucide-react";

type Project = {
  name: string;
  icon: LucideIcon;
  category: string;
  description: string;
  technologies: string[];
  client?: string;
};

const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    icon: ShoppingCart,
    category: "Web Development",
    description: "A high-performance e-commerce platform built with Next.js and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe API"],
    client: "RetailTech Solutions",
  },
  {
    name: "SaaS Dashboard Redesign",
    icon: LayoutDashboard,
    category: "UI/UX Design",
    description: "Complete redesign of a SaaS analytics dashboard focusing on user experience, accessibility, and modern design principles. Increased user engagement by 45% and reduced task completion time by 30%.",
    technologies: ["Figma", "React", "Design System", "User Research"],
    client: "DataViz Pro",
  },
  {
    name: "Digital Transformation Strategy",
    icon: TrendingUp,
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
              className="group flex flex-col items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white hover:border-[#00bef7]/50 hover:bg-white/90 transition-all duration-500"
            >
              <div className="relative flex items-center justify-center w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00bef7]/20 to-[#00bef7]/5 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl border border-[#00bef7]/30 bg-[#00bef7]/10 group-hover:bg-[#00bef7]/20 group-hover:border-[#00bef7]/50 transition-all duration-500">
                  <project.icon 
                    className="w-12 h-12 text-[#00bef7] group-hover:scale-110 transition-transform duration-500" 
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3 text-center w-full">
                <div className="flex flex-col items-center gap-2 w-full">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#00bef7]/80 font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#00bef7] transition-colors duration-300">
                    {project.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                  {project.description}
                </p>
                
                {project.client && (
                  <div className="text-xs text-gray-600 italic">
                    Client: {project.client}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full border border-[#00bef7]/30 bg-[#00bef7]/10 text-[#00bef7]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full border border-gray-200 bg-gray-100 text-gray-700">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
