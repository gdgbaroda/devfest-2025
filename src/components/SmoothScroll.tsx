"use client";
import { useEffect, useRef, useState } from "react";

// Tweakable controls
const DAMPING = 0.1; // 0.05 = very slow, 0.2 = faster
const WHEEL_MULTIPLIER = 0.8; // < 1 slows wheel, > 1 speeds it up
const STOP_THRESHOLD = 0.5; // px distance to snap to target

function isMobilePhone(): boolean {
  if (typeof window === "undefined") return false;

  // Check for mobile phone user agent (excluding tablets)
  const isMobilePhoneUA =
    /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Check for small screen size (mobile phones typically < 768px)
  const isSmallScreen = window.innerWidth < 768;

  // Check for touch capability combined with small screen
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isTouchPhone = hasTouch && isSmallScreen;

  const isMobile = isMobilePhoneUA || isTouchPhone;

  return isMobile;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function hasScrollableAncestor(
  el: EventTarget | null,
  deltaY: number
): boolean {
  let node: HTMLElement | null = (el as HTMLElement) || null;
  while (node && node !== document.body && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const oy = style.overflowY;
    const scrollable = oy === "auto" || oy === "scroll" || oy === "overlay";
    if (scrollable && node.scrollHeight > node.clientHeight) {
      const top = node.scrollTop;
      const max = node.scrollHeight - node.clientHeight;
      // If inner element can scroll further in the intended direction, don't hijack
      if ((deltaY < 0 && top > 0) || (deltaY > 0 && top < max)) return true;
    }
    // Move up the tree to avoid infinite loop
    node = node.parentElement;
  }
  // Allow the page to handle it (we will hijack at window level)
  return false;
}

export default function SmoothScroll() {
  const anim = useRef<number | null>(null);
  const current = useRef<number>(0);
  const target = useRef<number>(0);
  const disabled = useRef<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const isMobile = isMobilePhone();
    const prefersReduced = prefersReducedMotion();
    disabled.current = isMobile || prefersReduced;

    current.current = window.scrollY;
    target.current = window.scrollY;

    const onResize = () => {
      // Clamp target when viewport changes
      const max =
        (document.scrollingElement || document.documentElement).scrollHeight -
        window.innerHeight;
      target.current = Math.max(0, Math.min(max, target.current));
    };

    const step = () => {
      const c = current.current;
      const t = target.current;
      const d = t - c;
      // damping factor controls smoothness
      const next = c + d * DAMPING;
      current.current = next;
      window.scrollTo(0, next);
      if (Math.abs(d) > STOP_THRESHOLD) {
        anim.current = requestAnimationFrame(step);
      } else {
        // Snap to the exact target to finish cleanly
        window.scrollTo(0, t);
        anim.current = null;
      }
    };

    const queueTo = (deltaY: number) => {
      const max =
        (document.scrollingElement || document.documentElement).scrollHeight -
        window.innerHeight;
      const unit = 1; // pixels by default
      const next = target.current + deltaY * unit;
      target.current = Math.max(0, Math.min(max, next));
      if (anim.current == null) anim.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (disabled.current) return;
      // Don't interfere with pinch-zoom
      if (e.ctrlKey) return;
      // If page isn't scrollable, let the browser be
      const maxScrollable =
        (document.scrollingElement || document.documentElement).scrollHeight -
        window.innerHeight;
      if (maxScrollable <= 0) return;
      // Skip when inside a scrollable container that can still scroll
      if (hasScrollableAncestor(e.target, e.deltaY)) return;

      // Only hijack vertical scroll
      const dy = e.deltaY;
      if (dy === 0) return;

      e.preventDefault();

      // Normalize delta for non-pixel modes
      let delta = dy;
      if (e.deltaMode === 1) delta *= 16; // lines -> px approx
      if (e.deltaMode === 2) delta *= window.innerHeight; // pages -> px

      queueTo(delta * WHEEL_MULTIPLIER);
    };

    const onKey = (e: KeyboardEvent) => {
      if (disabled.current) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      let delta = 0;
      const page = Math.round(window.innerHeight * 0.9);
      switch (e.key) {
        case "ArrowDown":
          delta = 60;
          break;
        case "ArrowUp":
          delta = -60;
          break;
        case "PageDown":
          delta = page;
          break;
        case "PageUp":
          delta = -page;
          break;
        case "Home":
          target.current = 0;
          break;
        case "End": {
          const max =
            (document.scrollingElement || document.documentElement)
              .scrollHeight - window.innerHeight;
          target.current = max;
          break;
        }
        case " ": // Space
          delta = e.shiftKey ? -page : page;
          break;
      }
      if (delta !== 0) {
        e.preventDefault();
        queueTo(delta);
      }
    };

    const onNativeScroll = () => {
      // Keep our current position in sync if user scrolls programmatically
      if (anim.current == null) {
        current.current = window.scrollY;
        target.current = window.scrollY;
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });

    return () => {
      if (anim.current != null) cancelAnimationFrame(anim.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return null;
}
