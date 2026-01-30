import { Redis as UpstashRedis } from "@upstash/redis";
import Redis from "ioredis";

const isUpstash = process.env.REDIS_PROVIDER === "upstash";

const upstash = isUpstash
  ? new UpstashRedis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const ioredis = !isUpstash ? new Redis({ host: "redis", port: 6379 }) : null;

export const redis = {
  async get<T>(key: string): Promise<T | null> {
    if (upstash) return await upstash.get<T>(key);
    const data = await ioredis!.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: any, exSeconds: number = 300) {
    const stringValue = JSON.stringify(value);
    if (upstash) {
      return await upstash.set(key, stringValue, { ex: exSeconds });
    }
    return await ioredis!.set(key, stringValue, "EX", exSeconds);
  },
};
