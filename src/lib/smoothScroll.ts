"use client";

export const DEFAULT_SCROLL_DURATION = 720;

type SmoothScrollOptions = {
  duration?: number;
  offset?: number;
  ease?: (t: number) => number;
  onComplete?: () => void;
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeAnimation: number | null = null;

export function smoothScrollTo(targetY: number, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) {
    options.onComplete?.();
    return;
  }

  if (activeAnimation != null) {
    cancelAnimationFrame(activeAnimation);
    activeAnimation = null;
  }

  const duration = Math.max(0, options.duration ?? DEFAULT_SCROLL_DURATION);
  const ease = options.ease ?? easeInOutCubic;
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
    const eased = ease(progress);

    window.scrollTo({
      top: startY + delta * eased,
    });

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
    } else {
      activeAnimation = null;
      options.onComplete?.();
    }
  };

  activeAnimation = requestAnimationFrame(step);
}

export function smoothScrollIntoView(
  element: HTMLElement,
  options: SmoothScrollOptions = {}
) {
  if (typeof window === "undefined") {
    return false;
  }

  const offset = options.offset ?? 0;
  const rect = element.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - offset;

  smoothScrollTo(targetY, options);
  return true;
}


