"use client";

import { useState, useCallback } from "react";
import type { MediaInfo, ExtractResponse } from "@/types";

interface UseMediaExtractReturn {
  data: MediaInfo | null;
  isLoading: boolean;
  error: string | null;
  extract: (url: string) => Promise<void>;
  reset: () => void;
}

export function useMediaExtract(): UseMediaExtractReturn {
  const [data, setData] = useState<MediaInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extract = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result: ExtractResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to extract media information");
      }

      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error, extract, reset };
}
