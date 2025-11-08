"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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

  const scrollToTarget = (target: string) => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(target);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

      const headingWords = heading.querySelectorAll<HTMLSpanElement>("span");
      const buttonElements = Array.from(buttons.children) as HTMLElement[];

      if (!heroReadyRef.current && typeof window !== "undefined") {
        heroReadyRef.current = true;
        window.dispatchEvent(new Event("hero:video-ready"));
      }

      gsap.set(headingWords, { opacity: 0, y: 60 });
      gsap.set(description, { opacity: 0, y: 40 });
      gsap.set(buttonElements, { opacity: 0, y: 30, scale: 0.9, pointerEvents: "none" });

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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const scrollKeys = new Set([
      " ",
      "PageDown",
      "PageUp",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
    ]);

    const body = typeof document !== "undefined" ? document.body : null;
    const documentElement =
      typeof document !== "undefined" ? document.documentElement : null;

    const originalBodyOverflow = body?.style.overflow ?? "";
    const originalHtmlOverflow = documentElement?.style.overflow ?? "";

    const lockScroll = () => {
      if (body) {
        body.style.overflow = "hidden";
      }
      if (documentElement) {
        documentElement.style.overflow = "hidden";
      }
    };

    const unlockScroll = () => {
      if (body) {
        body.style.overflow = originalBodyOverflow;
      }
      if (documentElement) {
        documentElement.style.overflow = originalHtmlOverflow;
      }
    };

    const getNow = () =>
      typeof performance !== "undefined" ? performance.now() : Date.now();

    const ensureAtTop = () => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0 });
      }
    };

    const ensureVideoPrimed = () => {
      video.autoplay = false;
      video.pause();
      if (video.readyState >= 2) {
        video.currentTime = 0;
      }
    };

    lockScroll();
    ensureAtTop();
    ensureVideoPrimed();

    scrollPhaseRef.current = 0;
    autoplayTriggeredRef.current = false;
    heroAnimationTriggeredRef.current = false;
    nextPhaseReadyAtRef.current = getNow();

    const triggerAutoplay = () => {
      if (autoplayTriggeredRef.current) {
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
    };

    const playHeroAnimation = () => {
      if (heroAnimationTriggeredRef.current) {
        return;
      }
      heroAnimationTriggeredRef.current = true;
      const timeline = heroTimelineRef.current;
      if (timeline) {
        timeline.play();
      }
    };

    const handleInitialInteraction = () => {
      ensureAtTop();
      triggerAutoplay();
      scrollPhaseRef.current = 1;
      nextPhaseReadyAtRef.current = getNow() + 1600;
    };

    const handleSecondInteraction = () => {
      ensureAtTop();
      playHeroAnimation();
      scrollPhaseRef.current = 2;
      nextPhaseReadyAtRef.current = getNow() + 1800;
    };

    const releaseToNextSection = () => {
      if (scrollPhaseRef.current >= 3) {
        return;
      }
      scrollPhaseRef.current = 3;
      removeInteractionListeners();
      unlockScroll();
      const targetOffset =
        typeof window !== "undefined" ? window.innerHeight || 0 : 0;

      if (typeof window !== "undefined") {
        window.scrollTo({ top: targetOffset, behavior: "smooth" });
      } else {
        const section = sectionRef.current;
        if (section?.nextElementSibling instanceof HTMLElement) {
          section.nextElementSibling.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (scrollPhaseRef.current >= 3) {
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      ensureAtTop();
      if (scrollPhaseRef.current === 0) {
        handleInitialInteraction();
        return;
      }
      if (scrollPhaseRef.current === 1) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          handleSecondInteraction();
        }
        return;
      }
      if (scrollPhaseRef.current === 2) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          releaseToNextSection();
        }
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (scrollPhaseRef.current >= 3) {
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      ensureAtTop();
      if (scrollPhaseRef.current === 0) {
        handleInitialInteraction();
        return;
      }
      if (scrollPhaseRef.current === 1) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          handleSecondInteraction();
        }
        return;
      }
      if (scrollPhaseRef.current === 2) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          releaseToNextSection();
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!scrollKeys.has(event.key) || scrollPhaseRef.current >= 3) {
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      ensureAtTop();
      if (scrollPhaseRef.current === 0) {
        handleInitialInteraction();
        return;
      }
      if (scrollPhaseRef.current === 1) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          handleSecondInteraction();
        }
        return;
      }
      if (scrollPhaseRef.current === 2) {
        if (getNow() >= nextPhaseReadyAtRef.current) {
          releaseToNextSection();
        }
      }
    };

    const handleScroll = () => {
      if (scrollPhaseRef.current >= 3) {
        return;
      }
      ensureAtTop();
    };

    function removeInteractionListeners() {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      removeInteractionListeners();
      unlockScroll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
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
