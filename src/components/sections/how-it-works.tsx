"use client";

import { motion } from "framer-motion";
import { ClipboardPaste, ListFilter, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    number: "01",
    title: "Paste the URL",
    description:
      "Copy the link of the video or audio you want to download from any supported platform and paste it into the input field.",
  },
  {
    icon: ListFilter,
    number: "02",
    title: "Choose your format",
    description:
      "Select from available quality options and formats. Pick MP4 for video or MP3 for audio. Choose resolution from 360p to 4K.",
  },
  {
    icon: Download,
    number: "03",
    title: "Download instantly",
    description:
      "Click the download button and save the file directly to your device. No waiting, no pop-ups, no redirects.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="border-y border-border bg-muted/30 py-20 sm:py-28"
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Three steps.{" "}
            <span className="gradient-text">That&apos;s it.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-muted-foreground sm:text-lg"
          >
            No complicated setup. No software to install. Just paste, pick, and download.
          </motion.p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" aria-hidden="true" />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <span className="mb-2 block text-xs font-bold tracking-widest text-primary uppercase">
                  Step {step.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
