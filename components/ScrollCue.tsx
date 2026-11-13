"use client";

import { scrollToId } from "@/lib/gsap";

export default function ScrollCue() {
  return (
    <a
      href="#about"
      data-intro
      data-order="5"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("about");
      }}
      className="group flex items-center gap-4"
      aria-label="Scroll to the About section"
    >
      <span className="relative block h-14 w-px overflow-hidden bg-cream/25 scroll-line" aria-hidden="true" />
      <span className="eyebrow text-cream/80 transition-colors group-hover:text-gold">Scroll</span>
    </a>
  );
}
