import type { MediaInfo, MediaFormat } from "@/types";
import { detectPlatform } from "@/lib/schemas";

interface ExtractorResult {
  success: boolean;
  data?: MediaInfo;
  error?: string;
}

const COBALT_API_URL = process.env.COBALT_API_URL || "https://api.cobalt.tools";
const COBALT_API_KEY = process.env.COBALT_API_KEY || "";

const INVIDIOUS_INSTANCES = [
  "yewtu.be",
  "invidious.flokinet.to",
  "inv.tux.im",
  "vid.puffyan.us",
  "invidious.io",
];

function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function formatDuration(seconds: number): string {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

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

  // --- SPECIAL YOUTUBE EXTRACTOR BYPASS ---
  if (platform === "youtube") {
    const videoId = extractYoutubeId(url);
    if (videoId) {
      for (const instance of INVIDIOUS_INSTANCES) {
        try {
          // Attempt to call Invidious instance (with 5 seconds timeout)
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(
            `https://${instance}/api/v1/videos/${videoId}?local=true`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const formats: MediaFormat[] = [];

            // 1. Add formatStreams (progressive formats with both video + audio)
            if (data.formatStreams && Array.isArray(data.formatStreams)) {
              data.formatStreams.forEach((stream: { url: string; quality?: string; container?: string }) => {
                let streamUrl = stream.url;
                if (streamUrl && streamUrl.startsWith("/")) {
                  streamUrl = `https://${instance}${streamUrl}`;
                }
                formats.push({
                  quality: stream.quality || "360p",
                  format: "MP4",
                  size: "Download",
                  hasAudio: true,
                  url: streamUrl,
                  filename: `${data.title || "video"}.mp4`,
                });
              });
            }

            // 2. Add adaptiveFormats (audio-only formats)
            if (data.adaptiveFormats && Array.isArray(data.adaptiveFormats)) {
              data.adaptiveFormats.forEach((stream: { url: string; type?: string; audioBitrate?: number }) => {
                if (stream.type && stream.type.startsWith("audio/")) {
                  let streamUrl = stream.url;
                  if (streamUrl && streamUrl.startsWith("/")) {
                    streamUrl = `https://${instance}${streamUrl}`;
                  }
                  formats.push({
                    quality: `${stream.audioBitrate || 128}kbps`,
                    format: "MP3",
                    size: "Audio Track",
                    hasAudio: true,
                    url: streamUrl,
                    filename: `${data.title || "audio"}.mp3`,
                  });
                }
              });
            }

            if (formats.length > 0) {
              return {
                success: true,
                data: {
                  url,
                  platform: "youtube",
                  title: data.title || "YouTube Video",
                  thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                  duration: formatDuration(data.lengthSeconds),
                  author: data.author || "YouTube Creator",
                  formats,
                },
              };
            }
          }
        } catch (e) {
          console.warn(`Invidious instance ${instance} failed:`, e);
        }
      }
    }
  }

  // --- GENERAL PLATFORM EXTRACTOR (COBALT FALLBACK) ---
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
