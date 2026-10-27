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

## GitHub + Railway

Da questa cartella, dopo `gh auth login` e `railway login`:

```bash
gh repo create bibliofinder --public --source=. --remote=origin --push
railway init
railway add --database postgres
railway variable set REPORT_SALT="$(openssl rand -hex 16)"
railway up
railway domain
```

In alternativa, su [railway.com/new](https://railway.com/new): **Deploy from GitHub repo** → questo repository → aggiungi PostgreSQL → referenzia `DATABASE_URL` nel servizio web → **Generate Domain**.

Le migrate e il seed partono all’avvio del container.

## Fonti

- [Open Data Biblioteche di Roma](https://www.bibliotechediroma.it/opac/article/open-data) (CC BY 4.0)
- [Aule Studio Roma](https://aulestudio.roma.it/aule/)
