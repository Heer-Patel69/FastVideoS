import type { MediaInfo, MediaFormat } from "@/types";
import { detectPlatform } from "@/lib/schemas";

interface ExtractorResult {
  success: boolean;
  data?: MediaInfo;
  error?: string;
}

const COBALT_API_URL = process.env.COBALT_API_URL || "https://api.cobalt.tools";
const COBALT_API_KEY = process.env.COBALT_API_KEY || "";

function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function extractTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}

function formatDuration(seconds: number): string {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface InvidiousInstanceMeta {
  api: boolean;
  type: string;
  uptime?: number;
}

async function getHealthyInvidiousInstances(): Promise<string[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch("https://api.invidious.io/instances.json?sort_by=type,health", {
      signal: controller.signal,
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const instances = data
          .filter((pair: [string, InvidiousInstanceMeta]) => {
            const meta = pair[1];
            return meta && meta.api === true && meta.type === "https";
          })
          .map((pair: [string, InvidiousInstanceMeta]) => {
            try {
              return new URL(pair[0]).hostname;
            } catch {
              return "";
            }
          })
          .filter((hostname: string) => hostname !== "")
          .slice(0, 10); // Use top 10 healthy instances

        if (instances.length > 0) {
          return instances;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch healthy Invidious instances:", error);
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback to hardcoded list if API call fails
  return [
    "yewtu.be",
    "invidious.flokinet.to",
    "inv.tux.im",
    "vid.puffyan.us",
    "invidious.io",
  ];
}

const COBALT_INSTANCES = [
  "https://api.cobalt.tools",
  "https://co.wuk.sh",
  "https://cobalt.kwi.cat",
  "https://cobalt.q1.is",
  "https://cobalt-api.v0.pw",
];

async function callCobaltInstance(instanceUrl: string, url: string, downloadMode: "auto" | "audio") {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (COBALT_API_KEY && instanceUrl === COBALT_API_URL) {
    headers["Authorization"] = `Bearer ${COBALT_API_KEY}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout per instance

  try {
    const response = await fetch(instanceUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        url,
        downloadMode,
        videoQuality: "1080",
        filenameStyle: "classic",
      }),
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeoutId);
  }
}

async function callCobalt(url: string, downloadMode: "auto" | "audio") {
  // If the user configured a private custom self-hosted instance, use it exclusively
  if (process.env.COBALT_API_URL && process.env.COBALT_API_URL !== "https://api.cobalt.tools") {
    return callCobaltInstance(process.env.COBALT_API_URL, url, downloadMode);
  }

  // Rotate through the public cluster
  let lastError = new Error("Failed to communicate with download service.");
  for (const instance of COBALT_INSTANCES) {
    try {
      return await callCobaltInstance(instance, url, downloadMode);
    } catch (e) {
      console.warn(`Cobalt instance ${instance} failed:`, e);
      lastError = e instanceof Error ? e : new Error(String(e));
      
      const errorMsg = lastError.message;
      if (
        errorMsg.includes("error.api.invalid_url") || 
        errorMsg.includes("error.api.url_invalid") ||
        errorMsg.includes("400")
      ) {
        throw lastError;
      }
    }
  }
  throw lastError;
}

// Tokenless metadata fetcher for Instagram, TikTok, and Twitter/X
async function fetchMediaMetadata(
  url: string,
  platform: string
): Promise<{ title?: string; author?: string; thumbnail?: string } | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

  try {
    if (platform === "instagram") {
      const shortcodeMatch = url.match(/(?:\/p\/|\/reel\/|\/reels\/|\/tv\/)([A-Za-z0-9_-]+)/);
      const shortcode = shortcodeMatch ? shortcodeMatch[1] : null;
      if (shortcode) {
        return {
          title: `Instagram Post (${shortcode})`,
          author: "Instagram Creator",
        };
      }
      return null;
    }

    if (platform === "tiktok") {
      // Fetch TikTok oEmbed API for Title, Author, and Thumbnail
      const response = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
        { signal: controller.signal }
      );
      if (response.ok) {
        const oembedData = await response.json();
        return {
          title: oembedData.title || undefined,
          author: oembedData.author_name ? `@${oembedData.author_name}` : undefined,
          thumbnail: oembedData.thumbnail_url || undefined,
        };
      }
    }

    if (platform === "twitter") {
      const tweetId = extractTweetId(url);
      if (!tweetId) return null;

      // Fetch fxtwitter API for tweet text, author username, and media thumbnail
      const response = await fetch(`https://api.fxtwitter.com/status/${tweetId}`, {
        headers: {
          "Accept": "application/json",
        },
        signal: controller.signal,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200 && data.tweet) {
          const tweet = data.tweet;
          let thumbnail = "";
          if (tweet.media && Array.isArray(tweet.media.all) && tweet.media.all.length > 0) {
            thumbnail = tweet.media.all[0].thumbnail_url || tweet.media.all[0].url || "";
          }
          return {
            title: tweet.text || undefined,
            author: tweet.author?.name ? `${tweet.author.name} (@${tweet.author.screen_name})` : undefined,
            thumbnail: thumbnail || undefined,
          };
        }
      }
    }
  } catch (error) {
    console.error("Metadata fetch error:", error);
  } finally {
    clearTimeout(timeoutId);
  }

  return null;
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
      const instances = await getHealthyInvidiousInstances();
      for (const instance of instances) {
        try {
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
    let thumbnail = `https://placehold.co/1280x720/1a1a2e/3b82f6?text=${encodeURIComponent(platform.charAt(0).toUpperCase() + platform.slice(1))}`;
    let author = platformAuthors[platform] || "Creator";

    // Attempt tokenless real metadata extraction (Instagram, TikTok, Twitter/X)
    if (["instagram", "tiktok", "twitter"].includes(platform)) {
      const meta = await fetchMediaMetadata(url, platform);
      if (meta) {
        if (meta.title) title = meta.title;
        if (meta.author) author = meta.author;
        if (meta.thumbnail) thumbnail = meta.thumbnail;
      }
    }

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
        if (audioResult.filename && !title.includes(" ")) title = audioResult.filename;
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
          if (val.filename && (!title || title.startsWith("Instagram") || title.startsWith("Tiktok") || title.startsWith("Twitter"))) {
            title = val.filename;
          }
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
            // Use the first image from the picker as the thumbnail if we don't have one
            if (idx === 0 && item.type === "photo" && (!thumbnail || thumbnail.includes("placehold.co"))) {
              thumbnail = item.url;
            }
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
      author,
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
