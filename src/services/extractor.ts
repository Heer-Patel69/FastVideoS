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
  if (match && match[2].length === 11) {
    return match[2];
  }

  // Fallback for YouTube Shorts: youtube.com/shorts/<video_id>
  const shortsMatch = url.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
  if (shortsMatch) {
    return shortsMatch[1];
  }

  return null;
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
  monitor?: {
    down: boolean;
    uptime?: number;
  };
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
            return meta && meta.type === "https" && (!meta.monitor || !meta.monitor.down);
          })
          .map((pair: [string, InvidiousInstanceMeta]) => {
            const domain = pair[0];
            try {
              if (domain.includes("://")) {
                return new URL(domain).hostname;
              }
              return domain;
            } catch {
              return domain || "";
            }
          })
          .filter((hostname: string) => hostname !== "")
          .slice(0, 12);

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

  // Fallback to wider list of active/working Invidious public instances if API fails
  return [
    "invidious.nerdvpn.de",
    "invidious.tiekoetter.com",
    "inv.nadeko.net",
    "yewtu.be",
    "invidious.flokinet.to",
    "yt.chocolatemoo53.com",
    "inv.zoomerville.com"
  ];
}

async function fetchFromInvidious(instance: string, videoId: string, url: string): Promise<MediaInfo> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout per request

  try {
    const response = await fetch(
      `https://${instance}/api/v1/videos/${videoId}?local=true`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`Invidious instance ${instance} returned status ${response.status}`);
    }

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

    if (formats.length === 0) {
      throw new Error(`No formats available on instance ${instance}`);
    }

    return {
      url,
      platform: "youtube",
      title: data.title || "YouTube Video",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: formatDuration(data.lengthSeconds),
      author: data.author || "YouTube Creator",
      formats,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getWorkingCobaltInstances(platform: string): Promise<string[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

  try {
    const res = await fetch("https://cobalt.directory/api/working?type=api", {
      signal: controller.signal,
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data[platform])) {
        const activeInstances = json.data[platform].filter((url: string) => url && url.startsWith("http"));
        const verifiedOpen = ["https://cobaltapi.cjs.nz", "https://rue-cobalt.xenon.zone"];
        const combined = Array.from(new Set([...verifiedOpen, ...activeInstances]));
        if (combined.length > 0) {
          return combined;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to fetch working Cobalt instances for ${platform}:`, error);
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback lists if the API is down or rate-limited
  const fallbacks: Record<string, string[]> = {
    youtube: [
      "https://cobaltapi.cjs.nz",
      "https://rue-cobalt.xenon.zone",
      "https://api.cobalt.liubquanti.click",
      "https://grapefruit.clxxped.lol",
      "https://api.qwkuns.me",
      "https://nuko-c.meowing.de",
      "https://api-cobalt.eversiege.network",
      "https://subito-c.meowing.de",
    ],
    "youtube-shorts": [
      "https://cobaltapi.cjs.nz",
      "https://rue-cobalt.xenon.zone",
      "https://api.cobalt.liubquanti.click",
      "https://api.qwkuns.me",
      "https://nuko-c.meowing.de",
      "https://subito-c.meowing.de",
    ],
    instagram: [
      "https://cobaltapi.cjs.nz",
      "https://rue-cobalt.xenon.zone",
      "https://api.cobalt.liubquanti.click",
      "https://api.qwkuns.me",
      "https://nuko-c.meowing.de",
      "https://api-cobalt.eversiege.network",
      "https://subito-c.meowing.de",
      "https://lime.clxxped.lol",
    ],
    tiktok: [
      "https://cobaltapi.cjs.nz",
      "https://rue-cobalt.xenon.zone",
      "https://api.cobalt.liubquanti.click",
      "https://api.qwkuns.me",
      "https://nuko-c.meowing.de",
      "https://api-cobalt.eversiege.network",
      "https://subito-c.meowing.de",
    ],
    twitter: [
      "https://cobaltapi.cjs.nz",
      "https://rue-cobalt.xenon.zone",
      "https://api.cobalt.liubquanti.click",
      "https://api.qwkuns.me",
      "https://nuko-c.meowing.de",
      "https://api-cobalt.eversiege.network",
      "https://subito-c.meowing.de",
    ],
  };

  return fallbacks[platform] || [
    "https://api.cobalt.tools",
    "https://co.wuk.sh",
    "https://cobalt.kwi.cat",
    "https://cobalt.q1.is",
  ];
}

interface CobaltResponse {
  status: "tunnel" | "redirect" | "picker" | "error";
  url?: string;
  filename?: string;
  picker?: Array<{
    url: string;
    type: "photo" | "video";
    filename?: string;
  }>;
  text?: string;
  error?: {
    code: string;
  };
}

async function callCobaltInstance(instanceUrl: string, url: string, downloadMode: "auto" | "audio"): Promise<CobaltResponse> {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (COBALT_API_KEY && instanceUrl === COBALT_API_URL) {
    headers["Authorization"] = `Bearer ${COBALT_API_KEY}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout per instance

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
    let responseData: CobaltResponse;
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

async function callCobalt(url: string, downloadMode: "auto" | "audio", platform: string): Promise<CobaltResponse> {
  // If the user configured a private custom self-hosted instance, use it exclusively
  if (process.env.COBALT_API_URL && process.env.COBALT_API_URL !== "https://api.cobalt.tools") {
    return callCobaltInstance(process.env.COBALT_API_URL, url, downloadMode);
  }

  const instances = await getWorkingCobaltInstances(platform);

  // Query all working instances in parallel, returning the first one that successfully resolves
  const promises = instances.slice(0, 8).map((instance) =>
    callCobaltInstance(instance, url, downloadMode)
  );

  try {
    return await Promise.any(promises);
  } catch (err) {
    console.error(`All Cobalt instances failed in parallel for ${platform}:`, err);

    // If it's an AggregateError, look for a specific invalid URL / client-input error
    if (err && typeof err === "object" && "errors" in err) {
      const aggregateErr = err as { errors: Error[] };
      const clientError = aggregateErr.errors.find((e) =>
        e.message.includes("error.api.invalid_url") ||
        e.message.includes("error.api.url_invalid") ||
        e.message.includes("400")
      );
      if (clientError) {
        throw clientError;
      }
    }

    throw new Error(
      "All download service instances are currently rate-limited or offline. Please try again in a few minutes."
    );
  }
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
          thumbnail: `https://www.instagram.com/p/${shortcode}/media/?size=l`,
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

  // --- GENERAL PLATFORM EXTRACTOR ---
  try {
    const formats: MediaFormat[] = [];
    let title = `${platform.charAt(0).toUpperCase() + platform.slice(1)} Media`;
    let thumbnail = `https://placehold.co/1280x720/1a1a2e/3b82f6?text=${encodeURIComponent(platform.charAt(0).toUpperCase() + platform.slice(1))}`;
    let author = platformAuthors[platform] || "Creator";

    // Set YouTube thumbnail proactively
    if (platform === "youtube") {
      const videoId = extractYoutubeId(url);
      if (videoId) {
        thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

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
      const audioResult = await callCobalt(url, "audio", platform);
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
        callCobalt(url, "auto", platform),
        callCobalt(url, "audio", platform),
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
          if (val.filename && (!title || title.startsWith("Instagram") || title.startsWith("Tiktok") || title.startsWith("Twitter") || title.startsWith("Youtube") || title.startsWith("YouTube"))) {
            title = val.filename;
          }
          hasMedia = true;
        } else if (val.status === "picker" && val.picker && Array.isArray(val.picker)) {
          // Handle carousel posts (like TikTok/Instagram image carousels)
          const hasVideoInPicker = val.picker.some((item) => item.type === "video");
          
          // Find first photo to use as thumbnail preview
          const firstPhoto = val.picker.find((item) => item.type === "photo");
          if (firstPhoto && (!thumbnail || thumbnail.includes("placehold.co"))) {
            thumbnail = firstPhoto.url;
          }

          val.picker.forEach((item: { url: string; type: string; filename?: string }, idx: number) => {
            // If the post has a video, don't show the static cover photos as download options.
            // Only show the video files for download.
            if (hasVideoInPicker && item.type === "photo") {
              return;
            }

            formats.push({
              quality: hasVideoInPicker ? "HD Video" : `Image ${idx + 1}`,
              format: item.type === "photo" ? "JPG" : "MP4",
              size: "Download",
              hasAudio: item.type !== "photo",
              url: item.url,
              filename: item.filename || `item-${idx + 1}.${item.type === "photo" ? "jpg" : "mp4"}`,
            });
          });
          hasMedia = formats.length > 0;
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

      // If this is an Instagram Reel/Video download request, we must have at least one video format.
      // If it only returned images, it means the video stream itself could not be extracted (typically due to login walls).
      const isInstagramReelUrl = platform === "instagram" && (url.includes("/reel/") || url.includes("/reels/") || url.includes("/tv/"));
      if (isInstagramReelUrl) {
        const hasVideoFormat = formats.some((f) => f.format.toUpperCase() === "MP4");
        if (!hasVideoFormat) {
          throw new Error("Instagram Reel video stream could not be extracted. This is usually due to Instagram rate-limiting public server requests. Please try again in a few minutes or use another link.");
        }
      }
    }

    // Proxy Instagram thumbnail if it's a direct external link to prevent PC hotlinking 403 blocks
    let finalThumbnail = thumbnail;
    if (platform === "instagram" && thumbnail && thumbnail.startsWith("http") && !thumbnail.includes("/api/download")) {
      finalThumbnail = `/api/download?url=${encodeURIComponent(thumbnail)}&filename=instagram-preview.jpg`;
    }

    const mediaInfo: MediaInfo = {
      url,
      platform,
      title,
      thumbnail: finalThumbnail,
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

    // --- YOUTUBE INVIDIOUS FALLBACK ---
    if (platform === "youtube") {
      const videoId = extractYoutubeId(url);
      if (videoId) {
        try {
          console.log("Cobalt failed for YouTube, attempting Invidious fallback...");
          const instances = await getHealthyInvidiousInstances();
          // Query top 8 healthy instances in parallel to guarantee fast response under Vercel 10s timeout
          const promises = instances.slice(0, 8).map((instance) =>
            fetchFromInvidious(instance, videoId, url)
          );
          const result = await Promise.any(promises);
          return {
            success: true,
            data: result,
          };
        } catch (invidiousError) {
          console.error("Invidious fallback also failed for YouTube:", invidiousError);
        }
      }
    }
    
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
