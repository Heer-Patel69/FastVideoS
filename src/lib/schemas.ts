import { z } from "zod";

const SUPPORTED_DOMAINS = [
  "youtube.com",
  "youtu.be",
  "twitter.com",
  "x.com",
  "instagram.com",
  "tiktok.com",
  "facebook.com",
  "fb.watch",
  "vimeo.com",
  "reddit.com",
  "soundcloud.com",
] as const;

export const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .refine(
    (url) => {
      try {
        const hostname = new URL(url).hostname.replace("www.", "");
        return SUPPORTED_DOMAINS.some(
          (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
        );
      } catch {
        return false;
      }
    },
    {
      message:
        "This platform is not supported yet. Try YouTube, Twitter, Instagram, TikTok, Facebook, Vimeo, Reddit, or SoundCloud.",
    }
  );

export const extractRequestSchema = z.object({
  url: urlSchema,
});

export const contactFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be under 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ExtractRequestInput = z.infer<typeof extractRequestSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function detectPlatform(url: string): string | null {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be"))
      return "youtube";
    if (hostname.includes("twitter.com") || hostname.includes("x.com"))
      return "twitter";
    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("tiktok.com")) return "tiktok";
    if (hostname.includes("facebook.com") || hostname.includes("fb.watch"))
      return "facebook";
    if (hostname.includes("vimeo.com")) return "vimeo";
    if (hostname.includes("reddit.com")) return "reddit";
    if (hostname.includes("soundcloud.com")) return "soundcloud";
    return null;
  } catch {
    return null;
  }
}
