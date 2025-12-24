"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Target, Rocket, Heart, LucideIcon } from "lucide-react";

type CoreValue = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const CORE_VALUES: CoreValue[] = [
  {
    title: "Results-Driven Approach",
    description:
      "Clear objectives and measurable outcomes. We deliver real business value, not just beautiful code.",
    icon: Target,
  },
  {
    title: "Innovation at Speed",
    description:
      "Cutting-edge technologies and proven methodologies. Fast delivery without compromising quality.",
    icon: Rocket,
  },
  {
    title: "Client-Centric Culture",
    description:
      "Your vision is our mission. We listen, collaborate, and adapt to build lasting partnerships.",
    icon: Heart,
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const valuesRef = useRef<Array<HTMLDivElement | null>>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const valueEls = valuesRef.current.filter((el): el is HTMLDivElement => Boolean(el));
    const sidebarEl = sidebarRef.current;
    const quoteEl = quoteRef.current;

    const elements = [
      eyebrowEl,
      headingEl,
      descriptionEl,
      ...valueEls,
      sidebarEl,
      quoteEl,
    ].filter(Boolean);

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
    if (descriptionEl) {
      timeline.to(descriptionEl, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");
    }
    if (valueEls.length) {
      timeline.to(valueEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.3");
    }
    if (sidebarEl) {
      timeline.to(sidebarEl, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }
    if (quoteEl) {
      timeline.to(quoteEl, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
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
      ref={sectionRef}
      id="about"
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-[#141b38] py-20 flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="grid gap-8 sm:gap-12 md:gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <p
                ref={eyebrowRef}
                className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#00bef7] mb-4 sm:mb-6"
              >
                About
              </p>
              <h2
                ref={headingRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight"
              >
                AI-powered solutions that transform businesses.
              </h2>
              <p
                ref={descriptionRef}
                className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-3xl"
              >
                Expert AI developers, full-stack engineers, and digital strategists building intelligent solutions. From AI automation to web development, we create cutting-edge solutions that drive growth.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
              {CORE_VALUES.map((value, index) => (
                <article
                  key={value.title}
                  ref={(el) => {
                    valuesRef.current[index] = el as HTMLDivElement | null;
                  }}
                  className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-white p-5 sm:p-6 md:p-8 shadow-[0_22px_45px_rgba(15,23,42,0.32)] backdrop-blur hover:border-[#00bef7]/50 hover:bg-white/90 transition-all duration-500 touch-manipulation"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-[#00bef7]/30 bg-[#00bef7]/10 flex items-center justify-center group-hover:bg-[#00bef7]/20 group-hover:border-[#00bef7]/50 transition-all duration-500">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00bef7]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-[#00bef7] transition-colors duration-300">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{value.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div
            ref={sidebarRef}
            className="rounded-2xl sm:rounded-3xl md:rounded-[36px] border border-white/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.32)] p-6 sm:p-8 md:p-10 backdrop-blur lg:sticky lg:top-28"
          >
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
                Passionate experts, united by purpose.
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Decades of combined experience in engineering, design, and strategy. Constantly learning and pushing the boundaries of digital innovation.
              </p>
            </div>

            <div
              ref={quoteRef}
              className="mt-6 sm:mt-8 md:mt-10 rounded-2xl sm:rounded-3xl border border-dashed border-[#00bef7]/40 bg-[#00bef7]/10 p-4 sm:p-5 md:p-6 text-xs sm:text-sm text-gray-900"
            >
              <p>
                &ldquo;We build lasting partnerships. Solutions that evolve with your business and deliver value for years to come.&rdquo;
              </p>
              <p className="mt-3 sm:mt-4 font-semibold text-gray-900">— Our Promise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

