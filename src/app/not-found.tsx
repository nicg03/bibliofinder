import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-3xl">Luogo non trovato</h1>
      <p className="mt-2 text-stone-600">Questa scheda non è nel catalogo.</p>
      <Link href="/" className="mt-6 inline-block text-[var(--accent)] underline">
        Torna all&apos;elenco
      </Link>
    </div>
  );
}
