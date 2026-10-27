import { PrismaClient, PlaceType } from "@prisma/client";
import aule from "../data/aule.json";
import biblioteche from "../data/biblioteche.json";
import type { PlaceSeed } from "../src/lib/types";

const prisma = new PrismaClient();

async function upsertPlace(place: PlaceSeed) {
  const data = {
    type: place.type as PlaceType,
    name: place.name,
    address: place.address,
    neighborhood: place.neighborhood,
    municipio: place.municipio,
    lat: place.lat,
    lng: place.lng,
    capacity: place.capacity,
    outdoorSeats: place.outdoorSeats,
    services: place.services,
    hours: place.hours,
    sourceUrl: place.sourceUrl,
    description: place.description,
  };

  await prisma.place.upsert({
    where: { slug: place.slug },
    update: data,
    create: { slug: place.slug, ...data },
  });
}

async function main() {
  const places = [...aule, ...biblioteche] as PlaceSeed[];
  for (const place of places) {
    await upsertPlace(place);
  }
  console.log(`Seed completato: ${places.length} luoghi`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
