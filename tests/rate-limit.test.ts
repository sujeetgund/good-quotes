import { afterEach, describe, expect, test } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("rate limiter", () => {
  const previousLimit = process.env.RATE_LIMIT_PER_MINUTE;
  const previousRedisUrl = process.env.REDIS_URL;

  afterEach(() => {
    if (previousLimit === undefined) delete process.env.RATE_LIMIT_PER_MINUTE;
    else process.env.RATE_LIMIT_PER_MINUTE = previousLimit;
    if (previousRedisUrl === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = previousRedisUrl;
  });

  test("falls back to an in-memory fixed window without Redis", async () => {
    delete process.env.REDIS_URL;
    process.env.RATE_LIMIT_PER_MINUTE = "2";
    const request = (ip: string) => new Request("http://localhost/api/quotes", { headers: { "x-forwarded-for": ip } });
    expect((await checkRateLimit(request("test-rate-limit"))).allowed).toBe(true);
    expect((await checkRateLimit(request("test-rate-limit"))).allowed).toBe(true);
    expect((await checkRateLimit(request("test-rate-limit"))).allowed).toBe(false);
  });
});
