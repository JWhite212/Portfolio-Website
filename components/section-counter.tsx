import { cn } from "@/lib/utils";

interface SectionCounterProps {
  index: number;
  className?: string;
}

export default function SectionCounter({
  index,
  className,
}: SectionCounterProps) {
  return (
    <span
      className={cn(
        "inline-block border-brutal border-[var(--line-strong)] px-2 py-0.5 font-mono text-xs tracking-widest text-[var(--accent)]",
        className,
      )}>
      [{String(index).padStart(2, "0")}]
    </span>
  );
}
