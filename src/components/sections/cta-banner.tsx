"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function CtaBanner() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28" aria-label="Call to action">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-blue-700 p-10 text-center sm:p-16"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to download?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-blue-100 sm:text-lg">
              Start downloading videos and audio from your favorite platforms.
              It&apos;s free, fast, and requires no sign-up.
            </p>
            <button
              onClick={scrollToTop}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl active:scale-[0.98]"
            >
              <ArrowUp className="h-4 w-4" />
              Start Downloading — It&apos;s Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
