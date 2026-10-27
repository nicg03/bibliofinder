import { OccupancyLevel } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, hashIp } from "@/lib/ip";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const LEVELS = new Set(["green", "yellow", "red"]);
const COOLDOWN_MS = 20 * 60 * 1000;

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const body = (await request.json().catch(() => null)) as { level?: string } | null;
  const level = body?.level;

  if (!level || !LEVELS.has(level)) {
    return NextResponse.json({ error: "Livello non valido" }, { status: 400 });
  }

  const place = await prisma.place.findUnique({ where: { slug } });
  if (!place) {
    return NextResponse.json({ error: "Luogo non trovato" }, { status: 404 });
  }

  const ipHash = hashIp(clientIp(request));
  const recent = await prisma.occupancyReport.findFirst({
    where: {
      placeId: place.id,
      ipHash,
      createdAt: { gte: new Date(Date.now() - COOLDOWN_MS) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (recent) {
    return NextResponse.json(
      { error: "Hai già segnalato questa sede di recente. Riprova tra poco." },
      { status: 429 },
    );
  }

  await prisma.occupancyReport.create({
    data: {
      placeId: place.id,
      level: level as OccupancyLevel,
      ipHash,
    },
  });

  return NextResponse.json({ ok: true });
}
