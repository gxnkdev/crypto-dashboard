import type { Coin } from "@/lib/api";
import CoinChart from "./CoinChart";

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);
}

function formatCompactUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function ChangeBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={positive ? "text-green-600" : "text-red-600"}>
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

export default function CoinTable({ coins }: { coins: Coin[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900 text-left text-gray-500">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Coin</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">24h</th>
            <th className="px-4 py-3 text-right">7d</th>
            <th className="px-4 py-3 text-right">Market Cap</th>
            <th className="px-4 py-3 text-right">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <td className="px-4 py-3 text-gray-400">{coin.market_cap_rank}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coin.image} alt={coin.name} className="h-6 w-6" />
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs uppercase text-gray-400">
                      {coin.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatUsd(coin.current_price)}
              </td>
              <td className="px-4 py-3 text-right">
                <ChangeBadge value={coin.price_change_percentage_24h} />
              </td>
              <td className="px-4 py-3 text-right">
                <ChangeBadge value={coin.price_change_percentage_7d_in_currency} />
              </td>
              <td className="px-4 py-3 text-right text-gray-500">
                {formatCompactUsd(coin.market_cap)}
              </td>
              <td className="px-4 py-3 text-right">
                <CoinChart prices={coin.sparkline_in_7d.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
