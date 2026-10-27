import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-stone-900">
          BiblioFinder
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-stone-700">
          <Link href="/" className="hover:text-[var(--accent)]">
            Luoghi
          </Link>
          <Link href="/come-funziona" className="hover:text-[var(--accent)]">
            Come funziona
          </Link>
        </nav>
      </div>
    </header>
  );
}
