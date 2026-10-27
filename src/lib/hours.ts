import type { TimeInterval, WeekHours } from "./types";
import type { RomeClock } from "./rome-time";

const DAY_LABELS: Record<keyof WeekHours, string> = {
  mon: "Lunedì",
  tue: "Martedì",
  wed: "Mercoledì",
  thu: "Giovedì",
  fri: "Venerdì",
  sat: "Sabato",
  sun: "Domenica",
};

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isOpenAt(hours: WeekHours, clock: RomeClock): boolean {
  const intervals = hours[clock.weekdayKey] ?? [];
  const now = clock.hour * 60 + clock.minute;
  return intervals.some((interval) => {
    const start = toMinutes(interval.open);
    const end = toMinutes(interval.close);
    return now >= start && now < end;
  });
}

export function formatIntervals(intervals: TimeInterval[]): string {
  if (intervals.length === 0) return "Chiuso";
  return intervals.map((interval) => `${interval.open}–${interval.close}`).join(", ");
}

export function formatWeekHours(hours: WeekHours): { day: string; value: string }[] {
  return (Object.keys(DAY_LABELS) as (keyof WeekHours)[]).map((key) => ({
    day: DAY_LABELS[key],
    value: formatIntervals(hours[key]),
  }));
}

export function nextChangeLabel(hours: WeekHours, clock: RomeClock): string | null {
  const intervals = hours[clock.weekdayKey] ?? [];
  const now = clock.hour * 60 + clock.minute;
  const current = intervals.find((interval) => {
    const start = toMinutes(interval.open);
    const end = toMinutes(interval.close);
    return now >= start && now < end;
  });
  if (current) return `Chiude alle ${current.close}`;

  const upcoming = intervals.find((interval) => toMinutes(interval.open) > now);
  if (upcoming) return `Apre alle ${upcoming.open}`;
  return null;
}
