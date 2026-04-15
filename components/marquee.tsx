import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: string;
}

export default function Marquee({
  children,
  className,
  speed = "30s",
}: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden whitespace-nowrap border-y-brutal border-[var(--line-strong)]",
        className,
      )}>
      <div
        className="inline-flex animate-marquee-left motion-reduce:animate-none"
        style={{ animationDuration: speed }}>
        <div className="flex shrink-0 items-center gap-8 px-4">{children}</div>
        <div className="flex shrink-0 items-center gap-8 px-4 motion-reduce:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
