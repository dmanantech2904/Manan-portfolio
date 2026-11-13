"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * One place for all attribute-driven scroll animation:
 *   [data-fade]     fade + rise on enter (data-delay in seconds)
 *   [data-clip]     image reveal via clip-path, inner [data-scale] settles from 1.18 → 1
 *   [data-parallax] subtle scrubbed vertical drift (value = strength, e.g. 0.08)
 *   [data-rule]     gold rule draws in
 *   [data-intro]    hero elements, play after the loader finishes (data-order)
 */
export default function Animations() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.set(el, { y: 36 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              delay: Number(el.dataset.delay ?? 0),
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const inner = el.querySelector<HTMLElement>("[data-scale]");
        if (inner) gsap.set(inner, { scale: 1.18 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.inOut" });
            if (inner) gsap.to(inner, { scale: 1, duration: 1.8, ease: "expo.out" });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 95%",
          once: true,
          onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const strength = Number(el.dataset.parallax ?? 0.08);
        gsap.fromTo(
          el,
          { yPercent: strength * 100 },
          {
            yPercent: -strength * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Hero entrance, after the loader
      const intro = gsap.utils
        .toArray<HTMLElement>("[data-intro]")
        .sort((a, b) => Number(a.dataset.order ?? 0) - Number(b.dataset.order ?? 0));
      gsap.set(intro, { y: 30 });
      const play = () =>
        gsap.to(intro, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.35,
        });
      if (window.__introDone) play();
      else window.addEventListener("intro", play, { once: true });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
