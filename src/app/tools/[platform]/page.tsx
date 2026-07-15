import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UrlPasteCard } from "@/components/sections/url-paste-card";
import { FaqSection } from "@/components/sections/faq-section";
import { AdContainer } from "@/components/sections/ad-container";
import { platforms, getPlatformBySlug, getAllPlatformSlugs } from "@/lib/platforms";
import {
  softwareApplicationSchema,
  faqSchema,
  howToSchema,
  renderJsonLd,
} from "@/lib/structured-data";

interface ToolPageProps {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  return getAllPlatformSlugs().map((slug) => ({ platform: slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    return { title: "Tool Not Found" };
  }

  const title = `Free ${platform.name} Downloader — Download ${platform.name} Videos Online`;

  return generatePageMetadata({
    title,
    description: platform.longDescription,
    path: `/tools/${slug}`,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const otherPlatforms = platforms.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(softwareApplicationSchema(platform.name)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(faqSchema(platform.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            howToSchema(
              `How to Download ${platform.name} Videos`,
              `Step-by-step guide to download ${platform.name} videos using FastVideoS.`,
              platform.steps
            )
          ),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Tools", href: "/platforms" },
            { name: `${platform.name} Downloader`, href: `/tools/${slug}` },
          ]}
        />

        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${platform.color}15` }}
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: platform.color }}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Free {platform.name} Downloader
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {platform.longDescription}
          </p>
        </div>

        {/* Paste card */}
        <div className="mt-10">
          <UrlPasteCard />
        </div>

        <AdContainer size="leaderboard" className="mt-10" />
        <AdContainer size="mobile-banner" className="mt-6" />

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            {platform.name} Download Features
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platform.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div
                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            How to Download {platform.name} Videos
          </h2>
          <div className="mt-8 space-y-6">
            {platform.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported formats */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Supported Formats
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {platform.supportedFormats.map((format) => (
              <span
                key={format}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <AdContainer size="rectangle" className="mt-12" />

        {/* FAQ */}
        <FaqSection
          faqs={platform.faqs}
          title={`${platform.name} Downloader FAQ`}
          subtitle={`Common questions about downloading from ${platform.name}.`}
        />

        {/* Related */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Other Downloaders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherPlatforms.map((p) => (
              <a
                key={p.slug}
                href={`/tools/${p.slug}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${p.color}15` }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
