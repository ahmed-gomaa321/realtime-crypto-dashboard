"use client";

import { ConnectionStatus as StatusType } from "@/models/crypto";
import { Badge } from "@/components/ui/badge";

interface Props {
  status: StatusType;
}

export function ConnectionStatusBadge({ status }: Props) {
  // نصوص افتراضية بديلة لـ useTranslations
  const labels: Record<StatusType, string> = {
    CONNECTED: "Connected",
    CONNECTING: "Connecting...",
    DISCONNECTED: "Disconnected",
    ERROR: "Connection Error",
  };

  const config: Record<StatusType, { label: string; color: string }> = {
    CONNECTED: {
      label: labels.CONNECTED,
      color:
        "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    CONNECTING: {
      label: labels.CONNECTING,
      color:
        "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    DISCONNECTED: {
      label: labels.DISCONNECTED,
      color:
        "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    },
    ERROR: {
      label: labels.ERROR,
      color:
        "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    },
  };

  const current = config[status] || config.DISCONNECTED;

  return (
    <div role="status" aria-live="polite">
      <Badge
        variant="outline"
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${current.color}`}
      >
        <span
          className={`mr-1.5 ml-1.5 h-2 w-2 rounded-full inline-block ${
            status === "CONNECTED"
              ? "bg-emerald-400 animate-pulse"
              : "bg-current opacity-70"
          }`}
        />
        {current.label}
      </Badge>
    </div>
  );
}
