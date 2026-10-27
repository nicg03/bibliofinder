import type { OccupancyReport, Place } from "@prisma/client";
import { isOpenAt, nextChangeLabel } from "./hours";
import { blendOccupancy } from "./occupancy";
import { getRomeClock } from "./rome-time";
import type { PlaceView, WeekHours } from "./types";

type PlaceWithReports = Place & { reports: OccupancyReport[] };

export function toPlaceView(place: PlaceWithReports, now = new Date()): PlaceView {
  const clock = getRomeClock(now);
  const hours = place.hours as WeekHours;
  const isOpen = isOpenAt(hours, clock);
  const occupancy = blendOccupancy({
    isOpen,
    weekday: clock.weekday,
    hour: clock.hour,
    reports: place.reports.map((report) => ({
      level: report.level,
      ageMinutes: Math.max(0, Math.round((now.getTime() - report.createdAt.getTime()) / 60000)),
    })),
    customCurve: (place.baselineCurve as number[][] | null) ?? null,
  });

  return {
    slug: place.slug,
    type: place.type,
    name: place.name,
    address: place.address,
    neighborhood: place.neighborhood,
    municipio: place.municipio,
    lat: place.lat,
    lng: place.lng,
    capacity: place.capacity,
    outdoorSeats: place.outdoorSeats,
    services: place.services,
    hours,
    sourceUrl: place.sourceUrl,
    description: place.description,
    occupancy,
    hoursHint: nextChangeLabel(hours, clock),
  };
}
