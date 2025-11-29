import { useEffect, useRef } from "react";
import { getSectionScrollHandler, type SectionScrollDirection } from "./useSectionScrollSteps";
import { smoothScrollTo } from "@/lib/smoothScroll";

type NavigateFn = (targetId: string) => boolean;

type UseUnifiedSectionScrollOptions = {
  sections: string[];
  activeId: string | null;
  navigate: NavigateFn;
  enabled?: boolean;
  wheelThreshold?: number;
  touchThreshold?: number;
  cooldown?: number;
};

const DEFAULT_WHEEL_THRESHOLD = 80;
const DEFAULT_TOUCH_THRESHOLD = 60;
const DEFAULT_COOLDOWN = 900;

const KEYBOARD_SCROLL_KEYS = new Set([
  " ",
  "Spacebar",
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
]);

const isScrollableElement = (element: EventTarget | null): boolean => {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  const isScrollableY = overflowY === "auto" || overflowY === "scroll";

  if (isScrollableY && element.scrollHeight > element.clientHeight) {
    return true;
  }

  if (element.dataset?.universalScrollIgnore) {
    return true;
  }

  return isScrollableElement(element.parentElement);
};

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const normalizeWheelDelta = (event: WheelEvent) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
    return event.deltaY;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 40;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
};

export function useUnifiedSectionScroll({
  sections,
  activeId,
  navigate,
  enabled = true,
  wheelThreshold = DEFAULT_WHEEL_THRESHOLD,
  touchThreshold = DEFAULT_TOUCH_THRESHOLD,
  cooldown = DEFAULT_COOLDOWN,
}: UseUnifiedSectionScrollOptions) {
  const activeIndexRef = useRef(-1);
  const wheelAccumulatorRef = useRef(0);
  const isCoolingDownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchDeltaAccumRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = sections.findIndex((id) => id === activeId);
  }, [activeId, sections]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    if (sections.length === 0) {
      return;
    }

    const startCooldown = () => {
      isCoolingDownRef.current = true;
      window.setTimeout(() => {
        isCoolingDownRef.current = false;
      }, cooldown);
    };

    const checkSectionBounds = (sectionElement: HTMLElement): { atTop: boolean; atBottom: boolean; isTallerThanViewport: boolean } => {
      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + viewportHeight;
      
      // Get absolute positions (relative to document top)
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + sectionHeight;

      const isTallerThanViewport = sectionHeight > viewportHeight;
      
      // Check if we're at the top of the section (within a small threshold)
      // At top means viewport top is at or very close to section top
      const threshold = 50; // pixels threshold for "at boundary"
      const atTop = Math.abs(viewportTop - sectionTop) <= threshold || viewportTop < sectionTop + threshold;
      
      // Check if we're at the bottom of the section
      // At bottom means viewport bottom is at or very close to section bottom
      const atBottom = Math.abs(viewportBottom - sectionBottom) <= threshold || viewportBottom > sectionBottom - threshold;

      return { atTop, atBottom, isTallerThanViewport };
    };

    const moveToDelta = (delta: number) => {
      if (isCoolingDownRef.current) {
        return;
      }

      const currentIndex =
        activeIndexRef.current >= 0 ? activeIndexRef.current : 0;
      const currentSectionId = sections[currentIndex];

      const direction: SectionScrollDirection = delta > 0 ? "forward" : "backward";

      const sectionHandler = currentSectionId
        ? getSectionScrollHandler(currentSectionId)
        : null;

      if (sectionHandler) {
        const handled = sectionHandler(direction);
        if (handled) {
          startCooldown();
          return;
        }
      }

      // Check if we need to scroll within the current section first
      const currentSectionElement = currentSectionId ? document.getElementById(currentSectionId) : null;
      
      if (currentSectionElement) {
        const { atTop, atBottom, isTallerThanViewport } = checkSectionBounds(currentSectionElement);

        // If section is taller than viewport, handle internal scrolling first
        if (isTallerThanViewport) {
          const rect = currentSectionElement.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          const viewportHeight = window.innerHeight;

          if (delta > 0 && !atBottom) {
            // Scrolling forward but not at bottom - scroll to bottom of section first
            // Position viewport so its bottom aligns with section bottom
            const targetScrollY = sectionBottom - viewportHeight;
            smoothScrollTo(Math.max(0, targetScrollY), {
              duration: 720,
            });
            startCooldown();
            return;
          } else if (delta < 0 && !atTop) {
            // Scrolling backward but not at top - scroll to top of section first
            smoothScrollTo(sectionTop, {
              duration: 720,
            });
            startCooldown();
            return;
          }
          // If we're at the boundary, proceed to next section
        }
      }

      const nextIndex = clamp(currentIndex + delta, 0, sections.length - 1);

      if (nextIndex === currentIndex) {
        return;
      }

      const success = navigate(sections[nextIndex]);
      if (success) {
        startCooldown();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isCoolingDownRef.current) {
        event.preventDefault();
        return;
      }

      if (isScrollableElement(event.target)) {
        return;
      }

      const deltaY = normalizeWheelDelta(event);

      if (Math.abs(deltaY) < 1) {
        return;
      }

      wheelAccumulatorRef.current += deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < wheelThreshold) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;

      if (event.cancelable) {
        event.preventDefault();
      }

      moveToDelta(direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (isScrollableElement(event.target)) {
        return;
      }

      const touch = event.touches[0];
      touchStartYRef.current = touch?.clientY ?? null;
      touchDeltaAccumRef.current = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isCoolingDownRef.current) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      if (isScrollableElement(event.target)) {
        return;
      }

      const touch = event.touches[0];
      const startY = touchStartYRef.current;

      if (startY == null || !touch) {
        return;
      }

      const delta = startY - touch.clientY;
      touchDeltaAccumRef.current += delta;
      touchStartYRef.current = touch.clientY;

      if (Math.abs(touchDeltaAccumRef.current) < touchThreshold) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }

      const direction = touchDeltaAccumRef.current > 0 ? 1 : -1;
      touchDeltaAccumRef.current = 0;
      touchStartYRef.current = touch.clientY;

      if (event.cancelable) {
        event.preventDefault();
      }

      moveToDelta(direction);
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      touchDeltaAccumRef.current = 0;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isCoolingDownRef.current) {
        event.preventDefault();
        return;
      }

      if (!KEYBOARD_SCROLL_KEYS.has(event.key)) {
        return;
      }

      if (isScrollableElement(event.target)) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      if (event.key === "Home") {
        navigate(sections[0]);
        startCooldown();
        return;
      }

      if (event.key === "End") {
        navigate(sections[sections.length - 1]);
        startCooldown();
        return;
      }

      const direction =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " " ||
        event.key === "Spacebar"
          ? 1
          : -1;

      moveToDelta(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    enabled,
    sections,
    navigate,
    wheelThreshold,
    touchThreshold,
    cooldown,
  ]);
}

export default useUnifiedSectionScroll;

