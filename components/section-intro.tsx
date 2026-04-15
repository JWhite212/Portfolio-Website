import SectionCounter from "@/components/section-counter";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  className?: string;
  align?: "left" | "center";
  index?: number;
};

export default function SectionIntro({
  eyebrow,
  title,
  body,
  className,
  align = "left",
  index,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}>
      <div className="flex items-center gap-3">
        {index !== undefined && <SectionCounter index={index} />}
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[var(--muted)]">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
        {body}
      </p>
    </div>
  );
}
