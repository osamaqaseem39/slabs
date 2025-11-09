"use client";

import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import useSectionScrollSteps, {
  type SectionScrollDirection,
} from "@/hooks/useSectionScrollSteps";

type ServicesSectionProps = {
  id?: string;
};

type Service = {
  title: string;
  description: string;
  deliverables: string[];
  icon: ReactNode;
};

const primaryServices: Service[] = [
  {
    title: "WordPress Engineering",
    description:
      "Custom theme and plugin development focused on performance, accessibility, and easy content authoring.",
    deliverables: [
      "Modern headless and traditional builds",
      "Core Web Vitals optimization",
      "Content migrations and launch support",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M4.5 6.75h15" />
        <path d="M4.5 12h9" />
        <path d="M4.5 17.25h6" />
        <path d="M14.25 14.25L19.5 19.5" />
        <circle cx="17.25" cy="12" r="2.25" />
      </svg>
    ),
  },
  {
    title: "Search Engine Optimization",
    description:
      "Technical and content SEO programs that drive qualified traffic and measurable growth.",
    deliverables: [
      "Comprehensive audits and roadmaps",
      "Content strategy and on-page optimization",
      "Analytics, reporting, and iterative improvements",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
        <path d="m16.5 16.5 3 3" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    title: "Paid & Organic Social",
    description:
      "Campaigns that connect with the right audience through targeted creative and data-backed insights.",
    deliverables: [
      "Performance creative and messaging playbooks",
      "Channel management and experimentation",
      "Unified campaign reporting",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 7.5h9a2.25 2.25 0 0 1 2.25 2.25v2.25A2.25 2.25 0 0 1 16.5 14.25h-4.5L7.5 18v-3.75H6A2.25 2.25 0 0 1 3.75 12V9.75A2.25 2.25 0 0 1 6 7.5h1.5Z" />
        <path d="M15 7.5V6A2.25 2.25 0 0 1 17.25 3.75h.75A2.25 2.25 0 0 1 20.25 6v6" />
      </svg>
    ),
  },
  {
    title: "Digital Experience Design",
    description:
      "Human-centered design systems that translate brand vision into high-converting digital experiences.",
    deliverables: [
      "UX research and customer journeys",
      "UI systems and interactive prototypes",
      "Design-to-dev collaboration and QA",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M5.25 5.25h7.5v7.5h-7.5z" />
        <path d="m12.75 11.25 6-6" />
        <path d="M15 9.75h3.75V13.5" />
        <path d="M11.25 12.75 17.25 18.75" />
        <path d="M5.25 18.75h7.5v-4.5h-7.5z" />
      </svg>
    ),
  },
];

const secondaryServices: Service[] = [
  {
    title: "Marketing Automation",
    description:
      "Lifecycle programs that nurture leads with behavior-based messaging and intelligent routing.",
    deliverables: [
      "Journey mapping and segmentation",
      "Platform integrations and workflows",
      "Ongoing optimization and A/B testing",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 3.75v4.5" />
        <path d="M16.5 3.75v4.5" />
        <path d="M4.5 9.75h15" />
        <path d="M6 9.75v6a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 15.75v-6" />
        <path d="M9.75 14.25h4.5" />
      </svg>
    ),
  },
  {
    title: "Data & Analytics",
    description:
      "Unified measurement foundations that unlock faster decision making and attribution clarity.",
    deliverables: [
      "Tracking plans and instrumentation",
      "Dashboarding and reporting systems",
      "Experiment design and analytics QA",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M5.25 18.75v-6" />
        <path d="M10.5 18.75v-9" />
        <path d="M15.75 18.75v-12" />
        <path d="M21 5.25H3" />
      </svg>
    ),
  },
  {
    title: "Product Strategy",
    description:
      "Roadmaps grounded in user insights, revenue goals, and technical feasibility to guide roadmaps.",
    deliverables: [
      "Vision setting and opportunity sizing",
      "Prioritization frameworks",
      "Pilot launches and validation",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M7.5 16.5 12 6.75l4.5 9.75" />
        <path d="M8.25 15h7.5" />
        <path d="M12 3.75v2.25" />
        <path d="M12 17.25v3" />
      </svg>
    ),
  },
  {
    title: "Content Operations",
    description:
      "Editorial systems that align creators, reviewers, and automation for consistent, scalable output.",
    deliverables: [
      "Governance models and playbooks",
      "Publishing workflows and tooling",
      "Training programs and documentation",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M6.75 4.5h10.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z" />
        <path d="M15 3.75V6" />
        <path d="M9 3.75V6" />
        <path d="M6.75 9h10.5" />
        <path d="M9.75 12.75h4.5" />
        <path d="M9.75 15.75h3" />
      </svg>
    ),
  },
];

export default function ServicesSection({ id = "services" }: ServicesSectionProps) {
  const combinedServices = useMemo(
    () => [...primaryServices, ...secondaryServices].slice(0, 6),
    []
  );
  const serviceGroups = useMemo(
    () => [combinedServices.slice(0, 3), combinedServices.slice(3, 6)],
    [combinedServices]
  );
  const [activeGroup, setActiveGroup] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionContentRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const groupContainerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const sectionIntroTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const groupTransitionRef = useRef<gsap.core.Timeline | null>(null);
  const intersectionReachedRef = useRef(false);
  const thirdScrollCompleteRef = useRef(false);
  const animationStartedRef = useRef(false);
  const isAnimatingGroupsRef = useRef(false);
  const activeGroupRef = useRef(0);
  const containerHeightRef = useRef<number | null>(null);

  const getGroupCardArticles = useCallback((groupIndex: number) => {
    const groupEl = groupRefs.current[groupIndex];
    if (!groupEl) {
      return [] as HTMLElement[];
    }
    return Array.from(
      groupEl.querySelectorAll<HTMLElement>("article")
    );
  }, []);

  useEffect(() => {
    activeGroupRef.current = activeGroup;
  }, [activeGroup]);

  const updateContainerHeight = useCallback(() => {
    const activeGroupEl = groupRefs.current[activeGroupRef.current];
    if (!activeGroupEl) {
      return;
    }
    const measuredHeight = activeGroupEl.scrollHeight;
    if (measuredHeight > 0) {
      const containerEl = groupContainerRef.current;
      const previousHeight = containerHeightRef.current;
      containerHeightRef.current = measuredHeight;

      if (containerEl) {
        if (previousHeight === null) {
          gsap.set(containerEl, { height: measuredHeight });
        } else if (previousHeight !== measuredHeight) {
          gsap.to(containerEl, {
            height: measuredHeight,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      }
    }
  }, []);

  const resetGroupsInstant = useCallback(
    (targetIndex: number) => {
      const groups = groupRefs.current;
      if (!groups.length) {
        return;
      }

      if (groupTransitionRef.current) {
        groupTransitionRef.current.kill();
        groupTransitionRef.current = null;
      }

      groups.forEach((group, index) => {
        if (!group) {
          return;
        }
        const cardArticles = getGroupCardArticles(index);
        gsap.killTweensOf(group);
        if (cardArticles.length) {
          gsap.killTweensOf(cardArticles);
        }
        gsap.set(group, {
          position: "absolute",
          inset: 0,
          opacity: index === targetIndex ? 1 : 0,
          y: 0,
          pointerEvents: index === targetIndex ? "auto" : "none",
          visibility: index === targetIndex ? "visible" : "hidden",
        });
        if (cardArticles.length) {
          gsap.set(cardArticles, {
            opacity: index === targetIndex ? 1 : 0,
            y: 0,
          });
        }
      });

      activeGroupRef.current = targetIndex;
      setActiveGroup((prev) => (prev !== targetIndex ? targetIndex : prev));
      isAnimatingGroupsRef.current = false;
      updateContainerHeight();
    },
    [getGroupCardArticles, updateContainerHeight]
  );

  useEffect(() => {
    const groups = groupRefs.current;
    if (!groups.length) {
      return;
    }

    groups.forEach((group, index) => {
      if (!group) {
        return;
      }
      gsap.set(group, {
        position: "absolute",
        inset: 0,
        opacity: index === 0 ? 1 : 0,
        y: 0,
        pointerEvents: index === 0 ? "auto" : "none",
        visibility: index === 0 ? "visible" : "hidden",
      });
    });

    updateContainerHeight();
  }, [updateContainerHeight]);

  useEffect(() => {
    updateContainerHeight();
  }, [activeGroup, updateContainerHeight]);

  useEffect(() => {
    const handleResize = () => {
      updateContainerHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateContainerHeight]);

  const transitionToGroup = useCallback(
    (targetIndex: number) => {
      if (isAnimatingGroupsRef.current) {
        return;
      }
      const currentIndex = activeGroupRef.current;
      if (targetIndex === currentIndex) {
        return;
      }

      const currentGroup = groupRefs.current[currentIndex];
      const nextGroup = groupRefs.current[targetIndex];

      if (!currentGroup || !nextGroup) {
        return;
      }

      isAnimatingGroupsRef.current = true;

      if (groupTransitionRef.current) {
        groupTransitionRef.current.kill();
        groupTransitionRef.current = null;
      }

      const currentGroupCards = getGroupCardArticles(currentIndex);
      const nextGroupCards = getGroupCardArticles(targetIndex);

      groupTransitionRef.current = gsap
        .timeline({
          defaults: {
            duration: 0.65,
            ease: "power3.out",
          },
          onComplete: () => {
            gsap.set(currentGroup, {
              opacity: 0,
              y: 0,
              pointerEvents: "none",
              visibility: "hidden",
            });
            gsap.set(nextGroup, {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              visibility: "visible",
            });
            if (nextGroupCards.length) {
              gsap.set(nextGroupCards, { opacity: 1, y: 0 });
            }
            setActiveGroup(targetIndex);
            activeGroupRef.current = targetIndex;
            isAnimatingGroupsRef.current = false;
            updateContainerHeight();
          },
        })
        .add(() => {
          gsap.set(nextGroup, {
            visibility: "visible",
            pointerEvents: "none",
            opacity: 0,
            y: 40,
          });
          if (nextGroupCards.length) {
            gsap.set(nextGroupCards, { opacity: 0, y: 40 });
          }
          if (currentGroupCards.length) {
            gsap.set(currentGroupCards, { opacity: 1, y: 0 });
          }
        })
        .to(
          currentGroupCards,
          {
            opacity: 0,
            y: -30,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          currentGroup,
          {
            opacity: 0,
            y: -40,
          },
          0
        )
        .to(
          nextGroup,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            visibility: "visible",
          },
          "<0.1"
        )
        .to(
          nextGroupCards,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.25"
        );
    },
    [getGroupCardArticles, updateContainerHeight]
  );

  const handleSectionScroll = useCallback(
    (direction: SectionScrollDirection) => {
      if (isAnimatingGroupsRef.current) {
        return true;
      }

      if (direction === "forward") {
        if (activeGroupRef.current === 0) {
          transitionToGroup(1);
          return true;
        }
        return false;
      }

      if (direction === "backward") {
        if (activeGroupRef.current === 1) {
          transitionToGroup(0);
          return true;
        }
        return false;
      }

      return false;
    },
    [transitionToGroup]
  );

  useSectionScrollSteps(id, handleSectionScroll);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return;
    }

    const eyebrowEl = eyebrowRef.current;
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const cardEls = cardsRef.current.filter(
      (card): card is HTMLElement => Boolean(card)
    );
    const primaryCardEls = cardEls.slice(0, 3);

    const animatedElements = [
      eyebrowEl,
      headingEl,
      descriptionEl,
      ...primaryCardEls,
    ].filter(Boolean);

    if (!animatedElements.length) {
      return;
    }

    gsap.set(animatedElements, { opacity: 0, y: 60 });

    const startAnimation = () => {
      if (animationStartedRef.current) {
        return;
      }
      animationStartedRef.current = true;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowEl) {
        timeline.to(eyebrowEl, {
          opacity: 1,
          y: 0,
          duration: 0.55,
        });
      }

      if (headingEl) {
        timeline.to(
          headingEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.25"
        );
      }

      if (descriptionEl) {
        timeline.to(
          descriptionEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        );
      }

      if (primaryCardEls.length) {
        timeline.to(
          primaryCardEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.2"
        );
      }

      timelineRef.current = timeline;
    };

    const maybeStartAnimation = () => {
      if (intersectionReachedRef.current && thirdScrollCompleteRef.current) {
        startAnimation();
      }
    };

    const handleThirdScrollComplete = () => {
      thirdScrollCompleteRef.current = true;
      maybeStartAnimation();
    };

    if (typeof window !== "undefined") {
      const globalWindow = window as typeof window & {
        __heroThirdScrollComplete?: boolean;
      };
      if (globalWindow.__heroThirdScrollComplete) {
        thirdScrollCompleteRef.current = true;
      }
      window.addEventListener("hero:third-scroll-complete", handleThirdScrollComplete);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          intersectionReachedRef.current = true;
          observer.disconnect();
          maybeStartAnimation();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("hero:third-scroll-complete", handleThirdScrollComplete);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (groupTransitionRef.current) {
        groupTransitionRef.current.kill();
        groupTransitionRef.current = null;
      }
      resetGroupsInstant(0);
    };
  }, [resetGroupsInstant]);

  useEffect(() => {
    const contentEl = sectionContentRef.current;
    if (!contentEl) {
      return;
    }

    gsap.set(contentEl, { opacity: 0, y: 64 });

    const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    introTimeline.to(contentEl, {
      opacity: 1,
      y: 0,
      duration: 0.9,
    });

    sectionIntroTimelineRef.current = introTimeline;

    return () => {
      if (sectionIntroTimelineRef.current) {
        sectionIntroTimelineRef.current.kill();
        sectionIntroTimelineRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-[100vh] bg-gray-950 py-24 md:py-32"
    >
      <div
        ref={sectionContentRef}
        className="container mx-auto px-6 md:px-10 lg:px-14"
      >
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-sm uppercase tracking-[0.4em] text-[#00BDFF] mb-6"
          >
            Services
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            End-to-end digital execution from strategy through launch.
          </h2>
          <p ref={descriptionRef} className="text-lg md:text-xl text-white/70">
            We embed with your team to ship faster, polish the details, and ensure
            every touchpoint supports your growth goals.
          </p>
        </div>

        <div ref={groupContainerRef} className="relative mt-16">
          {serviceGroups.map((group, groupIndex) => (
            <div
              key={group.map((service) => service.title).join("-")}
              ref={(el) => {
                groupRefs.current[groupIndex] = el;
              }}
              className="grid h-full gap-8 md:gap-10 lg:gap-12 sm:grid-cols-2 xl:grid-cols-3"
            >
              {group.map((service, index) => {
                const cardIndex = groupIndex * 3 + index;
                return (
                  <div
                    key={service.title}
                    ref={(el) => {
                      cardsRef.current[cardIndex] = el;
                    }}
                    className="group relative h-full [perspective:1600px]"
                  >
                    <article
                      className="relative h-full min-h-[380px] rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_22px_45px_rgba(15,23,42,0.28)] transition-[transform,box-shadow,border-color,background] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] hover:border-[#00BDFF]/70 hover:bg-white/[0.04] group-hover:[transform:rotateY(180deg)]"
                    >
                      <div className="absolute inset-px rounded-[22px] bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8 py-10 text-center [backface-visibility:hidden]">
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] text-[#00BDFF] ring-1 ring-inset ring-white/10 shadow-[0_12px_24px_rgba(15,23,42,0.32)]">
                          {service.icon}
                        </span>
                        <h3 className="text-2xl font-semibold text-white tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-base text-white/60 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-6 px-8 py-10 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="space-y-3 max-w-xs">
                          <h3 className="text-2xl font-semibold text-white">
                            {service.title}
                          </h3>
                          <p className="text-base text-white/70 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <ul className="space-y-3 text-sm text-white/60">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-center justify-center gap-3"
                            >
                              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#00BDFF]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


