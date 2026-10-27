export type PlaceKind = "aula" | "biblioteca";

export type TimeInterval = {
  open: string;
  close: string;
};

export type WeekHours = {
  mon: TimeInterval[];
  tue: TimeInterval[];
  wed: TimeInterval[];
  thu: TimeInterval[];
  fri: TimeInterval[];
  sat: TimeInterval[];
  sun: TimeInterval[];
};

export type OccupancyLevel = "green" | "yellow" | "red";

export type OccupancySource = "estimate" | "reports" | "closed";

export type OccupancyResult = {
  status: "open" | "closed";
  percent: number | null;
  level: OccupancyLevel | null;
  label: string;
  source: OccupancySource;
  lastReportMinutes: number | null;
};

export type PlaceSeed = {
  slug: string;
  type: PlaceKind;
  name: string;
  address: string;
  neighborhood: string;
  municipio: string | null;
  lat: number;
  lng: number;
  capacity: number | null;
  outdoorSeats: number | null;
  services: string[];
  hours: WeekHours;
  sourceUrl: string | null;
  description: string | null;
};

export type PlaceView = PlaceSeed & {
  occupancy: OccupancyResult;
  hoursHint: string | null;
};

export type ReportInput = {
  level: OccupancyLevel;
  ageMinutes: number;
};
