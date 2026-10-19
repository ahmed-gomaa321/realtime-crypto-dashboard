"use client";

import { useCryptoWebSocket } from "@/controllers/useCryptoWebSocket";
import { ConnectionStatusBadge } from "@/components/dashboard/ConnectionStatus";
import { LiveTickerCard } from "@/components/dashboard/LiveTickerCard";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Activity } from "lucide-react";

export default function DashboardPage() {
  const { tickers, status } = useCryptoWebSocket();

  const btc = tickers["BTCUSDT"];
  const eth = tickers["ETHUSDT"];
  const sol = tickers["SOLUSDT"];

  return (
    <main className="min-h-screen p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                PulseTrade Real-Time Engine
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live Market Streaming & Technical Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <ConnectionStatusBadge status={status} />
            <ThemeToggle />
          </div>
        </header>

        {/* Live Prices Grid */}
        <section
          aria-label="Live Market Prices"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <LiveTickerCard title="Bitcoin / USDT" ticker={btc} />
          <LiveTickerCard title="Ethereum / USDT" ticker={eth} />
          <LiveTickerCard title="Solana / USDT" ticker={sol} />
        </section>

        {/* Real-time Chart */}
        <section
          aria-label="Realtime Chart Section"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <PriceChart symbol="BTCUSDT" currentPrice={btc?.price} />
        </section>
      </div>
    </main>
  );
}
