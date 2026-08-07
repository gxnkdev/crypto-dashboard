"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

export default function CoinChart({ prices }: { prices: number[] }) {
  const data = prices.map((price, i) => ({ i, price }));
  const trendUp = prices[prices.length - 1] >= prices[0];

  return (
    <ResponsiveContainer width={120} height={40}>
      <LineChart data={data}>
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Line
          type="monotone"
          dataKey="price"
          stroke={trendUp ? "#16a34a" : "#dc2626"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
