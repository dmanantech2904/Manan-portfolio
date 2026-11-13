import SplitText from "./SplitText";

export default function SectionHead({
  index,
  label,
  title,
  dark = false,
}: {
  index: string;
  label: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 sm:mb-16 lg:mb-24">
      <div className="mb-6 flex items-center gap-5">
        <span className={`eyebrow ${dark ? "text-gold" : "text-goldink"}`}>
          {index} — {label}
        </span>
        <span data-rule className="h-px flex-1 max-w-40 bg-gold" />
      </div>
      <SplitText
        as="h2"
        text={title}
        className={`display text-[clamp(3.2rem,9vw,9rem)] ${dark ? "text-cream" : "text-green"}`}
      />
    </div>
  );
}
