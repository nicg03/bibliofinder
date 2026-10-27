"use client";

export type CatalogFilters = {
  query: string;
  type: "all" | "aula" | "biblioteca";
  openNow: boolean;
  occupancy: "all" | "green" | "yellow" | "red";
  neighborhood: string;
};

export function Filters({
  value,
  neighborhoods,
  onChange,
}: {
  value: CatalogFilters;
  neighborhoods: string[];
  onChange: (next: CatalogFilters) => void;
}) {
  const set = (patch: Partial<CatalogFilters>) => onChange({ ...value, ...patch });

  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 md:grid-cols-5">
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
          Cerca
        </span>
        <input
          value={value.query}
          onChange={(event) => set({ query: event.target.value })}
          placeholder="Nome, via, quartiere…"
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:bg-white focus:ring-2"
        />
      </label>
      <label>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
          Tipo
        </span>
        <select
          value={value.type}
          onChange={(event) => set({ type: event.target.value as CatalogFilters["type"] })}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        >
          <option value="all">Tutti</option>
          <option value="aula">Aule studio</option>
          <option value="biblioteca">Biblioteche</option>
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
          Affluenza
        </span>
        <select
          value={value.occupancy}
          onChange={(event) =>
            set({ occupancy: event.target.value as CatalogFilters["occupancy"] })
          }
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        >
          <option value="all">Qualsiasi</option>
          <option value="green">Tranquilla</option>
          <option value="yellow">Media</option>
          <option value="red">Piena</option>
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
          Quartiere
        </span>
        <select
          value={value.neighborhood}
          onChange={(event) => set({ neighborhood: event.target.value })}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        >
          <option value="">Tutti</option>
          {neighborhoods.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-end gap-2 pb-2 text-sm text-stone-700 md:col-span-5">
        <input
          type="checkbox"
          checked={value.openNow}
          onChange={(event) => set({ openNow: event.target.checked })}
          className="size-4 accent-[var(--accent)]"
        />
        Solo aperte ora
      </label>
    </div>
  );
}
