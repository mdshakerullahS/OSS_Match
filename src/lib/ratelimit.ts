import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const anonLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "1 h"),
});
