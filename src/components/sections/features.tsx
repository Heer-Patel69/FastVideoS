"use client";

import { motion, type Variants } from "framer-motion";
import {
  Zap,
  UserX,
  Globe,
  MonitorSmartphone,
  Shield,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Extract media information in under 2 seconds. Our optimized infrastructure delivers results faster than any alternative.",
  },
  {
    icon: UserX,
    title: "No Sign-Up Required",
    description:
      "Start using FastVideoS immediately. No account creation, no email verification, no passwords to remember.",
  },
  {
    icon: Globe,
    title: "8 Platforms Supported",
    description:
      "YouTube, Twitter/X, Instagram, TikTok, Facebook, Vimeo, Reddit, and SoundCloud — all in one place.",
  },
  {
    icon: Sparkles,
    title: "HD & 4K Quality",
    description:
      "Access the highest quality available from each platform. Up to 4K resolution for video and 320kbps for audio.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "We don't store your downloads, track your history, or share your data. Your activity stays completely private.",
  },
  {
    icon: MonitorSmartphone,
    title: "Works Everywhere",
    description:
      "Fully responsive design works seamlessly on iPhone, Android, tablet, laptop, and desktop — any modern browser.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Features() {
  return (
    <section className="py-20 sm:py-28" id="features" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need,{" "}
            <span className="gradient-text">nothing you don&apos;t</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-muted-foreground sm:text-lg"
          >
            A focused tool that does one thing exceptionally well.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
