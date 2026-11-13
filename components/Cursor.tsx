"use client";

import { useEffect, useRef } from "react";
import { gsap, finePointer, prefersReducedMotion } from "@/lib/gsap";

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    const r = ring.current!;
    const d = dot.current!;
    const l = label.current!;
    document.documentElement.classList.add("has-cursor");

    gsap.set([r, d], { xPercent: -50, yPercent: -50, opacity: 0 });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.1, ease: "power3" });

    const move = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      gsap.to([r, d], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a,button,[role='button']");
      if (tagged) {
        l.textContent = tagged.dataset.cursor ?? "";
        gsap.to(r, { scale: 4.2, backgroundColor: "rgba(195,162,104,0.95)", borderColor: "rgba(195,162,104,0)", duration: 0.5, ease: "expo.out" });
        gsap.to(l, { opacity: 1, duration: 0.3 });
        gsap.to(d, { scale: 0, duration: 0.2 });
      } else if (interactive) {
        gsap.to(r, { scale: 1.8, backgroundColor: "rgba(195,162,104,0)", borderColor: "rgba(195,162,104,1)", duration: 0.4, ease: "expo.out" });
        gsap.to(l, { opacity: 0, duration: 0.2 });
        gsap.to(d, { scale: 1, duration: 0.2 });
      } else {
        gsap.to(r, { scale: 1, backgroundColor: "rgba(195,162,104,0)", borderColor: "rgba(195,162,104,1)", duration: 0.4, ease: "expo.out" });
        gsap.to(l, { opacity: 0, duration: 0.2 });
        gsap.to(d, { scale: 1, duration: 0.2 });
      }
    };
    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-gold"
      >
        <span
          ref={label}
          className="eyebrow !text-[0.38rem] font-semibold tracking-[0.18em] text-green opacity-0"
        />
      </div>
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold" />
    </div>
  );
}
