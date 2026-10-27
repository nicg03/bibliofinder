import { NextResponse } from "next/server";
import { REPORT_WINDOW_MINUTES } from "@/lib/occupancy";
import { prisma } from "@/lib/prisma";
import { toPlaceView } from "@/lib/places";

export const dynamic = "force-dynamic";

export async function GET() {
  const since = new Date(Date.now() - REPORT_WINDOW_MINUTES * 60 * 1000);
  const places = await prisma.place.findMany({
    include: {
      reports: {
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(places.map((place) => toPlaceView(place)));
}
