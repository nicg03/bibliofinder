"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { OccupancyLevel } from "@/lib/types";

const OPTIONS: { level: OccupancyLevel; label: string; hint: string; className: string }[] = [
  { level: "green", label: "Tranquilla", hint: "C'è posto", className: "border-emerald-300 hover:bg-emerald-50" },
  { level: "yellow", label: "Media", hint: "Abbastanza piena", className: "border-amber-300 hover:bg-amber-50" },
  { level: "red", label: "Piena", hint: "Difficile trovare posto", className: "border-red-300 hover:bg-red-50" },
];

export function ReportButtons({ slug }: { slug: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function send(level: OccupancyLevel) {
    setPending(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/places/${slug}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });
      if (response.status === 429) {
        setMessage("Hai già segnalato questa sede di recente.");
        return;
      }
      if (!response.ok) {
        setMessage("Segnalazione non riuscita. Riprova.");
        return;
      }
      setMessage("Grazie: la tua segnalazione aggiorna il semaforo.");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <h2 className="font-serif text-xl text-stone-900">Sei qui ora?</h2>
      <p className="mt-1 text-sm text-stone-600">
        Segnala l&apos;affluenza. Non serve un account: una segnalazione ogni 20 minuti per sede.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.level}
            type="button"
            disabled={pending}
            onClick={() => send(option.level)}
            className={`rounded-xl border bg-stone-50 px-3 py-3 text-left disabled:opacity-60 ${option.className}`}
          >
            <span className="block font-semibold text-stone-900">{option.label}</span>
            <span className="text-xs text-stone-500">{option.hint}</span>
          </button>
        ))}
      </div>
      {message ? <p className="mt-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
