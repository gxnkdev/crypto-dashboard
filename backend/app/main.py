import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app import coingecko

app = FastAPI(title="Crypto Dashboard API")

# Comma-separated list, e.g. "http://localhost:3000,https://crypto-dashboard.vercel.app"
allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/coins")
async def list_coins(vs_currency: str = "usd", per_page: int = 20, page: int = 1):
    try:
        return await coingecko.get_markets(vs_currency, per_page, page)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@app.get("/api/coins/{coin_id}")
async def coin_detail(coin_id: str):
    try:
        return await coingecko.get_coin(coin_id)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@app.get("/api/coins/{coin_id}/history")
async def coin_history(coin_id: str, vs_currency: str = "usd", days: int = 7):
    try:
        return await coingecko.get_market_chart(coin_id, vs_currency, days)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
