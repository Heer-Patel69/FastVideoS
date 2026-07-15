import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  product: [
    { title: "Home", href: "/" },
    { title: "Platforms", href: "/platforms" },
    { title: "Blog", href: "/blog" },
    { title: "FAQ", href: "/faq" },
  ],
  tools: [
    { title: "YouTube Downloader", href: "/tools/youtube-video-downloader" },
    { title: "Twitter Downloader", href: "/tools/twitter-video-downloader" },
    { title: "Instagram Downloader", href: "/tools/instagram-reels-downloader" },
    { title: "TikTok Downloader", href: "/tools/tiktok-video-downloader" },
  ],
  resources: [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    {
      title: "SoundCloud Downloader",
      href: "/tools/soundcloud-downloader",
    },
    { title: "Reddit Downloader", href: "/tools/reddit-video-downloader" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Zap className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">
              Fast<span className="text-primary">VideoS</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {currentYear} FastVideoS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
