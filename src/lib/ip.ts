import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function hashIp(ip: string): string {
  const salt = process.env.REPORT_SALT ?? "bibliofinder-local";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
