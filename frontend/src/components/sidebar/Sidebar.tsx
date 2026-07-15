import type { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  activeStage: number;
  selectedStage: number;
  setSelectedStage: Dispatch<SetStateAction<number>>;
}

const stages = [
  "Browser",
  "DNS Lookup",
  "TCP Handshake",
  "TLS Handshake",
  "HTTP Request",
  "CDN",
  "Load Balancer",
  "API Server",
  "Redis Cache",
  "Database",
  "Response",
  "Browser Rendering",
];

export default function Sidebar({
  activeStage,
  selectedStage,
  setSelectedStage,
}: SidebarProps) {
  return (
    <aside
      className="h-full rounded-2xl border p-5"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 10px 30px var(--shadow)",
      }}
    >
      <h2
        className="mb-5 text-lg font-semibold"
        style={{
          color: "var(--primary-dark)",
        }}
      >
        Request Flow
      </h2>

      <nav className="space-y-2">
        {stages.map((stage, index) => {
          const active = index === activeStage;
          const selected = index === selectedStage;

          return (
            <button
              key={stage}
              onClick={() => setSelectedStage(index)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300"
              style={{
                background:
                  active || selected
                    ? "rgba(231,123,73,0.12)"
                    : "transparent",
                border:
                  active || selected
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold"
                style={{
                  borderColor: active
                    ? "var(--primary)"
                    : "var(--border)",
                  background: active
                    ? "var(--primary)"
                    : "rgba(149,39,29,0.05)",
                  color: active ? "#fff" : "var(--primary)",
                }}
              >
                {index + 1}
              </span>

              <span
                className="text-sm font-medium"
                style={{
                  color:
                    active || selected
                      ? "var(--primary-dark)"
                      : "var(--text)",
                }}
              >
                {stage}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}