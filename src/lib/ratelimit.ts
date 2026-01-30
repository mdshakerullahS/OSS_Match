import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "./redis";

let rateLimiter: Ratelimit | RateLimiterRedis;

if (process.env.REDIS_PROVIDER === "upstash") {
  rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(20, "1 h"),
  });
} else {
  rateLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "middleware",
    points: 10,
    duration: 60,
  });
}

export { rateLimiter };
