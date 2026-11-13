"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";
import type { VideoItem } from "@/lib/assets";

function VideoCard({ v, index, tall }: { v: VideoItem; index: number; tall: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const playable = Boolean(v.src);

  const start = () => {
    if (!playable) return;
    setPlaying(true);
    // video mounts on next paint
    requestAnimationFrame(() => ref.current?.play().catch(() => undefined));
  };

  return (
    <article className={tall ? "lg:col-span-5" : "lg:col-span-7"}>
      <div
        data-clip
        className={`relative overflow-hidden rounded-[1.2rem] bg-green-deep ${
          tall ? "mx-auto aspect-[9/16] max-h-[78svh]" : "aspect-video"
        }`}
      >
        {playing && v.src ? (
          <video
            ref={ref}
            src={v.src}
            poster={v.poster?.src}
            controls
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full bg-black object-contain"
            aria-label={`${v.title} — ${v.subtitle}`}
          />
        ) : (
          <button
            type="button"
            onClick={start}
            disabled={!playable}
            data-cursor={playable ? "Play" : undefined}
            aria-label={playable ? `Play video: ${v.title}` : `${v.title} (preview image)`}
            className="group absolute inset-0 block h-full w-full disabled:cursor-default"
          >
            {v.poster ? (
              <Image
                src={v.poster.src}
                alt={`${v.title} — ${v.subtitle}, video thumbnail`}
                fill
                sizes="(min-width:1024px) 55vw, 92vw"
                className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]"
              />
            ) : null}
            <span className="absolute inset-0 bg-green/10 transition-colors duration-500 group-hover:bg-green/0" />
            {playable ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <Magnetic strength={0.35}>
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/80 bg-green/50 text-cream backdrop-blur-sm transition-all duration-500 ease-expo group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-green sm:h-24 sm:w-24">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                </Magnetic>
              </span>
            ) : null}
          </button>
        )}
      </div>

      <div data-fade className="mt-6 flex items-baseline gap-5">
        <span className="eyebrow text-gold">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="display text-3xl text-cream sm:text-5xl">{v.title}</h3>
          <p className="mt-2 text-sm text-cream/70">
            {v.subtitle} · <span className="text-gold">{v.kind}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function VideoSection({ videos }: { videos: VideoItem[] }) {
  return (
    <section id="video" data-section data-theme="dark" className="bg-char py-24 text-cream sm:py-32 lg:py-44">
      <div className="container-x">
        <SectionHead index="04" label="Motion" title="UGC & video work" dark />
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-28">
          {videos.map((v, i) => (
            <VideoCard
              key={v.slug}
              v={v}
              index={i}
              tall={Boolean(v.poster && v.poster.height > v.poster.width)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
