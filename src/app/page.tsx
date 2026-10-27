import { Catalog } from "@/components/Catalog";
import { REPORT_WINDOW_MINUTES } from "@/lib/occupancy";
import { toPlaceView } from "@/lib/places";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
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

  return <Catalog places={places.map((place) => toPlaceView(place))} />;
}
