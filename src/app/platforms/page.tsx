import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { platforms } from "@/lib/platforms";
import { itemListSchema, renderJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = generatePageMetadata({
  title: "Supported Platforms",
  description:
    "FastVideoS supports downloading from YouTube, Twitter/X, Instagram, TikTok, Facebook, Vimeo, Reddit, and SoundCloud. See all supported platforms and features.",
  path: "/platforms",
});

export default function PlatformsPage() {
  const schema = itemListSchema(
    "Supported Platforms",
    platforms.map((p) => ({ name: p.name, url: `/${p.slug}` }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(schema) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={[{ name: "Platforms", href: "/platforms" }]} />

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Supported Platforms
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Download media from 8 of the most popular platforms on the internet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Link
              key={platform.slug}
              href={`/${platform.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${platform.color}15` }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {platform.name}
                </h2>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {platform.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {platform.supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {format}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                Use tool
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
