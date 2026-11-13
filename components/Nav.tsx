"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId } from "@/lib/gsap";

type NavLink = { id: string; label: string };

export default function Nav({ links, email }: { links: NavLink[]; email: string }) {
  const [active, setActive] = useState<string>("");
  const [dark, setDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  // Active section + light/dark theme of whatever sits under the bar
  useLayoutEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
    const triggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: s,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActive(s.dataset.nav ?? s.id);
        },
      }),
    );
    const themeTriggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: s,
        start: "top 40px",
        end: "bottom 40px",
        onToggle: (self) => {
          if (self.isActive) setDark(s.dataset.theme === "dark");
        },
      }),
    );
    return () => [...triggers, ...themeTriggers].forEach((t) => t.kill());
  }, []);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: scroll lock, Esc, animated reveal
  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    if (open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      el.style.visibility = "visible";
      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: "inset(0% 0 0 0)" });
      } else {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" });
        gsap.fromTo(
          el.querySelectorAll("[data-m]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.07, delay: 0.35 },
        );
      }
    } else {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      if (prefersReducedMotion()) {
        el.style.visibility = "hidden";
      } else {
        gsap.to(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "expo.inOut",
          onComplete: () => {
            el.style.visibility = "hidden";
          },
        });
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the overlay start closing, then scroll
    setTimeout(() => scrollToId(id), open ? 450 : 0);
  };

  const tone = dark || open ? "text-cream" : "text-green";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-transform duration-700 ease-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${tone}`}
      >
        <div className="container-x flex items-center justify-between py-5 transition-colors duration-500">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0 });
            }}
            className="display text-2xl tracking-wide"
            aria-label="Manan Dave — back to top"
          >
            MD<span className="text-gold">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    aria-current={active === l.id ? "true" : undefined}
                    className="eyebrow group relative flex items-center gap-2 py-2"
                  >
                    <span
                      className={`h-1 w-1 rounded-full bg-gold transition-all duration-500 ease-expo ${
                        active === l.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                    <span className="link-line">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleBtn}
            type="button"
            className="eyebrow relative z-[70] flex h-11 items-center gap-3 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-expo ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-expo ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={overlay}
        id="mobile-menu"
        aria-hidden={!open}
        style={{ visibility: "hidden", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-0 z-[55] flex flex-col justify-between bg-green px-5 pb-10 pt-28 text-cream md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.id} className="overflow-hidden">
                <a
                  data-m
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  tabIndex={open ? 0 : -1}
                  className="display flex items-baseline gap-4 py-1 text-[clamp(3.2rem,15vw,5rem)]"
                >
                  <span className="eyebrow !text-[0.65rem] text-gold">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="overflow-hidden">
          <a
            data-m
            href={`mailto:${email}`}
            tabIndex={open ? 0 : -1}
            className="serif-accent block text-2xl text-gold"
          >
            {email}
          </a>
        </div>
      </div>
    </>
  );
}
