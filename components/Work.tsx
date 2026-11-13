import SectionHead from "./SectionHead";
import Gallery from "./Gallery";
import type { Category } from "@/lib/assets";

export default function Work({ categories }: { categories: Category[] }) {
  let counter = 0;
  return (
    <section id="work" data-section data-theme="light" className="bg-cream pb-24 sm:pb-32 lg:pb-44">
      <div className="container-x">
        <SectionHead index="03" label="Selected Work" title="Selected work" />

        <div className="space-y-28 sm:space-y-40 lg:space-y-56">
          {categories.map((c, ci) => {
            const start = counter;
            counter += c.projects.length;
            return (
              <div key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-green/20 pb-5 sm:mb-16">
                  <h3
                    id={`cat-${c.id}`}
                    data-fade
                    className="display text-[clamp(2rem,4.6vw,4.2rem)] text-green"
                  >
                    <span className="eyebrow mr-4 align-middle text-goldink">
                      3.{ci + 1}
                    </span>
                    {c.title}
                  </h3>
                  <span data-fade className="eyebrow text-goldink">
                    {String(c.projects.length).padStart(2, "0")} {c.projects.length === 1 ? "project" : "projects"}
                  </span>
                </div>
                <Gallery projects={c.projects} startIndex={start} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
