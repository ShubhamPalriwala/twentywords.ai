import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { limiter } from "./app/layout";
import { requestsPerMinutePerIp } from "./app/utils/constants";

export async function middleware(request: NextRequest, next: NextFetchEvent) {
  let ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Unknown";
  }
  let rateLimited = false;
  if (!ip) {
    rateLimited = true;
  }

  try {
    await limiter.check(requestsPerMinutePerIp, ip || ""); // Assume that requestsPerMinutePerIp is the limit count
    rateLimited = false;
  } catch (err) {
    rateLimited = true;
  } finally {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-rate-limited", rateLimited.toString());
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ["/api/ai"],
};
