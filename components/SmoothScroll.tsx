"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const unlock = () => lenis.start();
    window.addEventListener("intro", unlock, { once: true });
    if (window.__introDone) lenis.start();

    // Jump to hash on first load
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) window.addEventListener("intro", () => lenis.scrollTo(el, { immediate: true }), { once: true });
    }

    return () => {
      window.removeEventListener("intro", unlock);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
