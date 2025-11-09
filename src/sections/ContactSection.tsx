"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import type { SectionScrollDirection } from "@/hooks/useSectionScrollSteps";
import {
  smoothScrollIntoView,
  smoothScrollTo,
  DEFAULT_SCROLL_DURATION,
} from "@/lib/smoothScroll";

const CONTACT_POINTS = [
  {
    label: "Start a project",
    description: "Share timelines, goals, and constraints so we can scope a launch-ready plan.",
    action: "hello@slabs.agency",
    href: "mailto:hello@slabs.agency",
  },
  {
    label: "Book a workshop",
    description: "Align stakeholders around GTM, product, or design systems in a focused session.",
    action: "Pick a time",
    href: "https://cal.com/",
  },
  {
    label: "Join the team",
    description: "We’re always meeting builders who live at the intersection of product, design, and growth.",
    action: "View openings",
    href: "#",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isNavigatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const boundaryIntentRef = useRef<SectionScrollDirection | null>(null);
  const boundaryTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const titleEl = titleRef.current;
    const descriptionEl = descriptionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));
    const formEl = formRef.current;

    const timeline = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        paused: true,
      })
      .fromTo(
        [titleEl, descriptionEl],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }
      )
      .fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.25"
      )
      .fromTo(
        formEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.play();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      timeline.kill();
    };
  }, []);

  const clearBoundaryIntent = useCallback(() => {
    if (boundaryTimerRef.current != null) {
      window.clearTimeout(boundaryTimerRef.current);
      boundaryTimerRef.current = null;
    }
    boundaryIntentRef.current = null;
  }, []);

  const navigateToSection = useCallback(
    (direction: SectionScrollDirection) => {
      if (typeof window === "undefined") {
        return;
      }

      if (isNavigatingRef.current) {
        return;
      }

      let targetElement: HTMLElement | null = null;

      if (direction === "forward") {
        const sectionEl = sectionRef.current;
        const nextElement = sectionEl?.nextElementSibling;
        if (nextElement instanceof HTMLElement) {
          targetElement = nextElement;
        } else if (sectionEl) {
          isNavigatingRef.current = true;
          smoothScrollTo(sectionEl.offsetTop + sectionEl.offsetHeight, {
            duration: DEFAULT_SCROLL_DURATION,
          });
          window.setTimeout(() => {
            isNavigatingRef.current = false;
          }, DEFAULT_SCROLL_DURATION + 150);
          return;
        }
      } else {
        targetElement = document.getElementById("about");
      }

      if (!targetElement) {
        return;
      }

      isNavigatingRef.current = true;
      smoothScrollIntoView(targetElement, { duration: DEFAULT_SCROLL_DURATION });

      window.setTimeout(() => {
        isNavigatingRef.current = false;
      }, DEFAULT_SCROLL_DURATION + 150);
    },
    []
  );

  const requestSectionChange = useCallback(
    (direction: SectionScrollDirection) => {
      if (boundaryIntentRef.current === direction) {
        if (boundaryTimerRef.current != null) {
          window.clearTimeout(boundaryTimerRef.current);
          boundaryTimerRef.current = null;
        }
        clearBoundaryIntent();
        navigateToSection(direction);
        return;
      }

      boundaryIntentRef.current = direction;
      if (boundaryTimerRef.current != null) {
        window.clearTimeout(boundaryTimerRef.current);
      }
      boundaryTimerRef.current = window.setTimeout(() => {
        boundaryIntentRef.current = null;
        boundaryTimerRef.current = null;
      }, 1800);
    },
    [clearBoundaryIntent, navigateToSection]
  );

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const el = sectionRef.current;
      if (!el || isNavigatingRef.current) {
        return;
      }

      const deltaY =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 40 : event.deltaY;
      if (Math.abs(deltaY) < 1) {
        return;
      }

      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (deltaY > 0) {
        if (atBottom) {
          if (event.cancelable) {
            event.preventDefault();
          }
          requestSectionChange("forward");
        } else {
          clearBoundaryIntent();
        }
        return;
      }

      if (deltaY < 0) {
        if (atTop) {
          if (event.cancelable) {
            event.preventDefault();
          }
          requestSectionChange("backward");
        } else {
          clearBoundaryIntent();
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartYRef.current = touch?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const el = sectionRef.current;
      const startY = touchStartYRef.current;
      const touch = event.touches[0];

      if (!el || !touch || startY == null || isNavigatingRef.current) {
        return;
      }

      const delta = startY - touch.clientY;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (delta > 0) {
        if (atBottom) {
          if (event.cancelable) {
            event.preventDefault();
          }
          requestSectionChange("forward");
        } else {
          clearBoundaryIntent();
        }
      } else if (delta < 0) {
        if (atTop) {
          if (event.cancelable) {
            event.preventDefault();
          }
          requestSectionChange("backward");
        } else {
          clearBoundaryIntent();
        }
      }

      touchStartYRef.current = touch.clientY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      clearBoundaryIntent();
    };

    sectionEl.addEventListener("wheel", handleWheel, { passive: false });
    sectionEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    sectionEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    sectionEl.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      sectionEl.removeEventListener("wheel", handleWheel);
      sectionEl.removeEventListener("touchstart", handleTouchStart);
      sectionEl.removeEventListener("touchmove", handleTouchMove);
      sectionEl.removeEventListener("touchend", handleTouchEnd);
      clearBoundaryIntent();
    };
  }, [clearBoundaryIntent, requestSectionChange]);

  cardRefs.current.length = CONTACT_POINTS.length;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[100vh] max-h-screen overflow-y-auto bg-gray-950 py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-[#00BDFF]" ref={descriptionRef}>
                Contact
              </p>
              <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                The next launch is only as strong as the team behind it.
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                Give us a starting point or a north star. We’ll send back the milestones, team mix, and
                instrumentation required to ship—and prove—results.
              </p>
            </div>

            <div className="grid gap-6">
              {CONTACT_POINTS.map((point, index) => (
                <div
                  key={point.label}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_22px_45px_rgba(15,23,42,0.28)] transition duration-500 hover:border-[#00BDFF]/70 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-white">{point.label}</h3>
                    <a
                      href={point.href}
                      target={point.href.startsWith("http") ? "_blank" : undefined}
                      rel={point.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full bg-[#00BDFF]/10 px-4 py-2 text-sm font-medium text-[#00BDFF] transition-colors duration-300 group-hover:bg-[#00BDFF]/20"
                    >
                      {point.action}
                    </a>
                  </div>
                  <p className="text-white/70 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className="rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_24px_60px_rgba(15,23,42,0.32)] backdrop-blur"
          >
            <div className="grid gap-6">
              <div>
                <label className="text-sm font-medium text-white/70">Name</label>
                <input
                  type="text"
                  placeholder="How should we address you?"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00BDFF] focus:outline-none focus:ring-2 focus:ring-[#00BDFF]/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="Where can we reach you?"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00BDFF] focus:outline-none focus:ring-2 focus:ring-[#00BDFF]/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">Company</label>
                <input
                  type="text"
                  placeholder="Who do you represent?"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00BDFF] focus:outline-none focus:ring-2 focus:ring-[#00BDFF]/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">What’s on your roadmap?</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the initiative, challenges, or metrics you’re targeting."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00BDFF] focus:outline-none focus:ring-2 focus:ring-[#00BDFF]/40"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#00BDFF] px-6 py-3 text-base font-semibold text-gray-950 transition-colors duration-300 hover:bg-[#0dd0ff]"
              >
                Send Message
              </button>
              <p className="text-xs text-white/40">
                By submitting this form, you consent to being contacted about services. We’ll never share your
                info.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

