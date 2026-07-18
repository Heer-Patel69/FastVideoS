import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  youtube: [
    { title: "YouTube Downloader", href: "/youtube-video-downloader" },
    { title: "YouTube Shorts", href: "/youtube-shorts-downloader" },
    { title: "YouTube Audio", href: "/youtube-audio-downloader" },
    { title: "YouTube to MP3", href: "/youtube-to-mp3-downloader" },
  ],
  instagram: [
    { title: "Instagram Reels", href: "/instagram-reels-downloader" },
    { title: "Instagram Story", href: "/instagram-story-saver" },
    { title: "Instagram Highlights", href: "/instagram-highlights-downloader" },
    { title: "Instagram Profile Picture", href: "/instagram-profile-picture-downloader" },
    { title: "Instagram Profile", href: "/instagram-profile-downloader" },
  ],
  other: [
    { title: "TikTok Downloader", href: "/tiktok-video-downloader" },
    { title: "Twitter/X Downloader", href: "/twitter-video-downloader" },
    { title: "Reddit Downloader", href: "/reddit-video-downloader" },
    { title: "SoundCloud Downloader", href: "/soundcloud-downloader" },
    { title: "SoundCloud to MP3", href: "/soundcloud-mp3-downloader" },
    { title: "Facebook Downloader", href: "/facebook-video-downloader" },
    { title: "Vimeo Downloader", href: "/vimeo-video-downloader" },
  ],
  company: [
    { title: "Home", href: "/" },
    { title: "All Platforms", href: "/platforms" },
    { title: "Blog Guides", href: "/blog" },
    { title: "FAQ Help", href: "/faq" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
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
          {/* YouTube Downloaders */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              YouTube Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.youtube.map((link) => (
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

          {/* Instagram Downloaders */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Instagram Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.instagram.map((link) => (
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

          {/* Other Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Other Platforms
            </h3>
            <ul className="space-y-3">
              {footerLinks.other.map((link) => (
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

          {/* Company & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
            <Image
              src="/logo.png"
              alt="FastVideoS Logo"
              width={24}
              height={24}
              className="rounded-md object-contain"
            />
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
