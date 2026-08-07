import { getCoins } from "@/lib/api";
import CoinTable from "@/components/CoinTable";

export const revalidate = 60;

export default async function Home() {
  const coins = await getCoins(20);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 sm:px-8">
      <main className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Crypto Dashboard
          </h1>
          <p className="text-sm text-zinc-500">
            Top cryptocurrencies by market cap, live from CoinGecko.
          </p>
        </header>
        <CoinTable coins={coins} />
      </main>
    </div>
  );
}
