"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CryptoTicker } from "@/models/crypto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  ticker?: CryptoTicker;
  title: string;
}

export const LiveTickerCard = memo(function LiveTickerCard({
  ticker,
  title,
}: Props) {
  const isPositive = (ticker?.change24h ?? 0) >= 0;

  return (
    <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 backdrop-blur-xl transition-all duration-300 shadow-sm dark:shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </CardTitle>
        {ticker && typeof ticker.change24h === "number" && (
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 mx-1" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 mx-1" />
            )}
            {ticker.change24h.toFixed(2)}%
          </span>
        )}
      </CardHeader>
      <CardContent>
        {ticker ? (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={ticker.price}
                initial={{ opacity: 0.7, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight"
              >
                $
                {ticker.price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? "0.00"}
              </motion.div>
            </AnimatePresence>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>High: ${ticker.high24h?.toFixed(2) ?? "0.00"}</span>
              <span>Low: ${ticker.low24h?.toFixed(2) ?? "0.00"}</span>
            </div>
          </div>
        ) : (
          <div className="h-16 flex items-center justify-center">
            <span className="text-xs text-slate-400 animate-pulse">
              Awaiting live feed...
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
