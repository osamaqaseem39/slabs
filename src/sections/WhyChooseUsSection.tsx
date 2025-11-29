"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import gsap from "gsap";

const DIFFERENTIATORS = [
  {
    heading: "Embedded, cross-discipline squads",
    body: "Design, engineering, data, and growth sit in one squad with your team. We plug into your rituals, ship alongside your PMs, and share the same dashboards on day one.",
    highlight: "Fully embedded teams",
    icon: "🤝",
  },
  {
    heading: "Operating rhythm that matches yours",
    body: "Weekly release trains, async standups, and board-ready status docs keep every stakeholder looped in. No rescoping after kickoff—just steady, accountable velocity.",
    highlight: "Strategic velocity",
    icon: "⏱️",
  },
  {
    heading: "Decisions backed by instrumentation",
    body: "Every initiative ships with analytics events, experiment frameworks, and revenue tracking. We make it obvious what’s working, what’s lagging, and where to double down.",
    highlight: "Accountable results",
    icon: "📊",
  },
  {
    heading: "Systems you can scale after launch",
    body: "Reusable design systems, hardened CI/CD, and documentation built as we go. When we roll off, your internal team inherits tools—not lingering To-Do lists.",
    highlight: "Long-term resilience",
    icon: "🧱",
  },
];

const TRUST_BADGES = [
  "Vercel Verified Partner",
  "Contentful Experts",
  "HubSpot Solutions",
  "Google Analytics Certified",
];

const primaryDifferentiators = DIFFERENTIATORS.slice(0, 2);
const secondaryDifferentiators = DIFFERENTIATORS.slice(2);

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const primaryCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const secondaryCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);
  useEffect(() => {
    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const primaryCards = primaryCardRefs.current.filter(
      (card): card is HTMLDivElement => Boolean(card)
    );
    const secondaryCards = secondaryCardRefs.current.filter(
      (card): card is HTMLDivElement => Boolean(card)
    );
    const highlightEl = highlightRef.current;
    const badgeEls = badgeRefs.current.filter(
      (badge): badge is HTMLDivElement => Boolean(badge)
    );
    const quoteEl = quoteRef.current;
    const sectionEl = sectionRef.current;

    if (!sectionEl) {
      return;
    }

    const allAnimatedElements = [
      eyebrowEl,
      headingEl,
      descriptionEl,
      ...primaryCards,
      ...secondaryCards,
      highlightEl,
      ...badgeEls,
      quoteEl,
    ].filter(Boolean);

    if (!allAnimatedElements.length) {
      return;
    }

    gsap.set(allAnimatedElements, { opacity: 0, y: 60 });

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

    if (primaryCards.length) {
      timeline.to(
        primaryCards,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.3"
      );
    }

    if (secondaryCards.length || highlightEl) {
      timeline.to(
        [...secondaryCards, highlightEl].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
        },
        "-=0.25"
      );
    }

    if (badgeEls.length) {
      timeline.to(
        badgeEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
        },
        "-=0.4"
      );
    }

    if (quoteEl) {
      timeline.to(
        quoteEl,
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
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
  }, []);

  primaryCardRefs.current.length = primaryDifferentiators.length;
  secondaryCardRefs.current.length = secondaryDifferentiators.length;
  badgeRefs.current.length = TRUST_BADGES.length;

  const renderDifferentiator = (
    item: (typeof DIFFERENTIATORS)[number],
    index: number,
    refStore: MutableRefObject<Array<HTMLDivElement | null>>
  ) => (
    <div
      key={item.heading}
      ref={(el) => {
        refStore.current[index] = el;
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[0_24px_55px_rgba(15,23,42,0.28)] transition duration-500 hover:border-[#00BDFF]/50 hover:bg-white/[0.06]"
    >
      <div className="absolute right-6 top-6 text-2xl opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-100">
        {item.icon}
      </div>
      <p className="text-sm uppercase tracking-[0.28em] text-[#00BDFF]/80">
        {item.highlight}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-white">{item.heading}</h3>
      <p className="mt-4 text-base text-white/70 leading-relaxed">{item.body}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#00BDFF]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
    </div>
  );
  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      data-universal-scroll-ignore
      className="relative min-h-[100vh] bg-gray-950 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,189,255,0.12),transparent_60%)]" />

      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col gap-16 lg:gap-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <p
                ref={eyebrowRef}
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-[#00BDFF]"
              >
                <span className="h-px w-6 bg-[#00BDFF]/70" />
                Why Choose Us
              </p>
              <h2
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              >
                Embed a senior digital team that ships, measures, and levels up your org.
              </h2>
              <p
                ref={descriptionRef}
                className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl"
              >
                We operate like an internal squad: tight loops, transparent reporting, and systems you
                can own long after launch. The output is momentum—aligned roadmaps, crafted
                experiences, and proof that every sprint moved the needle.
              </p>
            </div>

            <div className="grid gap-5 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-8 text-sm text-white/70 shadow-[0_20px_55px_rgba(15,23,42,0.32)] sm:grid-cols-2 lg:max-w-lg">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#00BDFF]/70">Model</p>
                <p className="mt-2 text-base text-white">
                  Embedded cross-functional squads
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#00BDFF]/70">Coverage</p>
                <p className="mt-2 text-base text-white">
                  Strategy → Shipping → Enablement
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#00BDFF]/70">Velocity</p>
                <p className="mt-2 text-base text-white">
                  Weekly releases, daily visibility
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#00BDFF]/70">Proof</p>
                <p className="mt-2 text-base text-white">
                  Dashboards & rituals execs trust
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="grid gap-6 md:grid-cols-2">
              {primaryDifferentiators.map((item, index) =>
                renderDifferentiator(item, index, primaryCardRefs)
              )}
            </div>

            <div
              ref={highlightRef}
              className="flex flex-col gap-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-10 shadow-[0_24px_60px_rgba(15,23,42,0.28)] backdrop-blur"
            >
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.32em] text-[#00BDFF]/80">Signals</p>
                <h3 className="text-3xl font-semibold text-white">
                  What leadership notices first
                </h3>
                <p className="text-base text-white/70 leading-relaxed">
                  Roadmaps align to revenue, releases never ship blind, and documentation arrives before
                  the QA cycle ends. Our mandate is tangible progress that earns executive confidence.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {TRUST_BADGES.map((badge, index) => (
                  <div
                    key={badge}
                    ref={(el) => {
                      badgeRefs.current[index] = el;
                    }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white"
                  >
                    <span>{badge}</span>
                    <span className="h-2 w-2 rounded-full bg-[#00BDFF]" />
                  </div>
                ))}
              </div>

              <div
                ref={quoteRef}
                className="rounded-3xl border border-dashed border-[#00BDFF]/40 bg-[#00BDFF]/10 p-6 text-sm text-[#00BDFF]"
              >
                <p>
                  “They operate like a senior strike team—strategic enough for C-suite conversations,
                  tactical enough to ship code and content.”
                </p>
                <p className="mt-4 font-semibold text-white">
                  — Director of Growth, Series B SaaS
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="grid gap-6 md:grid-cols-2">
              {secondaryDifferentiators.map((item, index) =>
                renderDifferentiator(item, index, secondaryCardRefs)
              )}
            </div>

            <div className="group relative overflow-hidden rounded-[36px] border border-white/12 bg-gradient-to-r from-[#00BDFF]/10 via-transparent to-transparent p-12 shadow-[0_28px_70px_rgba(15,23,42,0.35)]">
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#00BDFF] to-transparent opacity-50 transition duration-700 group-hover:opacity-80" />
              <div className="relative space-y-6">
                <h3 className="text-3xl font-semibold text-white">
                  One squad, accountable for your metrics.
                </h3>
                <p className="text-base text-white/70 leading-relaxed">
                  Every engagement includes enablement, measurement, and clear ownership. We leave your
                  internal team stronger—with systems, dashboards, and rituals that keep momentum alive.
                </p>
                <ul className="grid gap-4 text-sm text-white/70">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#00BDFF]" />
                    Dedicated leads across strategy, design, engineering, and growth
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#00BDFF]" />
                    Shared OKRs, shared dashboards, shared retrospectives
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#00BDFF]" />
                    Enablement programs and tooling your team can re-run
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-[#00BDFF]/60 px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#00BDFF] transition hover:bg-[#00BDFF]/15"
                  >
                    See proof
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#00BDFF] px-5 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-gray-900 transition hover:bg-[#47d3ff]"
                  >
                    Talk to us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

