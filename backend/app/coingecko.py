"""Thin client for the public CoinGecko API with basic in-memory caching."""

import time

import httpx
from cachetools import TTLCache

BASE_URL = "https://api.coingecko.com/api/v3"

# CoinGecko's free tier is rate-limited, so cache responses briefly.
_cache: TTLCache = TTLCache(maxsize=256, ttl=60)


async def _get(path: str, params: dict | None = None) -> dict | list:
    cache_key = (path, tuple(sorted((params or {}).items())))
    if cache_key in _cache:
        return _cache[cache_key]

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(f"{BASE_URL}{path}", params=params)
        response.raise_for_status()
        data = response.json()

    _cache[cache_key] = data
    return data


async def get_markets(vs_currency: str = "usd", per_page: int = 20, page: int = 1) -> list:
    return await _get(
        "/coins/markets",
        {
            "vs_currency": vs_currency,
            "order": "market_cap_desc",
            "per_page": per_page,
            "page": page,
            "sparkline": "true",
            "price_change_percentage": "24h,7d",
        },
    )


async def get_coin(coin_id: str) -> dict:
    return await _get(
        f"/coins/{coin_id}",
        {
            "localization": "false",
            "tickers": "false",
            "community_data": "false",
            "developer_data": "false",
        },
    )


async def get_market_chart(coin_id: str, vs_currency: str = "usd", days: int = 7) -> dict:
    return await _get(
        f"/coins/{coin_id}/market_chart",
        {"vs_currency": vs_currency, "days": days},
    )
