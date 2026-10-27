import type { OccupancyLevel, OccupancyResult, ReportInput } from "./types";

export const LEVEL_VALUE: Record<OccupancyLevel, number> = {
  green: 20,
  yellow: 55,
  red: 85,
};

export const REPORT_WINDOW_MINUTES = 60;
const DECAY_MINUTES = 25;

const LABELS: Record<OccupancyLevel, string> = {
  green: "tranquilla",
  yellow: "media",
  red: "piena",
};

export function occupancyFromPercent(percent: number): OccupancyLevel {
  if (percent < 40) return "green";
  if (percent <= 75) return "yellow";
  return "red";
}

export function defaultBaseline(weekday: number, hour: number): number {
  const isWeekend = weekday === 0 || weekday === 6;
  const weekend = [0, 0, 0, 0, 0, 0, 0, 0, 15, 25, 35, 40, 45, 40, 35, 40, 45, 40, 30, 20, 15, 10, 5, 0];
  const weekdayCurve = [0, 0, 0, 0, 0, 0, 5, 15, 25, 40, 50, 55, 50, 45, 55, 70, 80, 75, 60, 40, 25, 15, 8, 0];
  return (isWeekend ? weekend : weekdayCurve)[hour] ?? 0;
}

export function blendOccupancy(input: {
  isOpen: boolean;
  weekday: number;
  hour: number;
  reports: ReportInput[];
  customCurve?: number[][] | null;
}): OccupancyResult {
  if (!input.isOpen) {
    return {
      status: "closed",
      percent: null,
      level: null,
      label: "chiusa",
      source: "closed",
      lastReportMinutes: null,
    };
  }

  const baseline =
    input.customCurve?.[input.weekday]?.[input.hour] ??
    defaultBaseline(input.weekday, input.hour);

  const recent = input.reports.filter((report) => report.ageMinutes <= REPORT_WINDOW_MINUTES);

  if (recent.length === 0) {
    const percent = Math.round(baseline);
    const level = occupancyFromPercent(percent);
    return {
      status: "open",
      percent,
      level,
      label: LABELS[level],
      source: "estimate",
      lastReportMinutes: null,
    };
  }

  let weightSum = 0;
  let valueSum = 0;
  for (const report of recent) {
    const weight = Math.exp(-report.ageMinutes / DECAY_MINUTES);
    weightSum += weight;
    valueSum += weight * LEVEL_VALUE[report.level];
  }

  const reportValue = valueSum / weightSum;
  const alpha = Math.min(0.85, 0.5 + 0.15 * (recent.length - 1));
  const percent = Math.round(alpha * reportValue + (1 - alpha) * baseline);
  const level = occupancyFromPercent(percent);
  const newest = Math.min(...recent.map((report) => report.ageMinutes));

  return {
    status: "open",
    percent,
    level,
    label: LABELS[level],
    source: "reports",
    lastReportMinutes: newest,
  };
}

export function occupancyCaption(result: OccupancyResult): string {
  if (result.status === "closed") return "Chiusa ora";
  if (result.source === "reports" && result.lastReportMinutes != null) {
    if (result.lastReportMinutes < 1) return "Segnalato adesso";
    return `Segnalato ${result.lastReportMinutes} min fa`;
  }
  return "Stima oraria";
}
