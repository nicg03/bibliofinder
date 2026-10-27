import Link from "next/link";
import { notFound } from "next/navigation";
import { OccupancyBadge } from "@/components/OccupancyBadge";
import { PlaceMapDynamic } from "@/components/PlaceMapDynamic";
import { ReportButtons } from "@/components/ReportButtons";
import { formatWeekHours } from "@/lib/hours";
import { REPORT_WINDOW_MINUTES } from "@/lib/occupancy";
import { toPlaceView } from "@/lib/places";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const since = new Date(Date.now() - REPORT_WINDOW_MINUTES * 60 * 1000);
  const record = await prisma.place.findUnique({
    where: { slug },
    include: {
      reports: {
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!record) notFound();

  const place = toPlaceView(record);
  const change = place.hoursHint;
  const seats =
    place.capacity != null
      ? `${place.capacity} posti${place.outdoorSeats ? ` + ${place.outdoorSeats} all’esterno` : ""}`
      : "Capienza non dichiarata";

  return (
    <article className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="flex flex-col gap-5">
        <Link href="/" className="text-sm text-stone-500 hover:text-[var(--accent)]">
          ← Tutti i luoghi
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          {place.type === "aula" ? "Aula studio" : "Biblioteca"} · {place.neighborhood}
          {place.municipio ? ` · Municipio ${place.municipio}` : ""}
        </p>
        <h1 className="font-serif text-4xl text-stone-900">{place.name}</h1>
        <OccupancyBadge occupancy={place.occupancy} />
        <p className="text-stone-600">{place.description}</p>
        <dl className="grid gap-3 rounded-2xl bg-white p-5 text-sm shadow-sm ring-1 ring-stone-200 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Indirizzo</dt>
            <dd className="mt-1 text-stone-800">
              {place.address}, {place.neighborhood}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Stato</dt>
            <dd className="mt-1 text-stone-800">
              {place.occupancy.status === "open" ? "Aperta" : "Chiusa"}
              {change ? ` · ${change}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Posti</dt>
            <dd className="mt-1 text-stone-800">{seats}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">Servizi</dt>
            <dd className="mt-1 text-stone-800">{place.services.join(" · ")}</dd>
          </div>
        </dl>
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
          <h2 className="font-serif text-xl">Orari</h2>
          <ul className="mt-3 divide-y divide-stone-100 text-sm">
            {formatWeekHours(place.hours).map((row) => (
              <li key={row.day} className="flex justify-between py-2">
                <span className="text-stone-500">{row.day}</span>
                <span className="font-medium text-stone-800">{row.value}</span>
              </li>
            ))}
          </ul>
        </section>
        {place.occupancy.status === "open" ? <ReportButtons slug={place.slug} /> : null}
        {place.sourceUrl ? (
          <p className="text-sm text-stone-500">
            Fonte anagrafica:{" "}
            <a className="underline" href={place.sourceUrl} target="_blank" rel="noreferrer">
              scheda ufficiale
            </a>
          </p>
        ) : null}
      </div>
      <div className="h-[360px] overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-200 lg:h-auto lg:min-h-[480px]">
        <PlaceMapDynamic places={[place]} />
      </div>
    </article>
  );
}
