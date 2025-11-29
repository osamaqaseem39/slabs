"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

type TechnologyStack = {
  title: string;
  description: string;
  items: string[];
};

const technologyStacks: TechnologyStack[] = [
  {
    title: "Experience Platforms",
    description:
      "Composable front-end foundations aligned to performance, accessibility, and publishing needs.",
    items: ["Next.js and React", "Headless WordPress", "Astro and Vite"],
  },
  {
    title: "Automation and Data",
    description:
      "Tooling that keeps campaigns measurable and adaptive across the full customer journey.",
    items: ["Segment and Customer.io", "HubSpot and Salesforce", "Looker and Mode"],
  },
  {
    title: "Delivery Tooling",
    description:
      "DevOps pipelines engineered for quick iteration, safe releases, and observability from day one.",
    items: ["GitHub Actions", "Vercel and Netlify", "Docker and Kubernetes"],
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const statsCardRef = useRef<HTMLDivElement | null>(null);
  const stackCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const statsEl = statsCardRef.current;
    const stackEls = stackCardsRef.current.filter(
      (card): card is HTMLDivElement => Boolean(card)
    );

    const elementsToAnimate = [
      eyebrowEl,
      headingEl,
      descriptionEl,
      statsEl,
      ...stackEls,
    ].filter(Boolean);

    if (!elementsToAnimate.length) {
      return;
    }

    gsap.set(elementsToAnimate, { opacity: 0, y: 40 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) {
      timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5 });
    }
    if (headingEl) {
      timeline.to(
        headingEl,
        { opacity: 1, y: 0, duration: 0.65 },
        timeline.duration() ? "-=0.3" : undefined
      );
    }
    if (descriptionEl) {
      timeline.to(
        descriptionEl,
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      );
    }
    if (statsEl) {
      timeline.to(
        statsEl,
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );
    }
    if (stackEls.length) {
      timeline.to(
        stackEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
        },
        "-=0.3"
      );
    }

    timelineRef.current = timeline;

    const playTimeline = () => {
      if (hasAnimatedRef.current || !timelineRef.current) {
        return;
      }
      hasAnimatedRef.current = true;
      timelineRef.current.play();
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playTimeline();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    });

    observer.observe(sectionEl);

    const rect = sectionEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      playTimeline();
    }

    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-gray-900 py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-sm uppercase tracking-[0.4em] text-[#00BDFF] mb-6"
          >
            Technologies
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Proven platforms and tooling that keep releases fast, stable, and measurable.
          </h2>
          <p ref={descriptionRef} className="text-lg md:text-xl text-white/70">
            We pair flexible modern frameworks with automation and analytics so your team can launch
            confidently and optimize in real time.
          </p>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 grid gap-12 md:gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div
            ref={statsCardRef}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 md:p-10 text-white shadow-[0_28px_60px_rgba(15,23,42,0.32)]"
          >
            <h3 className="text-3xl font-semibold leading-tight mb-6">
              A single pipeline from prototype to production.
            </h3>
            <p className="text-white/70 leading-relaxed mb-8">
              We bring opinionated defaults for deployment, QA, analytics, and growth tooling so teams can
              focus on the customer experience instead of integrating yet another platform.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00BDFF]/70">Coverage</p>
                <p className="text-2xl font-semibold">Strategy → Launch → Ops</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00BDFF]/70">Tooling Uptime</p>
                <p className="text-2xl font-semibold">99.9% monitored</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00BDFF]/70">Avg. Iteration</p>
                <p className="text-2xl font-semibold">&lt; 2 week release train</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#00BDFF]/70">Stack Fit</p>
                <p className="text-2xl font-semibold">B2B &amp; Product GTM</p>
              </div>
            </div>
            <div className="mt-10 border-t border-white/10 pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Operational Highlights</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  Dedicated enablement playbooks covering discovery, backlog hygiene, and experimentation
                  protocols.
                </li>
                <li>
                  Shared observability dashboards with automated alerts wired into incident response workflows.
                </li>
                <li>
                  Optional co-managed squads to help internal teams adopt new delivery practices sustainably.
                </li>
              </ul>
            </div>
          </div>

          <div className="relative lg:pl-16">
            <div className="pointer-events-none absolute left-6 top-6 bottom-6 hidden lg:block">
              <span className="block h-full w-px bg-gradient-to-b from-[#00BDFF] via-white/20 to-transparent" />
            </div>
            <div className="space-y-8 md:space-y-10">
              {technologyStacks.map((stack, index) => (
                <article
                  key={stack.title}
                  ref={(el: HTMLDivElement | null) => {
                    stackCardsRef.current[index] = el;
                  }}
                  className="rounded-[28px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_20px_40px_rgba(15,23,42,0.24)] backdrop-blur-sm transition duration-500 hover:border-[#00BDFF]/60 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#00BDFF]/70 bg-[#00BDFF]/10 text-sm font-semibold text-[#00BDFF]">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{stack.title}</h3>
                        <p className="mt-3 text-base text-white/70 leading-relaxed">
                          {stack.description}
                        </p>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {stack.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

