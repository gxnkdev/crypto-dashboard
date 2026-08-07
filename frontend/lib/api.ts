const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: number[] };
}

export interface MarketChart {
  prices: [number, number][];
}

export async function getCoins(perPage = 20): Promise<Coin[]> {
  const res = await fetch(`${API_URL}/api/coins?per_page=${perPage}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

export async function getCoinHistory(coinId: string, days = 7): Promise<MarketChart> {
  const res = await fetch(`${API_URL}/api/coins/${coinId}/history?days=${days}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch coin history");
  return res.json();
}
