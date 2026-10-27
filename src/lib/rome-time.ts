const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export type RomeClock = {
  date: Date;
  weekday: number;
  weekdayKey: (typeof WEEKDAYS)[number];
  hour: number;
  minute: number;
};

export function getRomeClock(now = new Date()): RomeClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const weekdayName = (lookup.weekday ?? "Mon").slice(0, 3);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const weekday = map[weekdayName] ?? 1;
  const hour = Number(lookup.hour ?? "0");
  const minute = Number(lookup.minute ?? "0");

  return {
    date: now,
    weekday,
    weekdayKey: WEEKDAYS[weekday],
    hour,
    minute,
  };
}
