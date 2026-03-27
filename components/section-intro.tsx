import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  className?: string;
  align?: "left" | "center";
};

export default function SectionIntro({
  eyebrow,
  title,
  body,
  className,
  align = "left",
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}>
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-[var(--muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
        {body}
      </p>
    </div>
  );
}
