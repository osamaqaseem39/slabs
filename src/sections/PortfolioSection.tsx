"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const FEATURED_PROJECTS = [
  {
    name: "Arcfield",
    industry: "B2B SaaS",
    summary:
      "Scaled a headless marketing site and resource hub with personalized journeys tied to lead scoring.",
    metrics: ["↑ 41% pipeline influenced", "↓ 62% publish time"],
    image: "/portfolio/arcfield.jpg",
    scope: ["Headless web", "Marketing automation", "Analytics"],
    highlight:
      "Routed leads into four GTM plays using synced CMS fields and lifecycle triggers.",
  },
  {
    name: "Wellway",
    industry: "Health & Wellness",
    summary:
      "Launched a conversion-focused product experience with lifecycle automation for member onboarding.",
    metrics: ["↑ 29% activation rate", "↑ 3.1x retention"],
    image: "/portfolio/wellway.jpg",
    scope: ["Conversion UX", "Lifecycle journeys", "HubSpot"],
    highlight:
      "Orchestrated trial nurture paths that adapt to user health goals within 48 hours.",
  },
  {
    name: "Hinge Supply",
    industry: "Ecommerce",
    summary:
      "Replatformed storefront and ERP integrations with data-rich dashboards for merchandising decisions.",
    metrics: ["↑ 56% AOV", "↑ 22% reorder rate"],
    image: "/portfolio/hinge.jpg",
    scope: ["Headless commerce", "ERP integration", "Revenue analytics"],
    highlight:
      "Tied Shopify, NetSuite, and Looker into one daily revenue cockpit for the ops team.",
  },
  {
    name: "Northwind Services",
    industry: "Fintech",
    summary:
      "Modernized a legacy application suite with modular UI, self-serve onboarding, and observability.",
    metrics: ["↓ 45% onboarding time", "↑ 38% product adoption"],
    image: "/portfolio/northwind.jpg",
    scope: ["Product UX", "Design system", "Telemetry"],
    highlight:
      "Delivered a component library and playbook that let the internal team ship 2x faster post-launch.",
  },
  {
    name: "Summit Labs",
    industry: "Climate Tech",
    summary:
      "Unified demand-gen and customer onboarding with a composable site, headless CMS, and real-time emissions dashboards.",
    metrics: ["↑ 2.4x qualified pipeline", "↓ 35% onboarding questions"],
    image: "/hero1.png",
    scope: ["Headless marketing", "CMS architecture", "Data visualization"],
    highlight:
      "Wove lifecycle data into product storytelling with embedded analytics that update as prospects explore use cases.",
  },
  {
    name: "Atlas Freight",
    industry: "Logistics",
    summary:
      "Digitized a broker network with self-serve quoting, automated compliance, and ops playbooks teams can launch in any region.",
    metrics: ["↑ 61% conversion to quote", "↓ 48% manual paperwork"],
    image: "/hero2.png",
    scope: ["Product modernization", "Workflow automation", "Platform enablement"],
    highlight:
      "Stitched together TMS, CRM, and finance tooling so new corridors spin up with pre-built dashboards and compliance guards.",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const firstGroupCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const secondGroupCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  const projectGroups = useMemo(() => {
    const midpoint = Math.max(1, Math.ceil(FEATURED_PROJECTS.length / 2));
    return [
      FEATURED_PROJECTS.slice(0, midpoint),
      FEATURED_PROJECTS.slice(midpoint),
    ];
  }, []);

  useEffect(() => {
    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const firstCards = firstGroupCardRefs.current.filter(
      (card): card is HTMLDivElement => Boolean(card)
    );
    const secondCards = secondGroupCardRefs.current.filter(
      (card): card is HTMLDivElement => Boolean(card)
    );
    const showcaseEl = showcaseRef.current;
    const ctaEl = ctaRef.current;
    const sectionEl = sectionRef.current;

    if (!sectionEl) {
      return;
    }

    const animatedElements = [
      eyebrowEl,
      headingEl,
      descriptionEl,
      ...firstCards,
      ...(projectGroups[1].length ? secondCards : []),
      projectGroups[1].length ? showcaseEl : null,
      ctaEl,
    ].filter(Boolean);

    if (!animatedElements.length) {
      return;
    }

    gsap.set(animatedElements, { opacity: 0, y: 50 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });

    if (eyebrowEl) {
      timeline.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.45 });
    }

    if (headingEl) {
      timeline.to(
        headingEl,
        { opacity: 1, y: 0, duration: 0.65 },
        timeline.duration() ? "-=0.25" : undefined
      );
    }

    if (descriptionEl) {
      timeline.to(
        descriptionEl,
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }

    if (firstCards.length) {
      timeline.to(
        firstCards,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.3"
      );
    }

    if (projectGroups[1].length && secondCards.length) {
      timeline.to(
        secondCards,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
        },
        "-=0.35"
      );
    }

    if (ctaEl) {
      timeline.to(
        ctaEl,
        { opacity: 1, y: 0, duration: 0.6 },
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playTimeline();
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -15% 0px",
      }
    );

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
  }, [projectGroups]);

  firstGroupCardRefs.current.length = projectGroups[0].length;
  secondGroupCardRefs.current.length = projectGroups[1].length;

  const ctaContent = (
    <div
      ref={ctaRef}
      className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_26px_60px_rgba(15,23,42,0.32)] backdrop-blur md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-[#00BDFF]/80">Next launch</p>
        <h3 className="mt-2 text-3xl font-semibold text-white">
          Curious how this maps to your roadmap?
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
          We tailor engagements around the outcome you need—new funnels, product accelerators,
          lifecycle automation, or the full stack. Share a brief and we’ll send back where to start.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:items-end">
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-[#00BDFF] px-6 py-3 text-base font-semibold text-gray-950 transition-colors duration-300 hover:bg-[#3fd4ff]"
        >
          Talk to us
        </a>
        <a
          href="https://cal.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[#00BDFF] underline decoration-dotted underline-offset-4 hover:text-[#3fd4ff]"
        >
          Or book a working session
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative min-h-[100vh] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="mb-6 text-sm uppercase tracking-[0.4em] text-[#00BDFF]"
          >
            Portfolio
          </p>
          <h2
            ref={headingRef}
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Work that pairs thoughtful experiences with measurable growth.
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-white/70 leading-relaxed md:text-xl"
          >
            We ship across product, marketing, and lifecycle. Here’s a sampling of launches that moved the needle—for teams ranging from seed-stage startups to enterprise spinouts.
          </p>
        </div>

        <div className="mt-16 space-y-14">
          <div className="grid gap-10 xl:grid-cols-2">
            {projectGroups[0].map((project, index) => (
              <div
                key={project.name}
                ref={(el) => {
                  firstGroupCardRefs.current[index] = el;
                }}
                className="group grid grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_26px_55px_rgba(15,23,42,0.32)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#00BDFF]/60 hover:bg-white/[0.05] md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
                    <span className="text-sm uppercase tracking-[0.35em] text-white/70">
                      {project.industry}
                    </span>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                  </div>
                </div>

                  <div className="flex flex-col gap-5 p-8 md:p-10">
                    <p className="text-base leading-relaxed text-white/75">{project.summary}</p>
                    <div className="flex flex-wrap gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/45">
                      {project.scope?.map((item) => (
                        <span key={item} className="rounded-full border border-white/15 px-4 py-1">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-white/65">{project.highlight}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-[#00BDFF]">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-[#00BDFF]/60 bg-[#00BDFF]/10 px-4 py-1.5"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
              </div>
            ))}
          </div>

          {projectGroups[1].length > 0 ? (
            <div ref={showcaseRef} className="space-y-12">
              <div className="grid gap-10 xl:grid-cols-2">
                {projectGroups[1].map((project, index) => (
                  <div
                    key={project.name}
                    ref={(el) => {
                      secondGroupCardRefs.current[index] = el;
                    }}
                    className="group grid grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_26px_55px_rgba(15,23,42,0.32)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-[#00BDFF]/60 hover:bg-white/[0.05] md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]"
                  >
                    <div className="relative h-56 overflow-hidden sm:h-64">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-white">
                        <span className="text-sm uppercase tracking-[0.35em] text-white/70">
                          {project.industry}
                        </span>
                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 p-8 md:p-10">
                      <p className="text-base leading-relaxed text-white/75">{project.summary}</p>
                      <div className="flex flex-wrap gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/45">
                        {project.scope?.map((item) => (
                          <span key={item} className="rounded-full border border-white/15 px-4 py-1">
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-white/65">{project.highlight}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-[#00BDFF]">
                        {project.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-full border border-[#00BDFF]/60 bg-[#00BDFF]/10 px-4 py-1.5"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {ctaContent}
            </div>
          ) : null}

          {projectGroups[1].length === 0 ? ctaContent : null}
        </div>
      </div>
    </section>
  );
}

