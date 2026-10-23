"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Accessibility: Respect user's OS preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 2. Mobile / Low-spec detection:
    // Mobile devices (touchscreens) already have native hardware-accelerated 120Hz momentum scrolling.
    // Hijacking touch on mobile is what causes lag and battery drain, so we keep mobile 100% native.
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

    // 3. Initialize Lenis with ultra-optimized, buttery smooth settings
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out for natural feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95, // Prevents aggressive overshooting
      touchMultiplier: 0, // Never hijack touch gestures on mobile/trackpad pinch
      syncTouch: false,
      autoRaf: false, // We control the requestAnimationFrame for maximum efficiency
    });

    // If on a touchscreen device, don't smooth wheel either to ensure 0 CPU overhead
    if (isTouchDevice) {
      lenis.destroy();
      return;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis instance globally for scroll-to-top or anchor buttons if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Scroll to top instantly on route change
  useEffect(() => {
    const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
