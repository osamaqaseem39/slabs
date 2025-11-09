"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useSectionScrollSteps, {
  type SectionScrollDirection,
} from "@/hooks/useSectionScrollSteps";
import { smoothScrollIntoView, DEFAULT_SCROLL_DURATION } from "@/lib/smoothScroll";

const HERO_SECTION_ID = "home";
const HERO_SCROLL_STAGE_COUNT = 3;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const originalHeadingHTMLRef = useRef<string | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const stageRef = useRef(0);
  const sequenceCompleteRef = useRef(false);
  const thirdScrollDispatchedRef = useRef(false);

  const [stage, setStage] = useState(0);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  const setStageValue = useCallback((nextStage: number) => {
    const clamped = Math.max(0, Math.min(HERO_SCROLL_STAGE_COUNT, nextStage));
    const previous = stageRef.current;

    if (previous === clamped) {
      return previous;
    }

    stageRef.current = clamped;
    setStage(clamped);

    const isComplete = clamped >= HERO_SCROLL_STAGE_COUNT;
    sequenceCompleteRef.current = isComplete;
    setIsSequenceComplete(isComplete);

    if (!isComplete) {
      thirdScrollDispatchedRef.current = false;
    }

    return clamped;
  }, []);

  const markSequenceComplete = useCallback(() => {
    if (stageRef.current < HERO_SCROLL_STAGE_COUNT) {
      setStageValue(HERO_SCROLL_STAGE_COUNT);
    }
  }, [setStageValue]);

  const scrollToTarget = useCallback(
    (target: string) => {
      if (typeof window === "undefined") {
        return false;
      }

      const element = document.querySelector(target);
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      if (target !== "#home") {
        markSequenceComplete();
      }

      smoothScrollIntoView(element, { duration: DEFAULT_SCROLL_DURATION });
      return true;
    },
    [markSequenceComplete]
  );

  const handleHeroScroll = useCallback(
    (direction: SectionScrollDirection) => {
      if (sequenceCompleteRef.current) {
        return false;
      }

      if (direction === "forward") {
        const nextStage = stageRef.current + 1;

        if (nextStage < HERO_SCROLL_STAGE_COUNT) {
          setStageValue(nextStage);
          return true;
        }

        if (nextStage === HERO_SCROLL_STAGE_COUNT) {
          setStageValue(nextStage);
          return false;
        }

        return false;
      }

      if (direction === "backward") {
        if (stageRef.current > 0) {
          setStageValue(stageRef.current - 1);
          return true;
        }

        return false;
      }

      return false;
    },
    [setStageValue]
  );

  useSectionScrollSteps(HERO_SECTION_ID, isSequenceComplete ? null : handleHeroScroll);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const globalWindow = window as typeof window & {
      __heroThirdScrollComplete?: boolean;
    };

    if (globalWindow.__heroThirdScrollComplete) {
      setStageValue(HERO_SCROLL_STAGE_COUNT);
    }
  }, [setStageValue]);

  useEffect(() => {
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    const buttonsEl = buttonsRef.current;
    const videoEl = videoRef.current;
    const videoContainer = videoContainerRef.current;

    if (!headingEl || !descriptionEl || !buttonsEl || !videoEl) {
      return;
    }

    originalHeadingHTMLRef.current = headingEl.innerHTML;
    const headingText = headingEl.textContent ?? "";
    headingEl.innerHTML = headingText
      .split(" ")
      .map((word) => `<span class="inline-block">${word}</span>`)
      .join(" ");

    const headingWords = Array.from(
      headingEl.querySelectorAll<HTMLSpanElement>("span")
    );
    const buttonElements = Array.from(buttonsEl.children) as HTMLElement[];

    gsap.set(headingWords, { opacity: 0, y: 60 });
    gsap.set(descriptionEl, { opacity: 0, y: 40 });
    gsap.set(buttonElements, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      pointerEvents: "none",
    });

    if (videoContainer) {
      gsap.set(videoContainer, { scale: 0.92 });
    }

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
        descriptionEl,
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

    timeline.eventCallback("onReverseComplete", () => {
      if (buttonElements.length) {
        gsap.set(buttonElements, { pointerEvents: "none" });
      }
    });

    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.autoplay = false;
    videoEl.playsInline = true;
    videoEl.pause();
    videoEl.currentTime = 0;

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
      timelineRef.current = null;

      headingEl.innerHTML = originalHeadingHTMLRef.current ?? headingEl.innerHTML;
      originalHeadingHTMLRef.current = null;

      gsap.set(descriptionEl, { clearProps: "all" });
      if (buttonElements.length) {
        gsap.set(buttonElements, { clearProps: "all" });
      }

      if (videoContainer) {
        gsap.set(videoContainer, { clearProps: "transform" });
      }
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const videoEl = videoRef.current;
    const buttonElements = buttonsRef.current
      ? (Array.from(buttonsRef.current.children) as HTMLElement[])
      : [];

    if (stage >= 1) {
      timeline?.play();
    } else {
      timeline?.reverse();
      if (buttonElements.length) {
        gsap.set(buttonElements, { pointerEvents: "none" });
      }
    }

    if (videoEl) {
      if (stage >= 2) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            videoEl.muted = true;
            return videoEl.play().catch(() => undefined);
          });
        }

        gsap.to(videoEl, {
          duration: 1.4,
          ease: "power3.out",
          filter:
            "brightness(1.18) contrast(1.28) saturate(1.18) hue-rotate(200deg)",
        });
      } else {
        videoEl.pause();
        videoEl.currentTime = 0;

        gsap.to(videoEl, {
          duration: 0.6,
          ease: "power2.out",
          filter:
            "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)",
        });
      }
    }

    if (videoContainerRef.current) {
      gsap.to(videoContainerRef.current, {
        scale: stage >= 2 ? 1 : 0.92,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (stage >= HERO_SCROLL_STAGE_COUNT && !thirdScrollDispatchedRef.current) {
      thirdScrollDispatchedRef.current = true;

      if (typeof window !== "undefined") {
        const globalWindow = window as typeof window & {
          __heroThirdScrollComplete?: boolean;
        };
        globalWindow.__heroThirdScrollComplete = true;
        window.dispatchEvent(new CustomEvent("hero:third-scroll-complete"));
      }
    }
  }, [stage]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || typeof window === "undefined") {
      return;
    }

    let resolved = false;
    const notifyReady = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      window.dispatchEvent(new CustomEvent("hero:video-ready"));
    };

    if (videoEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      notifyReady();
      return;
    }

    const handleReady = () => {
      notifyReady();
    };

    videoEl.addEventListener("canplaythrough", handleReady);
    videoEl.addEventListener("loadeddata", handleReady);

    return () => {
      videoEl.removeEventListener("canplaythrough", handleReady);
      videoEl.removeEventListener("loadeddata", handleReady);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={HERO_SECTION_ID}
      data-hero-stage={stage}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="hero-hover-container relative w-full h-full flex items-center justify-center">
          <div
            className="hero-glow absolute rounded-full pointer-events-none"
            style={{
              width: "1000px",
              height: "1000px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(0, 189, 255, 0.4) 0%, rgba(16, 64, 198, 0.3) 30%, rgba(16, 64, 198, 0.15) 60%, transparent 100%)",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />

          <div
            className="hero-oval absolute rounded-full"
            style={{
              width: "750px",
              height: "750px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%)",
              zIndex: 2,
            }}
          />

          <div
            ref={videoContainerRef}
            className="hero-video-container relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] z-10"
          >
            <video
              ref={videoRef}
              className="hero-video w-full h-full object-contain"
              style={{
                position: "relative",
                zIndex: 3,
                filter:
                  "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)",
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

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container pb-8 md:pb-12">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-layout-xl"
          >
            Transform Your Digital Presence
          </h1>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-6"
          >
            Leading digital marketing agency specializing in WordPress development, SEO, social
            media marketing, and web design. Grow your online presence with our expert team.
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
              onClick={() => scrollToTarget("#technology")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
