# BiblioFinder

Catalogo di **aule studio** e **biblioteche civiche di Roma**, con orari, mappa e semaforo di affluenza (verde / giallo / rosso). L’affluenza è ibrida: stima oraria + segnalazioni di chi è sul posto.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- PostgreSQL + Prisma
- Leaflet / OpenStreetMap
- Deploy su [Railway](https://docs.railway.com/guides/nextjs)

## Locale

Serve PostgreSQL 16.

```bash
createdb bibliofinder
cp .env.example .env   # imposta DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Railway

1. Crea un progetto da questo repository GitHub.
2. Aggiungi un servizio PostgreSQL.
3. Nel servizio web, referenzia `DATABASE_URL` dal database.
4. Imposta `REPORT_SALT` (stringa casuale).
5. Generate Domain.

Le migrate e il seed partono all’avvio del container.

## Fonti

- [Open Data Biblioteche di Roma](https://www.bibliotechediroma.it/opac/article/open-data) (CC BY 4.0)
- [Aule Studio Roma](https://aulestudio.roma.it/aule/)
