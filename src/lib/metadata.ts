import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}

const SITE_NAME = "FastVideoS";
const DEFAULT_DESCRIPTION =
  "Download and extract media from YouTube, Twitter, Instagram, TikTok, and more. Ultra-fast, free, no sign-up required.";

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || absoluteUrl("/og-default.png");

  return {
    title,
    description,
    metadataBase: new URL(
      process.env.NODE_ENV === "production"
        ? "https://fastvideos.univoid.tech"
        : (process.env.NEXT_PUBLIC_SITE_URL || "https://fastvideos.univoid.tech")
    ),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: type === "article" ? "article" : "website",
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Free Online Media Downloader`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://fastvideos.univoid.tech"
      : (process.env.NEXT_PUBLIC_SITE_URL || "https://fastvideos.univoid.tech")
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Free Online Media Downloader`,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Online Media Downloader`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "google56f1319c653e0d2e",
  },
};
