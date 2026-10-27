"use client";

import { useMemo, useState } from "react";
import { Filters, type CatalogFilters } from "./Filters";
import { PlaceCard } from "./PlaceCard";
import { PlaceMapDynamic } from "./PlaceMapDynamic";
import type { PlaceView } from "@/lib/types";

const INITIAL: CatalogFilters = {
  query: "",
  type: "all",
  openNow: false,
  occupancy: "all",
  neighborhood: "",
};

export function Catalog({ places }: { places: PlaceView[] }) {
  const [filters, setFilters] = useState<CatalogFilters>(INITIAL);
  const neighborhoods = useMemo(
    () => Array.from(new Set(places.map((place) => place.neighborhood))).sort(),
    [places],
  );

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return places.filter((place) => {
      if (filters.type !== "all" && place.type !== filters.type) return false;
      if (filters.openNow && place.occupancy.status !== "open") return false;
      if (filters.occupancy !== "all" && place.occupancy.level !== filters.occupancy) return false;
      if (filters.neighborhood && place.neighborhood !== filters.neighborhood) return false;
      if (!q) return true;
      return `${place.name} ${place.address} ${place.neighborhood}`.toLowerCase().includes(q);
    });
  }, [filters, places]);

  const aule = places.filter((place) => place.type === "aula").length;
  const biblioteche = places.filter((place) => place.type === "biblioteca").length;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--terracotta)]">
            Roma
          </p>
          <h1 className="mt-2 max-w-xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
            Trova dove studiare, senza arrivarci al buio.
          </h1>
          <p className="mt-4 max-w-xl text-stone-600">
            Catalogo di {aule} aule studio e {biblioteche} biblioteche civiche, con semaforo di
            affluenza: stima oraria più segnalazioni di chi è sul posto.
          </p>
        </div>
        <div className="h-[280px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-200 lg:h-[320px]">
          <PlaceMapDynamic places={filtered} />
        </div>
      </section>

      <Filters value={filters} neighborhoods={neighborhoods} onChange={setFilters} />

      <p className="text-sm text-stone-500">
        {filtered.length} {filtered.length === 1 ? "luogo" : "luoghi"}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-stone-600 ring-1 ring-stone-200">
          Nessun risultato con questi filtri.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((place) => (
            <PlaceCard key={place.slug} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
