import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "About FastVideoS",
  description:
    "Learn about FastVideoS — the ultra-fast, free online media downloader supporting YouTube, Twitter, Instagram, TikTok, and more. Our mission and values.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About FastVideoS
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          FastVideoS was born from a simple frustration: downloading a video from the internet
          should not require installing sketchy desktop software, signing up for yet another
          account, or navigating pages full of misleading download buttons and pop-up ads.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Our Mission</h2>
        <p>
          We build the fastest, cleanest, most straightforward media download tool on the web.
          No sign-ups, no tracking, no nonsense. Just paste a link, choose your format, and
          download. That&apos;s the entire product.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">What We Believe</h2>
        <ul className="ml-4 list-disc space-y-2 marker:text-primary">
          <li>
            <strong className="text-foreground">Speed is a feature.</strong> Every millisecond
            of loading time erodes trust. Our infrastructure is optimized for sub-second response
            times.
          </li>
          <li>
            <strong className="text-foreground">Privacy is non-negotiable.</strong> We don&apos;t
            collect personal data, don&apos;t require accounts, and don&apos;t track download
            history. Your activity is your business.
          </li>
          <li>
            <strong className="text-foreground">Free means free.</strong> No hidden paywalls,
            no &ldquo;premium&rdquo; upsells, no feature gates. Every tool works for every user.
          </li>
          <li>
            <strong className="text-foreground">Respect for creators.</strong> We encourage
            users to download only content they own or have permission to use. Supporting creators
            matters.
          </li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Technology</h2>
        <p>
          FastVideoS is built with Next.js and deployed on edge infrastructure for global
          performance. Our extraction engine processes requests in real-time without storing
          files on intermediate servers. The entire system is designed for reliability, speed,
          and privacy.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Supported Platforms</h2>
        <p>
          We currently support YouTube, Twitter (X), Instagram, TikTok, Facebook, Vimeo, Reddit,
          and SoundCloud. Our engineering team is continuously working to add support for
          additional platforms based on user demand.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">Contact</h2>
        <p>
          Have feedback, a bug report, or a platform request? We&apos;d love to hear from you.
          Visit our <Link href="/contact" className="text-primary hover:underline">contact page</Link> to
          get in touch.
        </p>
      </div>
    </div>
  );
}
