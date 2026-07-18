import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { SupportedPlatforms } from "@/components/sections/supported-platforms";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FaqSection } from "@/components/sections/faq-section";
import { SeoContent } from "@/components/sections/seo-content";
import { RelatedTools } from "@/components/sections/related-tools";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AdContainer } from "@/components/sections/ad-container";
import {
  softwareApplicationSchema,
  faqSchema,
  renderJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = generatePageMetadata({
  title: "FastVideoS — Free Online Media Downloader",
  description:
    "Download and extract media from YouTube, Twitter, Instagram, TikTok, and more. Ultra-fast, free, no sign-up required.",
  path: "/",
});

const homeFaqs = [
  {
    question: "Is FastVideoS completely free to use?",
    answer: "Yes, FastVideoS is 100% free with no hidden fees or premium tiers.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. FastVideoS requires no registration or account creation.",
  },
  {
    question: "Which platforms does FastVideoS support?",
    answer:
      "YouTube, Twitter (X), Instagram, TikTok, Facebook, Vimeo, Reddit, and SoundCloud.",
  },
  {
    question: "What video quality options are available?",
    answer:
      "Quality options range from 360p to 4K (2160p), depending on the source platform.",
  },
  {
    question: "Does FastVideoS store my personal data?",
    answer:
      "No. We don't track download history, require cookies for core functionality, or sell user data.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(softwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(faqSchema(homeFaqs)),
        }}
      />

      <Hero />
      <SupportedPlatforms />
      <AdContainer size="leaderboard" className="my-4" />
      <AdContainer size="mobile-banner" className="my-4" />
      <Features />
      <HowItWorks />
      <AdContainer size="rectangle" className="my-8" />
      <FaqSection />
      <SeoContent />
      <RelatedTools />
      <CtaBanner />
    </>
  );
}
