import { cn } from "@/lib/utils";

type AdSize = "leaderboard" | "rectangle" | "mobile-banner";

interface AdContainerProps {
  size: AdSize;
  className?: string;
}

const adDimensions: Record<AdSize, { width: string; height: string; label: string }> = {
  leaderboard: { width: "728px", height: "90px", label: "728×90 Leaderboard" },
  rectangle: { width: "300px", height: "250px", label: "300×250 Rectangle" },
  "mobile-banner": { width: "320px", height: "50px", label: "320×50 Mobile Banner" },
};

export function AdContainer({ size, className }: AdContainerProps) {
  const dimensions = adDimensions[size];

  return (
    <aside
      className={cn(
        "mx-auto flex items-center justify-center",
        size === "leaderboard" && "hidden md:flex",
        size === "mobile-banner" && "md:hidden",
        className
      )}
      aria-label="Advertisement"
      role="complementary"
    >
      <div
        className="flex items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20 text-xs text-muted-foreground/40"
        style={{
          width: dimensions.width,
          maxWidth: "100%",
          height: dimensions.height,
        }}
      >
        {/* Ad network script injection point */}
        <span className="select-none">{dimensions.label}</span>
      </div>
    </aside>
  );
}
