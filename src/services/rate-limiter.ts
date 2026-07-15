interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
}

function checkRateLimitMemory(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return checkRateLimitMemory(key, config);
  }

  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  try {
    // Pipeline INCR and TTL in 1 HTTP call to minimize latency
    const response = await fetch(`${cleanUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["TTL", key],
      ]),
    });

    if (!response.ok) {
      throw new Error(`Redis HTTP error: ${response.status}`);
    }

    const results = await response.json();
    const count = Number(results[0]?.result || 1);
    let ttl = Number(results[1]?.result || -1);

    // If new key or TTL is not set (-1), expire it
    if (count === 1 || ttl < 0) {
      const expireSeconds = Math.ceil(config.windowMs / 1000);
      await fetch(`${cleanUrl}/expire/${key}/${expireSeconds}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      ttl = expireSeconds;
    }

    const resetIn = ttl > 0 ? ttl * 1000 : config.windowMs;
    const allowed = count <= config.maxRequests;

    return {
      allowed,
      remaining: Math.max(0, config.maxRequests - count),
      resetIn,
    };
  } catch (error) {
    console.error("Distributed rate limiter error, falling back to memory:", error);
    return checkRateLimitMemory(key, config);
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}
