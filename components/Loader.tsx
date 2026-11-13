"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

function finish() {
  document.documentElement.classList.remove("is-loading");
  window.__introDone = true;
  window.dispatchEvent(new Event("intro"));
}

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.display = "none";
      finish();
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem("md-intro") === "1";
      sessionStorage.setItem("md-intro", "1");
    } catch {
      /* storage unavailable */
    }

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          finish();
        },
      });

      gsap.set("[data-l]", { yPercent: 110 });
      tl.to("[data-l]", { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.1)
        .to("[data-lrule]", { scaleX: 1, duration: seen ? 0.5 : 1.3, ease: "power3.inOut" }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: seen ? 0.5 : 1.3,
            ease: "power3.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.2,
        )
        .to("[data-l]", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.04 }, ">+0.1")
        .to("[data-lmeta]", { opacity: 0, duration: 0.4 }, "<")
        .to(el, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.25");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-green text-cream"
      aria-hidden="true"
    >
      <div className="flex gap-[0.04em] overflow-hidden px-4 pb-[0.1em] pt-[0.05em]">
        {"MANAN DAVE".split("").map((ch, i) => (
          <span
            key={i}
            data-l
            className="display inline-block text-[clamp(3rem,11vw,8rem)]"
            style={{ width: ch === " " ? "0.3em" : undefined }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
      <div data-lmeta className="mt-8 flex w-[min(320px,70vw)] items-center gap-4">
        <div className="h-px flex-1 origin-left scale-x-0 bg-gold" data-lrule />
        <span ref={count} className="eyebrow w-10 text-right tabular-nums text-gold">
          000
        </span>
      </div>
    </div>
  );
}
