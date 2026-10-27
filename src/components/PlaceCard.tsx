import Link from "next/link";
import { OccupancyBadge } from "./OccupancyBadge";
import type { PlaceView } from "@/lib/types";

export function PlaceCard({ place }: { place: PlaceView }) {
  const change = place.hoursHint;
  const seats =
    place.capacity != null
      ? `${place.capacity} posti${place.outdoorSeats ? ` + ${place.outdoorSeats} fuori` : ""}`
      : "Sala lettura";

  return (
    <Link
      href={`/luoghi/${place.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`h-28 ${place.type === "aula" ? "bg-[linear-gradient(135deg,#1f4d3a,#3f7d63)]" : "bg-[linear-gradient(135deg,#9a3412,#c45c26)]"}`}
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              {place.type === "aula" ? "Aula studio" : "Biblioteca"}
            </p>
            <h2 className="font-serif text-xl text-stone-900 group-hover:text-[var(--accent)]">
              {place.name}
            </h2>
          </div>
          <OccupancyBadge occupancy={place.occupancy} compact />
        </div>
        <p className="text-sm text-stone-600">
          {place.address} · {place.neighborhood}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 text-sm text-stone-600">
          <span
            className={
              place.occupancy.status === "open" ? "font-medium text-emerald-700" : "text-stone-500"
            }
          >
            {place.occupancy.status === "open" ? "Aperta" : "Chiusa"}
            {change ? `, ${change.toLowerCase()}` : ""}
          </span>
          <span aria-hidden>·</span>
          <span>{seats}</span>
        </div>
      </div>
    </Link>
  );
}
