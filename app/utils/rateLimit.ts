import { LRUCache } from "lru-cache";
import { rateLimiterTimer, uniqueTokensPerTimeInterval } from "./constants";

export default function rateLimit() {
  const tokenCache = new LRUCache({
    max: uniqueTokensPerTimeInterval,
    ttl: rateLimiterTimer,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        console.log(
          "Limiter :: IP :: ",
          token,
          " :: Current usage :: ",
          currentUsage
        );

        const isRateLimited = currentUsage >= limit;

        return isRateLimited ? reject() : resolve();
      }),
  };
}
