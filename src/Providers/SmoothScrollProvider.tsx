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
      prevent: (node: HTMLElement) => {
        if (!node || typeof node.closest !== "function") return false;

        // A. Any element explicitly marked with data-lenis-prevent
        if (node.closest("[data-lenis-prevent], [data-lenis-prevent-wheel]")) {
          return true;
        }

        // B. Any modal, dialog, sheet, drawer, popup, or Radix portal
        if (
          node.closest(
            '[role="dialog"], [role="alertdialog"], [data-radix-portal], [data-slot="dialog-content"], [data-slot="sheet-content"], [aria-modal="true"], .modal, .dialog'
          )
        ) {
          return true;
        }

        // C. If any modal is currently open in the DOM, prevent Lenis from scrolling the background website
        const isModalOpen = Boolean(
          document.querySelector(
            '[role="dialog"], [data-radix-portal] [data-state="open"], [aria-modal="true"], [data-slot="dialog-content"][data-state="open"]'
          ) ||
          document.body.hasAttribute("data-scroll-locked") ||
          document.body.style.overflow === "hidden"
        );
        if (isModalOpen) {
          return true;
        }

        // D. Any nested scrollable container where content exceeds client height
        let el: HTMLElement | null = node;
        while (el && el !== document.body && el !== document.documentElement) {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          if (
            (overflowY === "auto" || overflowY === "scroll") &&
            el.scrollHeight > el.clientHeight
          ) {
            return true;
          }
          el = el.parentElement;
        }

        return false;
      },
    });

    // If on a touchscreen device, don't smooth wheel either to ensure 0 CPU overhead
    if (isTouchDevice) {
      lenis.destroy();
      return;
    }

    // 4. Synchronize modal open/close states so the background page never scrolls while a modal is open
    const modalObserver = new MutationObserver(() => {
      const hasOpenModal = Boolean(
        document.querySelector(
          '[role="dialog"], [data-radix-portal] [data-state="open"], [aria-modal="true"], [data-slot="dialog-content"][data-state="open"]'
        ) ||
        document.body.hasAttribute("data-scroll-locked") ||
        document.body.style.overflow === "hidden"
      );
      if (hasOpenModal) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    modalObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked", "style", "class"],
      childList: true,
      subtree: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis instance globally for scroll-to-top or anchor buttons if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      modalObserver.disconnect();
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

