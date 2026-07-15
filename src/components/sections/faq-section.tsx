"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

const homeFaqs: FAQ[] = [
  {
    question: "Is FastVideoS completely free to use?",
    answer:
      "Yes, FastVideoS is 100% free to use. There are no hidden fees, no premium tiers, and no subscription plans. We support ourselves through non-intrusive advertising. You get full access to all features and all supported platforms at no cost.",
  },
  {
    question: "Do I need to create an account or sign up?",
    answer:
      "No. FastVideoS requires no registration, no email, and no account creation. Simply visit the site, paste your link, and download. Your privacy matters — we don't need your personal information to provide this service.",
  },
  {
    question: "Which platforms does FastVideoS support?",
    answer:
      "FastVideoS currently supports 8 major platforms: YouTube, Twitter (X), Instagram, TikTok, Facebook, Vimeo, Reddit, and SoundCloud. We are continuously working on adding support for more platforms.",
  },
  {
    question: "Is it legal to download videos from the internet?",
    answer:
      "The legality depends on the content and your intended use. Downloading your own content or content explicitly shared for download is generally permitted. Downloading copyrighted material without permission for redistribution or commercial use may violate copyright laws. FastVideoS is designed for personal use with content you have the right to download. Always respect creators' rights and platform terms of service.",
  },
  {
    question: "What video quality options are available?",
    answer:
      "Available quality depends on the source platform and the original upload quality. FastVideoS supports downloads up to 4K (2160p) for platforms like YouTube and Vimeo, Full HD (1080p) for most platforms, and standard qualities including 720p, 480p, and 360p. Audio extraction is available in MP3 format up to 320kbps.",
  },
  {
    question: "Does FastVideoS store my downloads or personal data?",
    answer:
      "No. FastVideoS does not store any downloaded files on our servers. We don't track your download history, don't require cookies for core functionality, and don't sell or share any user data. Files are processed in real-time and delivered directly to your device.",
  },
  {
    question: "Can I use FastVideoS on my phone or tablet?",
    answer:
      "Yes. FastVideoS is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. No app installation is needed — just visit the website, paste your link, and download directly to your device.",
  },
  {
    question: "Why did my download fail?",
    answer:
      "Downloads can fail for several reasons: the content may be private or restricted, the URL may be incorrect or expired, or the platform may have changed their content delivery structure. Try refreshing the page and pasting the URL again. If the issue persists, the specific content may not be accessible for download.",
  },
];

interface FaqItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ faq, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-medium text-foreground sm:text-base">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FaqSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
}

export function FaqSection({
  faqs = homeFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about FastVideoS.",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28" id="faq" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-2xl border border-border bg-card p-6"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
