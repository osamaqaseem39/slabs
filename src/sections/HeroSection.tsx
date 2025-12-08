"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import useSectionScrollSteps, {
  type SectionScrollDirection,
} from "@/hooks/useSectionScrollSteps";
import { smoothScrollIntoView, DEFAULT_SCROLL_DURATION } from "@/lib/smoothScroll";

const HERO_SECTION_ID = "home";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const originalHeadingHTMLRef = useRef<string | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasScrolledRef = useRef(false);

  const scrollToTarget = useCallback(
    (target: string) => {
      if (typeof window === "undefined") {
        return false;
      }

      const element = document.querySelector(target);
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      smoothScrollIntoView(element, { duration: DEFAULT_SCROLL_DURATION });
      return true;
    },
    []
  );

  const handleHeroScroll = useCallback(
    (direction: SectionScrollDirection) => {
      if (hasScrolledRef.current) {
        return false;
      }

      if (direction === "forward") {
        hasScrolledRef.current = true;
        
        // Complete all animations immediately
        const timeline = timelineRef.current;
        if (timeline) {
          timeline.play();
        }

        // Scroll to next section
        const nextSection = document.querySelector("#services");
        if (nextSection instanceof HTMLElement) {
          smoothScrollIntoView(nextSection, { duration: DEFAULT_SCROLL_DURATION });
        }
        
        return false;
      }

      return false;
    },
    []
  );

  useSectionScrollSteps(HERO_SECTION_ID, handleHeroScroll);


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
      gsap.set(videoContainer, { opacity: 1 });
    }

    const timeline = gsap
      .timeline({ defaults: { ease: "power2.out" }, paused: false })
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

    videoEl.loop = true;
    videoEl.muted = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;

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
        gsap.set(videoContainer, { clearProps: "opacity" });
      }
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      // Always try to play the video for background
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoEl.muted = true;
          return videoEl.play().catch(() => undefined);
        });
      }

      gsap.to(videoEl, {
        duration: 0.6,
        ease: "power2.out",
        filter:
          "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)",
      });
    }

    if (videoContainerRef.current) {
      gsap.to(videoContainerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

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

    const handleReady = () => {
      notifyReady();
      // Ensure video plays when ready
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video autoplay failed:", error);
          videoEl.muted = true;
          videoEl.play().catch(() => {
            // Silently fail if still can't play
          });
        });
      }
    };

    const handleError = () => {
      console.error("Video failed to load:", videoEl.error);
    };

    if (videoEl.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleReady();
    } else {
      videoEl.addEventListener("canplaythrough", handleReady);
      videoEl.addEventListener("loadeddata", handleReady);
      videoEl.addEventListener("error", handleError);
    }

    // Try to play immediately
    handleReady();

    return () => {
      videoEl.removeEventListener("canplaythrough", handleReady);
      videoEl.removeEventListener("loadeddata", handleReady);
      videoEl.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={HERO_SECTION_ID}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity: 1 }}
      >
        <video
          ref={videoRef}
          className="hero-video w-full h-full object-cover"
          style={{
            filter:
              "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)",
            width: "100%",
            height: "100%",
          }}
          src="/videohero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20, 27, 56, 0.6) 0%, rgba(20, 27, 56, 0.5) 50%, rgba(16, 64, 198, 0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-[2]">
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
            Synovo Labs specializes in WordPress development, SEO, social
            media marketing, and web design. Grow your online presence with our expert team.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-3 bg-[#00bef7] text-white rounded-full font-semibold hover:bg-[#00bef7] transition-colors duration-300"
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
