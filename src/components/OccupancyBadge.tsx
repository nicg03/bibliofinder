import { occupancyCaption } from "@/lib/occupancy";
import type { OccupancyResult } from "@/lib/types";

const COLORS: Record<string, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
  closed: "bg-stone-400",
};

export function OccupancyBadge({
  occupancy,
  compact = false,
}: {
  occupancy: OccupancyResult;
  compact?: boolean;
}) {
  const key = occupancy.level ?? "closed";
  const percent = occupancy.percent != null ? `~${occupancy.percent}%` : null;

  return (
    <div className="inline-flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-sm font-medium text-stone-800 shadow-sm ring-1 ring-stone-200">
        <span className={`h-2.5 w-2.5 rounded-full ${COLORS[key]}`} aria-hidden />
        <span className="capitalize">{occupancy.label}</span>
        {percent && occupancy.status === "open" ? (
          <span className="text-stone-500">{percent}</span>
        ) : null}
      </span>
      {!compact ? (
        <span className="px-1 text-xs text-stone-500">{occupancyCaption(occupancy)}</span>
      ) : null}
    </div>
  );
}
