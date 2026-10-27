import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Come funziona · BiblioFinder",
};

export default function HowItWorksPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-stone-900">Come funziona l&apos;affluenza</h1>
      <p className="mt-4 text-stone-600">
        Nessuna biblioteca o aula studio pubblica un numero live di presenze. BiblioFinder non
        inventa un conteggio: mostra uno <strong>stato</strong> (verde, giallo, rosso) e una{" "}
        <strong>fascia percentuale</strong>.
      </p>
      <ol className="mt-8 list-decimal space-y-4 pl-5 text-stone-700">
        <li>
          <strong>Stima oraria.</strong> Ogni sede parte da una curva per giorno e ora: più bassa
          al mattino e nel weekend, più alta nel pomeriggio feriale. Fuori orario la sede è
          semplicemente chiusa.
        </li>
        <li>
          <strong>Segnalazioni.</strong> Chi è sul posto può dire se è tranquilla, media o piena.
          I report degli ultimi 60 minuti pesano più della stima; quelli più vecchi decadono.
        </li>
        <li>
          <strong>Semaforo.</strong> Sotto il 40% è verde, fino al 75% giallo, oltre è rosso. Se
          non ci sono segnalazioni recenti, etichettiamo il dato come stima.
        </li>
      </ol>
      <h2 className="mt-10 font-serif text-2xl">Fonti del catalogo</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
        <li>
          Biblioteche civiche: open data dell&apos;Istituzione Biblioteche di Roma, licenza{" "}
          <a className="underline" href="https://www.bibliotechediroma.it/opac/article/open-data">
            CC BY 4.0
          </a>
          .
        </li>
        <li>
          Aule studio: elenco pubblico della rete{" "}
          <a className="underline" href="https://aulestudio.roma.it/aule/">
            Aule Studio Roma
          </a>
          .
        </li>
      </ul>
      <p className="mt-6 text-sm text-stone-500">
        Orari e capienze possono cambiare per festività o lavori. In caso di dubbio, controlla la
        scheda ufficiale collegata a ogni luogo.
      </p>
    </article>
  );
}
