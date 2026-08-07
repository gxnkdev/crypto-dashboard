# Crypto Dashboard

A full-stack cryptocurrency dashboard: a Python (FastAPI) backend that fetches
and caches live market data from the [CoinGecko API](https://www.coingecko.com/en/api),
and a Next.js (TypeScript) frontend that displays it in a sortable, responsive
table with 7-day sparkline charts.

## Stack

- **Backend:** Python, FastAPI, httpx, in-memory TTL caching
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts
- **Data source:** [CoinGecko public API](https://www.coingecko.com/en/api) (no API key required)

## Features

- Live top-20 coins by market cap: price, 24h/7d change, market cap
- 7-day price sparkline per coin
- Backend caches upstream responses (60s TTL) to stay within CoinGecko's free-tier rate limits
- Fully typed frontend-to-backend contract

## Project structure

```
crypto-dashboard/
├── backend/          # FastAPI app
│   └── app/
│       ├── main.py       # API routes
│       └── coingecko.py  # CoinGecko client + caching
└── frontend/          # Next.js app
    ├── app/            # Pages
    ├── components/      # CoinTable, CoinChart
    └── lib/api.ts       # Typed API client
```

## Running locally

### Backend

```bash
cd backend
python -m venv venv
./venv/Scripts/activate   # venv/bin/activate on macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API available at `http://localhost:8000` (docs at `/docs`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` in
`frontend/.env.local` if the backend runs somewhere other than
`http://localhost:8000`.

## API endpoints

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/coins` | Top coins by market cap |
| `GET /api/coins/{id}` | Coin details |
| `GET /api/coins/{id}/history` | Historical price chart data |

## Possible next steps

- Deploy backend (Railway/Render) and frontend (Vercel)
- Add per-coin detail page with a full price history chart
- Add search/filter and currency selector (USD/EUR/BRL)
- Add automated tests (pytest for backend, Playwright for frontend)
