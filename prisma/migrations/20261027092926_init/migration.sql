-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('aula', 'biblioteca');

-- CreateEnum
CREATE TYPE "OccupancyLevel" AS ENUM ('green', 'yellow', 'red');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PlaceType" NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "municipio" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER,
    "outdoorSeats" INTEGER,
    "services" TEXT[],
    "hours" JSONB NOT NULL,
    "sourceUrl" TEXT,
    "description" TEXT,
    "baselineCurve" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OccupancyReport" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "level" "OccupancyLevel" NOT NULL,
    "ipHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OccupancyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");

-- CreateIndex
CREATE INDEX "OccupancyReport_placeId_createdAt_idx" ON "OccupancyReport"("placeId", "createdAt");

-- CreateIndex
CREATE INDEX "OccupancyReport_placeId_ipHash_createdAt_idx" ON "OccupancyReport"("placeId", "ipHash", "createdAt");

-- AddForeignKey
ALTER TABLE "OccupancyReport" ADD CONSTRAINT "OccupancyReport_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
