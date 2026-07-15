import type { MediaInfo, MediaFormat } from "@/types";
import { detectPlatform } from "@/lib/schemas";

interface ExtractorResult {
  success: boolean;
  data?: MediaInfo;
  error?: string;
}

const COBALT_API_URL = process.env.COBALT_API_URL || "https://api.cobalt.tools";
const COBALT_API_KEY = process.env.COBALT_API_KEY || "";

async function callCobalt(url: string, downloadMode: "auto" | "audio") {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (COBALT_API_KEY) {
    headers["Authorization"] = `Bearer ${COBALT_API_KEY}`;
  }

  const response = await fetch(COBALT_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url,
      downloadMode,
      videoQuality: "1080",
      filenameStyle: "classic",
    }),
  });

  const responseText = await response.text();
  let responseData;
  try {
    responseData = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Invalid response from download service (HTTP ${response.status})`
    );
  }

  if (!response.ok || responseData.status === "error") {
    throw new Error(responseData.text || responseData.error?.code || `Error HTTP ${response.status}`);
  }

  return responseData;
}

const platformAuthors: Record<string, string> = {
  youtube: "YouTube Creator",
  twitter: "X/Twitter User",
  instagram: "Instagram Creator",
  tiktok: "TikTok Creator",
  facebook: "Facebook Creator",
  vimeo: "Vimeo Creator",
  reddit: "Reddit Poster",
  soundcloud: "SoundCloud Artist",
};

export async function extractMedia(url: string): Promise<ExtractorResult> {
  const platform = detectPlatform(url);

  if (!platform) {
    return {
      success: false,
      error: "Unsupported platform. Please use a URL from a supported platform.",
    };
  }

  try {
    const formats: MediaFormat[] = [];
    let title = `${platform.charAt(0).toUpperCase() + platform.slice(1)} Media`;
    const thumbnail = `https://placehold.co/1280x720/1a1a2e/3b82f6?text=${encodeURIComponent(platform.charAt(0).toUpperCase() + platform.slice(1))}`;

    if (platform === "soundcloud") {
      // SoundCloud is audio only
      const audioResult = await callCobalt(url, "audio");
      if (audioResult.status === "tunnel" || audioResult.status === "redirect") {
        formats.push({
          quality: "High Quality",
          format: "MP3",
          size: "Audio Track",
          hasAudio: true,
          url: audioResult.url,
          filename: audioResult.filename || "audio.mp3",
        });
        if (audioResult.filename) title = audioResult.filename;
      }
    } else {
      // Other platforms: fetch video and audio in parallel
      const [videoResult, audioResult] = await Promise.allSettled([
        callCobalt(url, "auto"),
        callCobalt(url, "audio"),
      ]);

      let hasMedia = false;

      // Handle video result
      if (videoResult.status === "fulfilled") {
        const val = videoResult.value;
        if (val.status === "tunnel" || val.status === "redirect") {
          formats.push({
            quality: "HD Video",
            format: "MP4",
            size: "Download",
            hasAudio: true,
            url: val.url,
            filename: val.filename || "video.mp4",
          });
          if (val.filename) title = val.filename;
          hasMedia = true;
        } else if (val.status === "picker") {
          // Handle carousel posts (like TikTok/Instagram image carousels)
          val.picker.forEach((item: { url: string; type: string; filename?: string }, idx: number) => {
            formats.push({
              quality: `Item ${idx + 1} (${item.type})`,
              format: item.type === "photo" ? "JPG" : "MP4",
              size: "Download",
              hasAudio: item.type !== "photo",
              url: item.url,
              filename: item.filename || `item-${idx + 1}.${item.type === "photo" ? "jpg" : "mp4"}`,
            });
          });
          hasMedia = true;
        }
      }

      // Handle audio result
      if (audioResult.status === "fulfilled") {
        const val = audioResult.value;
        if (val.status === "tunnel" || val.status === "redirect") {
          formats.push({
            quality: "Audio Only",
            format: "MP3",
            size: "Audio Track",
            hasAudio: true,
            url: val.url,
            filename: val.filename || "audio.mp3",
          });
          hasMedia = true;
        }
      }

      if (!hasMedia) {
        // If both failed, throw the video error
        const errorMsg =
          videoResult.status === "rejected"
            ? videoResult.reason.message
            : "No downloadable media formats could be extracted.";
        throw new Error(errorMsg);
      }
    }

    const mediaInfo: MediaInfo = {
      url,
      platform,
      title,
      thumbnail,
      duration: platform === "soundcloud" ? "Audio" : "Video",
      author: platformAuthors[platform] || "Creator",
      formats,
    };

    return {
      success: true,
      data: mediaInfo,
    };
  } catch (error) {
    console.error("Extraction error:", error);
    
    // Provide a helpful error warning about Turnstile/CF blocks on public instance
    const errorMessage = error instanceof Error ? error.message : "Failed to communicate with media extractor service.";
    let friendlyError = errorMessage;
    if (COBALT_API_URL === "https://api.cobalt.tools") {
      friendlyError += " Note: The public instance (api.cobalt.tools) might be rate-limited or blocked by bot protection. Please configure a self-hosted instance using the COBALT_API_URL environment variable.";
    }

    return {
      success: false,
      error: friendlyError,
    };
  }
}
