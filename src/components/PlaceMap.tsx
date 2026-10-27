"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { PlaceView } from "@/lib/types";

const ROME: [number, number] = [41.9028, 12.4964];

function markerIcon(place: PlaceView) {
  const color =
    place.occupancy.status === "closed"
      ? "#a8a29e"
      : place.occupancy.level === "red"
        ? "#ef4444"
        : place.occupancy.level === "yellow"
          ? "#f59e0b"
          : "#10b981";
  return L.divIcon({
    className: "bf-marker",
    html: `<span style="display:block;width:16px;height:16px;border-radius:999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function FitBounds({ places }: { places: PlaceView[] }) {
  const map = useMap();
  useEffect(() => {
    if (places.length === 0) {
      map.setView(ROME, 11);
      return;
    }
    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lng]));
    map.fitBounds(bounds.pad(0.12));
  }, [map, places]);
  return null;
}

export default function PlaceMap({ places }: { places: PlaceView[] }) {
  return (
    <MapContainer
      center={ROME}
      zoom={11}
      className="h-full min-h-[320px] w-full rounded-2xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds places={places} />
      {places.map((place) => (
        <Marker key={place.slug} position={[place.lat, place.lng]} icon={markerIcon(place)}>
          <Popup>
            <div className="min-w-40">
              <p className="text-xs uppercase text-stone-500">
                {place.type === "aula" ? "Aula studio" : "Biblioteca"}
              </p>
              <p className="font-semibold">{place.name}</p>
              <p className="text-sm text-stone-600">{place.neighborhood}</p>
              <Link className="text-sm font-medium text-emerald-800" href={`/luoghi/${place.slug}`}>
                Vedi scheda
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
