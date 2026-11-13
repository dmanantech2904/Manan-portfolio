import Image from "next/image";
import SplitText from "./SplitText";
import ScrollCue from "./ScrollCue";
import { site } from "@/lib/content";
import type { ImageAsset } from "@/lib/assets";

export default function Hero({ portrait }: { portrait: ImageAsset | null }) {
  return (
    <section
      id="top"
      data-section
      data-theme="dark"
      data-nav="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-green text-cream"
    >
      {/* gold edge, echoing the cover of the original portfolio */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-gold sm:w-3" />

      <div className="container-x relative flex flex-1 flex-col pb-8 pt-28 sm:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-8">
            <p data-intro data-order="0" className="eyebrow mb-6 text-gold sm:mb-8">
              Portfolio — 2026
            </p>

            <h1 className="display text-[clamp(5.4rem,24vw,22rem)] lg:text-[clamp(9rem,19vw,22rem)]">
              <SplitText text="Manan Dave" trigger="intro" block stagger={0.14} delay={0.15} />
            </h1>

            <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:gap-12">
              <p
                data-intro
                data-order="2"
                className="serif-accent text-[clamp(1.7rem,4.2vw,3rem)] leading-[1.05] text-cream"
              >
                Graphic Designer
                <span className="text-gold"> &amp; </span>
                Video Editor
              </p>
              <p data-intro data-order="3" className="max-w-[22rem] text-sm leading-relaxed text-cream/75">
                {site.focus.replaceAll(" · ", " / ")}
              </p>
            </div>

            <div data-intro data-order="4" className="mt-6 h-px w-28 bg-gold sm:mt-10" />
          </div>

          {portrait ? (
            <div
              data-intro
              data-order="1"
              className="relative mx-auto w-[min(52vw,230px)] lg:col-span-4 lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[420px]"
            >
              <div className="overflow-hidden rounded-[999px] border border-gold/70 p-[6px]">
                <div className="aspect-[3/4] overflow-hidden rounded-[999px]">
                  <Image
                    src={portrait.src}
                    alt="Portrait of Manan Dave"
                    width={portrait.width}
                    height={portrait.height}
                    priority
                    sizes="(min-width:1024px) 420px, 62vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex items-end justify-between">
          <ScrollCue />
          <p data-intro data-order="5" className="eyebrow hidden text-cream/60 sm:block">
            Logo · Brand · Packaging · Video
          </p>
        </div>
      </div>
    </section>
  );
}
