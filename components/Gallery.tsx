"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/assets";

// Editorial rhythm: rows pair up as 7+5, 5+7 … Images keep their natural aspect (never cropped).
const PATTERN = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

function spanFor(p: Project, i: number, total: number) {
  const alone = i === total - 1 && i % 2 === 0; // last item would sit alone in its row
  if (alone) {
    const portrait = p.width / p.height < 0.85;
    return portrait ? "md:col-span-5 md:col-start-4" : "md:col-span-8 md:col-start-3";
  }
  return PATTERN[i % PATTERN.length];
}

export default function Gallery({ projects, startIndex }: { projects: Project[]; startIndex: number }) {
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setCurrent(i);
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (d: number) => setCurrent((c) => (c === null ? c : (c + d + projects.length) % projects.length)),
    [projects.length],
  );

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    if (current !== null && !dlg.open) {
      dlg.showModal();
      window.__lenis?.stop();
    }
  }, [current]);

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const onClose = () => {
      setCurrent(null);
      window.__lenis?.start();
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    window.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      window.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const active = current !== null ? projects[current] : null;

  return (
    <>
      <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-24">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className={`${spanFor(p, i, projects.length)} ${i % 2 === 1 ? "md:mt-24" : ""}`}
          >
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              data-cursor="View"
              aria-label={`Open ${p.title} full size`}
              className="group block w-full text-left"
            >
              <div data-clip className="overflow-hidden rounded-[1.1rem] bg-ivory shadow-[0_1px_0_rgba(18,61,51,0.08)]">
                <div data-scale className="overflow-hidden">
                  <Image
                    src={p.src}
                    alt={`${p.title} — ${p.category}, design by Manan Dave`}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width:1024px) 55vw, (min-width:768px) 60vw, 92vw"
                    quality={85}
                    className="h-auto w-full transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.045]"
                  />
                </div>
              </div>

              <div data-fade className="mt-5 flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow text-goldink">{String(startIndex + i + 1).padStart(2, "0")}</span>
                  <span className="display relative text-3xl text-green sm:text-4xl">
                    <span className="inline-block transition-transform duration-500 ease-expo group-hover:translate-x-2">
                      {p.title}
                    </span>
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="text-xl text-gold transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" aria-label={active ? `${active.title}, full size` : "Project viewer"}>
        {active ? (
          <div
            className="flex h-full w-full flex-col"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-10">
              <p className="eyebrow text-gold">
                {String((current ?? 0) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="eyebrow link-line py-2" autoFocus>
                Close ✕
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1 px-5 sm:px-24"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  key={active.slug}
                  src={active.src}
                  alt={`${active.title} — ${active.category}, design by Manan Dave`}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority
                  className="object-contain"
                />
              </div>
              {projects.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                    className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-xl text-gold transition-colors hover:bg-gold hover:text-green sm:left-6"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next project"
                    className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-xl text-gold transition-colors hover:bg-gold hover:text-green sm:right-6"
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>

            <div className="px-5 py-6 text-center sm:px-10">
              <p className="display text-4xl text-cream sm:text-5xl">{active.title}</p>
              <p className="eyebrow mt-2 text-gold">{active.category}</p>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
