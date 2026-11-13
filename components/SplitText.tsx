"use client";

import { createElement, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** "scroll" plays on enter; "intro" waits for the loader to finish */
  trigger?: "scroll" | "intro";
  delay?: number;
  stagger?: number;
  /** each word on its own line */
  block?: boolean;
};

/** Word-by-word masked reveal. Server-rendered as plain text, so it is fully readable without JS. */
export default function SplitText({
  text,
  as = "span",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.06,
  block = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>(".w-in");
    gsap.set(words, { yPercent: 115, visibility: "visible" });
    const play = () =>
      gsap.to(words, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger, delay });

    if (trigger === "intro") {
      if (window.__introDone) play();
      else window.addEventListener("intro", play, { once: true });
      return () => window.removeEventListener("intro", play);
    }
    const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: play });
    return () => st.kill();
  }, [trigger, delay, stagger]);

  return createElement(
    as,
    { ref, className },
    <span className="sr-only">{text}</span>,
    text.split(" ").map((w, i, arr) => (
      <span
        key={i}
        aria-hidden="true"
        className={`overflow-hidden align-bottom ${block ? "block" : "inline-block"} pb-[0.12em] -mb-[0.12em]`}
      >
        <span className="w-in inline-block will-change-transform">{w}</span>
        {!block && i < arr.length - 1 ? " " : null}
      </span>
    )),
  );
}
