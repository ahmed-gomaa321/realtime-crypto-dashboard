"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  currentPrice?: number;
  symbol: string;
}

export function PriceChart({ currentPrice, symbol }: Props) {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentPrice) return;
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setData((prev) =>
      [...prev, { time: timeStr, price: currentPrice }].slice(-20),
    );
  }, [currentPrice]);

  return (
    <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 backdrop-blur-xl col-span-full lg:col-span-2 shadow-sm dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Real-Time Price Chart ({symbol})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-65 sm:h-80 w-full">
          {mounted && data.length > 1 ? (
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  fontSize={11}
                  stroke="#64748b"
                  tickLine={false}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  fontSize={11}
                  hide
                  stroke="#64748b"
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                  }}
                  formatter={(value) => [
                    `$${Number(value ?? 0).toLocaleString()}`,
                    "Price",
                  ]}
                />
                <Area
                  dataKey="price"
                  fill="url(#colorPrice)"
                  fillOpacity={1}
                  stroke="#6366f1"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              Gathering live price points...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
