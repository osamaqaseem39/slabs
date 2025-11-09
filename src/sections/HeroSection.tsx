 "use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import useSectionScrollSteps, {
  type SectionScrollDirection,
} from "@/hooks/useSectionScrollSteps";

const FIRST_PHASE_DELAY = 2200;
const SECOND_PHASE_DELAY = 2400;
const RELEASE_SCROLL_OFFSET = 0;
const RELEASE_SCROLL_DURATION = 900;

const getNow = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroReadyRef = useRef(false);
  const heroTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayTriggeredRef = useRef(false);
  const heroAnimationTriggeredRef = useRef(false);
  const scrollPhaseRef = useRef(0);
  const nextPhaseReadyAtRef = useRef(0);
  const thirdScrollEventDispatchedRef = useRef(false);
  const overflowStateRef = useRef<{ body: string; html: string } | null>(null);
  const headingWordElementsRef = useRef<HTMLSpanElement[]>([]);
  const buttonElementsRef = useRef<HTMLElement[]>([]);

  const scrollToTarget = (target: string) => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(target);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const ensureAtTop = useCallback(() => {
    if (typeof window !== "undefined" && scrollPhaseRef.current < 3) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);

  const ensureVideoPrimed = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.autoplay = false;
    video.pause();
    if (video.readyState >= 2) {
      video.currentTime = 0;
    }
  }, []);

  const lockScroll = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }
    const body = document.body;
    const documentElement = document.documentElement;
    if (!overflowStateRef.current) {
      overflowStateRef.current = {
        body: body.style.overflow,
        html: documentElement.style.overflow,
      };
    }
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }
    const body = document.body;
    const documentElement = document.documentElement;
    const stored = overflowStateRef.current;
    body.style.overflow = stored?.body ?? "";
    documentElement.style.overflow = stored?.html ?? "";
    overflowStateRef.current = null;
  }, []);

  const animateViewportScroll = useCallback(
    (distance: number, onComplete?: () => void) => {
      if (typeof window === "undefined") {
        if (distance === 0 && typeof onComplete === "function") {
          onComplete();
        }
        return;
      }
      if (distance === 0) {
        if (typeof onComplete === "function") {
          onComplete();
        }
        return;
      }
      const startY = window.scrollY;
      const targetY = startY + distance;
      const startTime = getNow();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = () => {
        const elapsed = getNow() - startTime;
        const progress = Math.min(elapsed / RELEASE_SCROLL_DURATION, 1);
        const eased = easeOutCubic(progress);
        window.scrollTo({ top: startY + distance * eased });
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo({ top: targetY });
          if (typeof onComplete === "function") {
            onComplete();
          }
        }
      };

      requestAnimationFrame(step);
    },
    []
  );

  const dispatchThirdScrollComplete = useCallback(() => {
    if (thirdScrollEventDispatchedRef.current || typeof window === "undefined") {
      return;
    }
    thirdScrollEventDispatchedRef.current = true;
    const globalWindow = window as typeof window & {
      __heroThirdScrollComplete?: boolean;
    };
    globalWindow.__heroThirdScrollComplete = true;
    window.dispatchEvent(new CustomEvent("hero:third-scroll-complete"));
  }, []);

  const applyInitialVisualState = useCallback(() => {
    const headingWords = headingWordElementsRef.current;
    if (headingWords.length > 0) {
      gsap.set(headingWords, { opacity: 0, y: 60 });
    }
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 });
    }
    const buttonElements = buttonElementsRef.current;
    if (buttonElements.length > 0) {
      gsap.set(buttonElements, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        pointerEvents: "none",
      });
    }
  }, []);

  const triggerAutoplay = useCallback(() => {
    if (autoplayTriggeredRef.current) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    autoplayTriggeredRef.current = true;
    video.autoplay = true;

    try {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* user interaction will allow playback */
        });
      }
    } catch {
      /* swallow errors */
    }
  }, []);

  const playHeroAnimation = useCallback(() => {
    if (heroAnimationTriggeredRef.current) {
      return;
    }
    heroAnimationTriggeredRef.current = true;
    const timeline = heroTimelineRef.current;
    if (timeline) {
      timeline.play();
    }
  }, []);

  const resetToPhase0 = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    autoplayTriggeredRef.current = false;
    heroAnimationTriggeredRef.current = false;

    const timeline = heroTimelineRef.current;
    if (timeline) {
      timeline.pause(0);
    }

    applyInitialVisualState();
    ensureAtTop();

    scrollPhaseRef.current = 0;
    nextPhaseReadyAtRef.current = getNow() + 300;
  }, [applyInitialVisualState, ensureAtTop]);

  const revertToPhase1 = useCallback(() => {
    const timeline = heroTimelineRef.current;
    if (timeline) {
      timeline.pause(0);
    }
    heroAnimationTriggeredRef.current = false;

    applyInitialVisualState();
    autoplayTriggeredRef.current = true;
    ensureAtTop();

    scrollPhaseRef.current = 1;
    nextPhaseReadyAtRef.current = getNow() + 300;
  }, [applyInitialVisualState, ensureAtTop]);

  const releaseToNextSection = useCallback(() => {
    if (scrollPhaseRef.current >= 3) {
      return;
    }
    scrollPhaseRef.current = 3;
    unlockScroll();
    if (typeof window !== "undefined") {
      const viewportDistance = window.innerHeight - RELEASE_SCROLL_OFFSET;
      animateViewportScroll(viewportDistance, dispatchThirdScrollComplete);
    } else {
      dispatchThirdScrollComplete();
    }
  }, [animateViewportScroll, dispatchThirdScrollComplete, unlockScroll]);

  useEffect(() => {
    const video = videoRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const buttons = buttonsRef.current;

    if (!video || !heading || !description || !buttons) {
      return;
    }

    const originalHeadingHTML = heading.innerHTML;

    const setupScene = () => {
      const headingText = heading.textContent || "";
      heading.innerHTML = headingText
        .split(" ")
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(" ");

      const headingWords = Array.from(heading.querySelectorAll<HTMLSpanElement>("span"));
      const buttonElements = Array.from(buttons.children) as HTMLElement[];

      headingWordElementsRef.current = headingWords;
      buttonElementsRef.current = buttonElements;

      if (!heroReadyRef.current && typeof window !== "undefined") {
        heroReadyRef.current = true;
        window.dispatchEvent(new Event("hero:video-ready"));
      }

      applyInitialVisualState();

      const timeline = gsap
        .timeline({ defaults: { ease: "power2.out" }, paused: true })
        .to(headingWords, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.5)",
          stagger: 0.08,
        })
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          buttonElements,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.3)",
            stagger: 0.1,
            onComplete: () => {
              gsap.set(buttonElements, { pointerEvents: "auto" });
            },
          },
          "-=0.4"
        );

      heroTimelineRef.current = timeline;

      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = false;
      video.pause();
      video.currentTime = 0;

      return () => {
        timeline.kill();
        heading.innerHTML = originalHeadingHTML;
        gsap.set(description, { clearProps: "all" });
        if (buttonElements.length > 0) {
          gsap.set(buttonElements, { clearProps: "all" });
        }
        heroTimelineRef.current = null;
        headingWordElementsRef.current = [];
        buttonElementsRef.current = [];
      };
    };

    let teardown: (() => void) | undefined;

    if (video.readyState >= 2) {
      teardown = setupScene();
    } else {
      const handleLoadedMetadata = () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        teardown = setupScene();
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        if (teardown) {
          teardown();
        }
      };
    }

    return () => {
      if (teardown) {
        teardown();
      }
    };
  }, [applyInitialVisualState]);

  useEffect(() => {
    lockScroll();
    ensureAtTop();
    ensureVideoPrimed();

    scrollPhaseRef.current = 0;
    autoplayTriggeredRef.current = false;
    heroAnimationTriggeredRef.current = false;
    nextPhaseReadyAtRef.current = getNow();
    thirdScrollEventDispatchedRef.current = false;

    return () => {
      unlockScroll();
    };
  }, [ensureAtTop, ensureVideoPrimed, lockScroll, unlockScroll]);

  const handleSectionScroll = useCallback(
    (direction: SectionScrollDirection) => {
      const now = getNow();

      if (direction === "forward") {
        if (scrollPhaseRef.current >= 3) {
          return false;
        }

        ensureAtTop();

        if (scrollPhaseRef.current === 0) {
          triggerAutoplay();
          scrollPhaseRef.current = 1;
          nextPhaseReadyAtRef.current = now + FIRST_PHASE_DELAY;
          return true;
        }

        if (scrollPhaseRef.current === 1) {
          if (now >= nextPhaseReadyAtRef.current) {
            playHeroAnimation();
            scrollPhaseRef.current = 2;
            nextPhaseReadyAtRef.current = now + SECOND_PHASE_DELAY;
          }
          return true;
        }

        if (scrollPhaseRef.current === 2) {
          if (now >= nextPhaseReadyAtRef.current) {
            releaseToNextSection();
          }
          return true;
        }

        return true;
      }

      if (scrollPhaseRef.current >= 3) {
        return false;
      }

      ensureAtTop();

      if (scrollPhaseRef.current === 2) {
        revertToPhase1();
        return true;
      }

      if (scrollPhaseRef.current === 1) {
        resetToPhase0();
        return true;
      }

      return true;
    },
    [
      ensureAtTop,
      playHeroAnimation,
      releaseToNextSection,
      resetToPhase0,
      revertToPhase1,
      triggerAutoplay,
    ]
  );

  useSectionScrollSteps("home", handleSectionScroll);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="hero-hover-container relative w-full h-full flex items-center justify-center">
          {/* Large Circle Glow - Behind everything, outside container */}
          <div
            className="hero-glow absolute rounded-full pointer-events-none"
            style={{
              width: "1000px",
              height: "1000px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(0, 189, 255, 0.4) 0%, rgba(16, 64, 198, 0.3) 30%, rgba(16, 64, 198, 0.15) 60%, transparent 100%)",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />

          {/* Oval Shape - Behind video, outside container */}
          <div
            className="hero-oval absolute rounded-full"
            style={{
              width: "750px",
              height: "750px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%)",
              zIndex: 2,
            }}
          />

          {/* Hero Video Container */}
          <div className="hero-video-container relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] z-10">

            {/* Video */}
            <video
              ref={videoRef}
              className="hero-video w-full h-full object-contain"
              style={{
                position: "relative",
                zIndex: 3,
                filter: "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)",
              }}
              src="/videohero.mp4"
              autoPlay={false}
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* Heading Content - Bottom Left */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container pb-8 md:pb-12">
          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-layout-xl">
            Transform Your Digital Presence
          </h1>
          <p ref={descriptionRef} className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
            Leading digital marketing agency specializing in WordPress development, SEO, social media marketing, and web design. Grow your online presence with our expert team.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-3 bg-[#1040C6] text-white rounded-full font-semibold hover:bg-[#00BDFF] transition-colors duration-300"
              onClick={() => scrollToTarget("#services")}
            >
              Get Started
            </button>
            <button
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300"
              onClick={() => scrollToTarget("#about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
