import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-stone-600 md:flex-row md:justify-between">
        <p>
          Dati anagrafici da{" "}
          <a className="underline" href="https://www.bibliotechediroma.it/opac/article/open-data">
            Biblioteche di Roma
          </a>{" "}
          (CC BY 4.0) e dalla rete{" "}
          <a className="underline" href="https://aulestudio.roma.it/aule/">
            Aule Studio Roma
          </a>
          . L&apos;affluenza è di BiblioFinder (stima + segnalazioni).
        </p>
        <Link href="/come-funziona" className="underline">
          Metodo e fonti
        </Link>
      </div>
    </footer>
  );
}
