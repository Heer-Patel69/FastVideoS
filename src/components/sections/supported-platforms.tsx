"use client";

import { motion } from "framer-motion";

const platformLogos = [
  { name: "YouTube", color: "#FF0000" },
  { name: "Twitter / X", color: "#1DA1F2" },
  { name: "Instagram", color: "#E4405F" },
  { name: "TikTok", color: "#010101" },
  { name: "Facebook", color: "#1877F2" },
  { name: "Vimeo", color: "#1AB7EA" },
  { name: "Reddit", color: "#FF4500" },
  { name: "SoundCloud", color: "#FF5500" },
];

function PlatformPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
      <div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function SupportedPlatforms() {
  const doubled = [...platformLogos, ...platformLogos];

  return (
    <section className="py-16 sm:py-20" aria-label="Supported platforms">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-medium tracking-wider text-muted-foreground uppercase"
        >
          Works with your favorite platforms
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex animate-marquee gap-4">
          {doubled.map((platform, i) => (
            <PlatformPill key={`${platform.name}-${i}`} {...platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
