"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Link2, ClipboardPaste, X, Download, Music, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { extractRequestSchema, detectPlatform } from "@/lib/schemas";
import { useMediaExtract } from "@/hooks/use-media-extract";
import type { ExtractRequestInput } from "@/lib/schemas";
import type { MediaFormat } from "@/types";

export function UrlPasteCard() {
  const { data, isLoading, error, extract, reset } = useMediaExtract();
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExtractRequestInput>({
    resolver: zodResolver(extractRequestSchema),
    defaultValues: { url: "" },
  });

  const urlValue = watch("url");

  const onUrlChange = (value: string) => {
    const platform = detectPlatform(value);
    setDetectedPlatform(platform);
  };

  const onSubmit = async (formData: ExtractRequestInput) => {
    await extract(formData.url);
  };

  const handleClear = () => {
    setValue("url", "");
    setDetectedPlatform(null);
    reset();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue("url", text);
      onUrlChange(text);
    } catch {
      /* Clipboard access denied — user can paste manually */
    }
  };

  const platformLabels: Record<string, string> = {
    youtube: "YouTube",
    twitter: "Twitter/X",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    vimeo: "Vimeo",
    reddit: "Reddit",
    soundcloud: "SoundCloud",
  };

  const platformColors: Record<string, string> = {
    youtube: "bg-red-500/10 text-red-600 dark:text-red-400",
    twitter: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    instagram: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    tiktok: "bg-neutral-500/10 text-neutral-700 dark:text-neutral-300",
    facebook: "bg-blue-600/10 text-blue-700 dark:text-blue-400",
    vimeo: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    reddit: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    soundcloud: "bg-orange-600/10 text-orange-700 dark:text-orange-400",
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="gradient-border rounded-2xl bg-card p-1 shadow-xl shadow-primary/5">
        <div className="rounded-xl bg-card p-5 sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input row */}
            <div className="relative">
              <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                {...register("url", {
                  onChange: (e) => onUrlChange(e.target.value),
                })}
                type="url"
                placeholder="Paste a video or audio link here..."
                className={cn(
                  "h-12 w-full rounded-xl border bg-background pl-11 pr-20 text-sm outline-none transition-all duration-200",
                  "placeholder:text-muted-foreground/60",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                  errors.url
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-input"
                )}
                aria-label="Media URL"
                aria-describedby={errors.url ? "url-error" : undefined}
                autoComplete="off"
              />
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1">
                {urlValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Clear input"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-muted px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                  aria-label="Paste from clipboard"
                >
                  <ClipboardPaste className="h-3 w-3" />
                  Paste
                </button>
              </div>
            </div>

            {/* Error message */}
            {(errors.url || error) && (
              <p
                id="url-error"
                className="text-xs text-destructive"
                role="alert"
              >
                {errors.url?.message || error}
              </p>
            )}

            {/* Platform badge */}
            {detectedPlatform && (
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                    platformColors[detectedPlatform] || "bg-muted text-muted-foreground"
                  )}
                >
                  {platformLabels[detectedPlatform] || detectedPlatform} detected
                </span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "relative flex h-11 w-full items-center justify-center gap-2 rounded-xl font-medium text-primary-foreground transition-all duration-200",
                "bg-primary hover:bg-primary/90 active:scale-[0.98]",
                "disabled:pointer-events-none disabled:opacity-60",
                "text-sm sm:text-base"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Extract Media
                </>
              )}
            </button>
          </form>

          {/* Results */}
          {data && (
            <div className="mt-6 border-t border-border pt-6">
              {data.formats.some((f) => f.format.toUpperCase() === "MP4") ? (
                // Split layout for videos with interactive player
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left: Video Player */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center w-full">
                    <div
                      className={cn(
                        "w-full overflow-hidden rounded-2xl bg-black border border-border/80 shadow-xl relative flex items-center justify-center",
                        (data.platform === "instagram" || data.platform === "tiktok")
                          ? "max-w-[240px] aspect-[9/16]"
                          : "aspect-video"
                      )}
                    >
                      <video
                        src={data.formats.find((f) => f.format.toUpperCase() === "MP4")?.url}
                        poster={data.thumbnail && !data.thumbnail.includes("placehold.co") ? data.thumbnail : undefined}
                        controls
                        playsInline
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Right: Info and Download Buttons */}
                  <div className="md:col-span-7 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                            platformColors[data.platform] || "bg-muted text-muted-foreground"
                          )}
                        >
                          {platformLabels[data.platform] || data.platform}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
                        {data.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        By {data.author} {data.duration && `· ${data.duration}`}
                      </p>
                    </div>

                    {/* Download buttons stack */}
                    <div className="space-y-2 pt-2">
                      {data.formats.map((format: MediaFormat, index: number) => (
                        <a
                          key={index}
                          href={`/api/download?url=${encodeURIComponent(format.url || "")}&filename=${encodeURIComponent(format.filename || "download")}`}
                          className={cn(
                            "flex w-full h-11 items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] text-sm",
                            index === 0
                              ? "bg-primary text-primary-foreground hover:bg-primary/95 shadow-md shadow-primary/10"
                              : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                          )}
                        >
                          <Download className="h-4 w-4" />
                          Download {format.format === "MP3" || format.format === "M4A" ? "Audio" : "Video"} ({format.quality})
                        </a>
                      ))}

                      <button
                        onClick={handleClear}
                        className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-background border border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground font-medium transition-all duration-200 text-sm mt-2"
                      >
                        Download Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Standard layout for audio/others
                <div className="space-y-4">
                  {/* Media info */}
                  <div className="flex gap-4">
                    <div className="relative flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-40 select-none">
                      {data.thumbnail && !data.thumbnail.includes("placehold.co") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={data.thumbnail}
                          alt={data.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className={cn(
                            "absolute inset-0 flex items-center justify-center text-[10px] font-bold tracking-wider text-white uppercase",
                            data.platform === "instagram" && "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
                            data.platform === "youtube" && "bg-gradient-to-tr from-[#ff0000] to-[#b30000]",
                            data.platform === "twitter" && "bg-gradient-to-tr from-[#0f1419] to-[#272c30]",
                            data.platform === "tiktok" && "bg-gradient-to-tr from-[#010101] via-[#10b981] to-[#ec4899]",
                            data.platform === "facebook" && "bg-gradient-to-tr from-[#1877f2] to-[#0d52b8]",
                            data.platform === "soundcloud" && "bg-gradient-to-tr from-[#ff5500] to-[#ff2200]",
                            data.platform === "reddit" && "bg-gradient-to-tr from-[#ff4500] to-[#b33000]"
                          )}
                        >
                          <div className="rounded bg-black/25 px-2 py-0.5 backdrop-blur-sm">
                            {platformLabels[data.platform] || data.platform}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {data.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {data.author} · {data.duration}
                      </p>
                      <span
                        className={cn(
                          "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                          platformColors[data.platform] || "bg-muted text-muted-foreground"
                        )}
                      >
                        {platformLabels[data.platform] || data.platform}
                      </span>
                    </div>
                  </div>

                  {/* Format options */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Available Formats
                    </h4>
                    <div className="grid gap-2">
                      {data.formats.map((format: MediaFormat, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            {format.format === "MP3" || format.format === "M4A" ? (
                              <Music className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Film className="h-4 w-4 text-muted-foreground" />
                            )}
                            <div>
                              <span className="text-sm font-medium text-foreground">
                                {format.quality}
                              </span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {format.format} · {format.size}
                              </span>
                            </div>
                          </div>
                          <a
                            href={`/api/download?url=${encodeURIComponent(format.url || "")}&filename=${encodeURIComponent(format.filename || "download")}`}
                            className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="mt-3 text-center text-xs text-muted-foreground/60">
        Supports YouTube, Twitter, Instagram, TikTok, Facebook, Vimeo, Reddit & SoundCloud
      </p>
    </div>
  );
}
