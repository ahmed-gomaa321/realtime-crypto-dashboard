"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CryptoTicker, ConnectionStatus } from "@/models/crypto";
import { sanitizeNumeric, sanitizeSymbol } from "@/lib/sanitize";

const WS_URL =
  "wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/solusdt@ticker";

export function useCryptoWebSocket() {
  const [tickers, setTickers] = useState<Record<string, CryptoTicker>>({});
  const [status, setStatus] = useState<ConnectionStatus>("CONNECTING");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const connect = useCallback(() => {
    try {
      setStatus("CONNECTING");
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setStatus("CONNECTED");

      ws.onmessage = (event) => {
        try {
          const rawData = JSON.parse(event.data);
          if (!rawData.s) return;

          const symbol = sanitizeSymbol(rawData.s);
          const newTicker: CryptoTicker = {
            symbol,
            price: sanitizeNumeric(rawData.c),
            change24h: sanitizeNumeric(rawData.P),
            high24h: sanitizeNumeric(rawData.h),
            low24h: sanitizeNumeric(rawData.l),
            volume: sanitizeNumeric(rawData.v),
            timestamp: Date.now(),
          };

          setTickers((prev) => ({ ...prev, [symbol]: newTicker }));
        } catch {
          // Ignore bad payloads securely
        }
      };

      ws.onerror = () => setStatus("ERROR");

      ws.onclose = () => {
        setStatus("DISCONNECTED");
        reconnectTimeoutRef.current = setTimeout(() => connect(), 5000);
      };
    } catch {
      setStatus("ERROR");
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  return { tickers, status };
}
