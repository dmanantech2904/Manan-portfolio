"use client";

import { useRef, useState } from "react";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { site } from "@/lib/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section
      id="contact"
      data-section
      data-theme="dark"
      className="relative overflow-hidden bg-green py-24 text-cream sm:py-32 lg:py-44"
    >
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-gold sm:w-3" />
      <div className="container-x">
        <div className="mb-8 flex items-center gap-5">
          <span className="eyebrow text-gold">06 — Contact</span>
          <span data-rule className="h-px max-w-40 flex-1 bg-gold" />
        </div>

        <SplitText
          as="h2"
          text="Let's create something remarkable together."
          stagger={0.07}
          className="display text-[clamp(3.6rem,11.5vw,12rem)]"
        />

        <p data-fade className="serif-accent mt-10 max-w-2xl text-[clamp(1.4rem,2.6vw,2.2rem)] leading-snug text-cream/90">
          Have a brand, a pack or a campaign in mind? I&rsquo;m open to new projects and collaborations —
          from logo &amp; identity to packaging, marketing creatives and video.
        </p>

        <div className="mt-14 flex flex-col gap-10 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <div data-fade>
            <p className="eyebrow mb-4 text-gold">Email</p>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${site.email}?subject=Project%20enquiry`}
                  className="display link-line break-all text-[clamp(1.9rem,5.6vw,5rem)]"
                >
                  {site.email}
                </a>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={copy}
              className="eyebrow mt-6 inline-flex items-center gap-3 rounded-full border border-gold/70 px-5 py-3 text-gold transition-colors duration-500 hover:bg-gold hover:text-green"
              aria-live="polite"
            >
              {copied ? "Copied to clipboard ✓" : "Copy email address"}
            </button>
          </div>

          <dl data-fade data-delay="0.1" className="grid gap-6 sm:grid-cols-2 lg:min-w-[26rem] lg:grid-cols-1">
            <div>
              <dt className="eyebrow text-gold">Phone</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="link-line text-xl">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-gold">LinkedIn</dt>
              <dd className="mt-1">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-line text-xl">
                  {site.linkedinLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
