import Image from "next/image";
import SectionHead from "./SectionHead";
import SplitText from "./SplitText";
import { about, expertise } from "@/lib/content";
import type { ImageAsset } from "@/lib/assets";

export function About({ image }: { image: ImageAsset | null }) {
  return (
    <section id="about" data-section data-theme="light" className="bg-cream py-24 sm:py-32 lg:py-44">
      <div className="container-x">
        <SectionHead index="01" label="About" title="About me" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
            <SplitText
              as="p"
              text={about.lead}
              stagger={0.025}
              className="serif-accent text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.12] text-green"
            />
            <div data-fade data-delay="0.1" className="mt-10 flex gap-6 sm:mt-14">
              <span aria-hidden="true" className="mt-2 hidden h-px w-14 shrink-0 bg-gold sm:block" />
              <p className="max-w-xl text-base leading-[1.75] text-ink/80 sm:text-lg">{about.body}</p>
            </div>

            <dl data-fade className="mt-14 grid max-w-xl grid-cols-2 gap-6 border-t border-gold/60 pt-8 sm:mt-20">
              <div>
                <dt className="eyebrow text-goldink">Experience</dt>
                <dd className="display mt-2 text-6xl text-green">10+</dd>
                <dd className="text-sm text-ink/70">years in design &amp; branding</dd>
              </div>
              <div>
                <dt className="eyebrow text-goldink">Focus</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/80">
                  Logo &amp; Brand Identity, Packaging, Marketing Creatives, Video
                </dd>
              </div>
            </dl>
          </div>

          {image ? (
            <div className="lg:col-span-5">
              <div data-clip className="overflow-hidden rounded-[2rem] bg-green p-3 sm:p-4">
                <div className="overflow-hidden rounded-[1.4rem] border border-gold/60">
                  <div data-scale>
                    <Image
                      src={image.src}
                      alt="Manan Dave, full-length portrait"
                      width={image.width}
                      height={image.height}
                      sizes="(min-width:1024px) 40vw, 90vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section
      id="expertise"
      data-section
      data-theme="light"
      data-nav="about"
      className="bg-cream pb-24 sm:pb-32 lg:pb-44"
    >
      <div className="container-x">
        <div className="mb-10 flex items-center gap-5 sm:mb-14">
          <span className="eyebrow text-goldink">02 — Expertise &amp; Services</span>
          <span data-rule className="h-px max-w-40 flex-1 bg-gold" />
        </div>

        <ul className="border-t border-green/20">
          {expertise.map((e, i) => (
            <li
              key={e.key}
              data-fade
              className="group relative border-b border-green/20 transition-colors duration-500 ease-expo hover:bg-ivory"
            >
              <div className="grid items-baseline gap-2 py-6 sm:grid-cols-12 sm:gap-6 sm:py-9">
                <span className="eyebrow text-goldink sm:col-span-1">0{i + 1}</span>
                <span className="display text-[clamp(2.6rem,7vw,6rem)] text-green transition-transform duration-500 ease-expo group-hover:translate-x-3 sm:col-span-5">
                  {e.key}
                </span>
                <div className="sm:col-span-5">
                  <p className="text-lg text-ink">{e.title}</p>
                  {e.note ? <p className="mt-1 text-sm text-ink/65">{e.note}</p> : null}
                </div>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-gold transition-transform duration-500 ease-expo group-hover:translate-x-2 sm:col-span-1 sm:block sm:text-right"
                >
                  →
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
