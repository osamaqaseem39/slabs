"use client";

import { useEffect } from "react";

/**
 * Applies native smooth scrolling behavior to the document while mounted.
 * Helpful when pages rely on anchor navigation or programmatic scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const html = document.documentElement;
    if (!html) {
      return;
    }

    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}

