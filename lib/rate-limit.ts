import { createClient } from "redis";

const WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 60;
const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

type RedisClient = ReturnType<typeof createClient>;
type RuntimeState = typeof globalThis & {
  __goodQuotesRedis?: RedisClient;
  __goodQuotesRedisPromise?: Promise<RedisClient | null>;
};

const runtime = globalThis as RuntimeState;

function getLimit() {
  const configured = Number(process.env.RATE_LIMIT_PER_MINUTE);
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : DEFAULT_LIMIT;
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "anonymous";
}

async function getRedis() {
  if (!process.env.REDIS_URL) return null;
  if (runtime.__goodQuotesRedis?.isReady) return runtime.__goodQuotesRedis;
  if (runtime.__goodQuotesRedisPromise) return runtime.__goodQuotesRedisPromise;

  const client = createClient({ url: process.env.REDIS_URL });
  const typedClient = client as unknown as RedisClient;
  client.on("error", () => undefined);
  runtime.__goodQuotesRedisPromise = client.connect()
    .then(() => {
      runtime.__goodQuotesRedis = typedClient;
      return typedClient;
    })
    .catch(() => null);

  return runtime.__goodQuotesRedisPromise;
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export async function checkRateLimit(request: Request): Promise<RateLimitResult> {
  const limit = getLimit();
  const now = Date.now();
  const window = Math.floor(now / WINDOW_MS);
  const resetAt = (window + 1) * WINDOW_MS;
  const key = getClientKey(request);
  const redis = await getRedis();

  if (redis) {
    try {
      const redisKey = `good-quotes:rate:${window}:${key}`;
      const count = await redis.incr(redisKey);
      if (count === 1) await redis.expire(redisKey, Math.ceil(WINDOW_MS / 1000));
      return { allowed: count <= limit, limit, remaining: Math.max(0, limit - count), resetAt };
    } catch {
      // A temporary Redis failure should not take down the public API.
    }
  }

  const bucket = memoryBuckets.get(`${window}:${key}`) ?? { count: 0, resetAt };
  bucket.count += 1;
  memoryBuckets.set(`${window}:${key}`, bucket);

  if (memoryBuckets.size > 5000) {
    for (const [bucketKey, value] of memoryBuckets) {
      if (value.resetAt <= now) memoryBuckets.delete(bucketKey);
    }
  }

  return { allowed: bucket.count <= limit, limit, remaining: Math.max(0, limit - bucket.count), resetAt };
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}

export function rateLimitResponse(result: RateLimitResult) {
  return Response.json(
    { error: { message: "Too many requests. Please try again shortly." } },
    {
      status: 429,
      headers: { ...rateLimitHeaders(result), "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)) },
    },
  );
}
