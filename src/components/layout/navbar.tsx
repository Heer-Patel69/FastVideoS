"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Platforms", href: "/platforms" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
  { title: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="glass border-b border-border/50">
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="FastVideoS home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Fast<span className="text-primary">VideoS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>

            {/* Tools Dropdown Container */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer focus:outline-none"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
              >
                Tools
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isToolsOpen && "rotate-180 text-foreground"
                  )}
                />
              </button>

              <AnimatePresence>
                {isToolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] rounded-2xl border border-border/80 bg-card/95 p-6 shadow-2xl backdrop-blur-md glass grid grid-cols-3 gap-6"
                  >
                    {/* Column 1: YouTube */}
                    <div>
                      <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                        YouTube
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/youtube-video-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Video Downloader
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/youtube-shorts-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Shorts Downloader
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/youtube-audio-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Audio Downloader
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/youtube-to-mp3-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            YouTube to MP3
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: Instagram */}
                    <div>
                      <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                        Instagram
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/instagram-reels-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Reels Downloader
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/instagram-story-saver"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Story Saver
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/instagram-highlights-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Highlights Saver
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/instagram-profile-picture-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Profile DP Saver
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/instagram-profile-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Profile Downloader
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: Others */}
                    <div>
                      <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                        Other tools
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/tiktok-video-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            TikTok Video
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/twitter-video-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Twitter/X Video
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/reddit-video-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            Reddit Video
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/soundcloud-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            SoundCloud Downloader
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/soundcloud-mp3-downloader"
                            className="block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                          >
                            SoundCloud to MP3
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/platforms"
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Platforms
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/blog"
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/faq"
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/about"
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="glass overflow-hidden border-b border-border/50 md:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Home
              </Link>

              {/* Mobile Tools Collapsible */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer focus:outline-none"
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isMobileToolsOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isMobileToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1.5 overflow-hidden"
                    >
                      <div className="py-1">
                        <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider pl-3 py-1">
                          YouTube
                        </span>
                        <Link
                          href="/youtube-video-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Video Downloader
                        </Link>
                        <Link
                          href="/youtube-shorts-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Shorts Downloader
                        </Link>
                        <Link
                          href="/youtube-audio-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Audio Downloader
                        </Link>
                        <Link
                          href="/youtube-to-mp3-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          YouTube to MP3
                        </Link>
                      </div>

                      <div className="py-1">
                        <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider pl-3 py-1">
                          Instagram
                        </span>
                        <Link
                          href="/instagram-reels-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Reels Downloader
                        </Link>
                        <Link
                          href="/instagram-story-saver"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Story Saver
                        </Link>
                        <Link
                          href="/instagram-highlights-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Highlights Saver
                        </Link>
                        <Link
                          href="/instagram-profile-picture-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Profile DP Saver
                        </Link>
                        <Link
                          href="/instagram-profile-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Profile Downloader
                        </Link>
                      </div>

                      <div className="py-1">
                        <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider pl-3 py-1">
                          Other tools
                        </span>
                        <Link
                          href="/tiktok-video-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          TikTok Video
                        </Link>
                        <Link
                          href="/twitter-video-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Twitter/X Video
                        </Link>
                        <Link
                          href="/reddit-video-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Reddit Video
                        </Link>
                        <Link
                          href="/soundcloud-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          SoundCloud Downloader
                        </Link>
                        <Link
                          href="/soundcloud-mp3-downloader"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          SoundCloud to MP3
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainNavItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
