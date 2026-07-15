import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FaqSection } from "@/components/sections/faq-section";
import { faqSchema, renderJsonLd } from "@/lib/structured-data";
import type { FAQ } from "@/types";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ — Frequently Asked Questions",
  description:
    "Find answers to common questions about FastVideoS. Learn about supported platforms, video quality, privacy, legality, and troubleshooting.",
  path: "/faq",
});

const allFaqs: FAQ[] = [
  { question: "Is FastVideoS completely free to use?", answer: "Yes, FastVideoS is 100% free to use. There are no hidden fees, no premium tiers, and no subscription plans. We support ourselves through non-intrusive advertising." },
  { question: "Do I need to create an account or sign up?", answer: "No. FastVideoS requires no registration, no email, and no account creation. Simply visit the site, paste your link, and download." },
  { question: "Which platforms does FastVideoS support?", answer: "We currently support YouTube, Twitter (X), Instagram, TikTok, Facebook, Vimeo, Reddit, and SoundCloud. More platforms are being added." },
  { question: "Is it legal to download videos from the internet?", answer: "The legality depends on the content and your intended use. Downloading your own content or content shared for download is generally permitted. Always respect creators' rights and platform terms." },
  { question: "What video quality options are available?", answer: "Quality ranges from 360p to 4K (2160p) depending on the source. Audio extraction supports MP3 up to 320kbps, M4A, and WAV formats." },
  { question: "Does FastVideoS store my downloads or personal data?", answer: "No. We don't store downloaded files, don't track download history, and don't sell or share any user data. Files are processed in real-time." },
  { question: "Can I use FastVideoS on my phone?", answer: "Yes. FastVideoS works on all modern mobile browsers including Safari on iOS and Chrome on Android. No app installation needed." },
  { question: "Why did my download fail?", answer: "Downloads can fail if the content is private, the URL is incorrect, or the platform changed their delivery structure. Try refreshing and pasting the URL again." },
  { question: "Can I download private videos?", answer: "No. FastVideoS can only access publicly available content. Private or restricted content cannot be downloaded." },
  { question: "Can I download entire playlists?", answer: "Currently, FastVideoS supports individual video downloads. Playlist support is planned for a future update." },
  { question: "What browsers are supported?", answer: "FastVideoS works with all modern browsers: Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for best performance." },
  { question: "How do I download audio only?", answer: "After pasting a URL, look for MP3 or M4A format options in the results. Select the audio format and click download." },
  { question: "Is FastVideoS safe to use?", answer: "Yes. FastVideoS uses HTTPS encryption, doesn't require any software installation, and doesn't store user data. All processing happens in your browser." },
  { question: "Do you have an API for developers?", answer: "Not yet. A public API for developers is on our roadmap. Follow our blog for updates on API availability." },
  { question: "How do I report a bug or request a feature?", answer: "Visit our contact page to submit bug reports, feature requests, or general feedback. We read every submission." },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(faqSchema(allFaqs)) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />
        <FaqSection
          faqs={allFaqs}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about using FastVideoS."
        />
      </div>
    </>
  );
}
