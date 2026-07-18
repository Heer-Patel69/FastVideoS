import type { Metadata, Viewport } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { defaultMetadata } from "@/lib/metadata";
import {
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  renderJsonLd,
} from "@/lib/structured-data";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1169163493596327"
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content="ca-pub-1169163493596327" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderJsonLd(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderJsonLd(webSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: renderJsonLd(
              webPageSchema({
                name: "FastVideoS — Free Online Media Downloader",
                description:
                  "Download and extract media from YouTube, Twitter, Instagram, TikTok, and more. Ultra-fast, free, no sign-up required.",
                url: "/",
              })
            ),
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-sans",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
