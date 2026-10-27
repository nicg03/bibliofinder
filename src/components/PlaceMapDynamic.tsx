"use client";

import dynamic from "next/dynamic";
import type { PlaceView } from "@/lib/types";

const PlaceMap = dynamic(() => import("./PlaceMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl bg-stone-200 text-sm text-stone-600">
      Carico la mappa…
    </div>
  ),
});

export function PlaceMapDynamic({ places }: { places: PlaceView[] }) {
  return <PlaceMap places={places} />;
}
