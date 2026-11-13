import SectionHead from "./SectionHead";
import { education, experience, process, tools } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" data-section data-theme="light" className="bg-cream py-24 sm:py-32 lg:py-44">
      <div className="container-x">
        <SectionHead index="05" label="Experience" title="Experience & process" />

        <div className="grid gap-20 lg:grid-cols-12 lg:gap-10">
          {/* Timeline */}
          <div className="lg:col-span-7">
            <ol className="relative border-l border-gold pl-8 sm:pl-12">
              {experience.map((e) => (
                <li key={e.when + e.what} data-fade className="relative pb-12 last:pb-0 sm:pb-14">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[calc(2rem+7px)] top-2 h-3.5 w-3.5 rounded-full sm:-left-[calc(3rem+7px)] ${
                      e.current ? "bg-gold" : "bg-green"
                    }`}
                  />
                  <p className="eyebrow text-goldink">{e.when}</p>
                  <h3 className="display mt-2 text-[clamp(2rem,4vw,3.4rem)] text-green">{e.what}</h3>
                  {e.where ? <p className="mt-1 text-lg text-ink">{e.where}</p> : null}
                  {"note" in e && e.note ? <p className="serif-accent mt-1 text-xl text-goldink">{e.note}</p> : null}
                </li>
              ))}
            </ol>
          </div>

          {/* Education + tools */}
          <div className="space-y-6 lg:col-span-5">
            <div data-fade className="rounded-[1.4rem] bg-ivory p-8 sm:p-10">
              <p className="eyebrow text-goldink">Education</p>
              <h3 className="display mt-4 text-4xl text-green">{education.degree}</h3>
              <p className="mt-3 text-ink/80">{education.school}</p>
              <p className="eyebrow mt-5 text-goldink">{education.years}</p>
            </div>

            <div data-fade className="rounded-[1.4rem] bg-green p-8 text-cream sm:p-10">
              <p className="eyebrow text-gold">Tools</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-cream/30 px-4 py-2 text-sm transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-green"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mt-28 sm:mt-40">
          <div className="mb-10 flex items-center gap-5 sm:mb-14">
            <span className="eyebrow text-goldink">Creative process &amp; capabilities</span>
            <span data-rule className="h-px max-w-40 flex-1 bg-gold" />
          </div>
          <ol className="grid gap-4 md:grid-cols-5">
            {process.map((p, i) => (
              <li
                key={p}
                data-fade
                data-delay={i * 0.08}
                className={`group flex min-h-[11rem] flex-col justify-between rounded-[1.1rem] p-6 transition-all duration-700 ease-expo hover:-translate-y-2 md:min-h-[15rem] ${
                  i === process.length - 1 ? "bg-green text-cream" : "bg-ivory text-ink hover:bg-white"
                } ${i % 2 === 1 ? "md:mt-10" : ""}`}
              >
                <span className={`display text-5xl ${i === process.length - 1 ? "text-gold" : "text-gold"}`}>
                  0{i + 1}
                </span>
                <span className="text-base font-medium leading-snug">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
