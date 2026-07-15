import { Link2, ArrowRight, Loader2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface UrlBarProps {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  simulationRunning: boolean;
  startSimulation: () => Promise<void>;
}

export default function UrlBar({
  url,
  setUrl,
  simulationRunning,
  startSimulation,
}: UrlBarProps) {
  return (
    <section
      className="rounded-3xl border p-5 transition-all duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 10px 30px var(--shadow)",
      }}
    >
      <div className="flex items-center gap-4">
        {/* URL Icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(231,123,73,0.12)",
            color: "var(--primary)",
          }}
        >
          <Link2 size={20} />
        </div>

        {/* Input */}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={simulationRunning}
          className="flex-1 rounded-2xl border px-5 py-4 text-lg outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          placeholder="Enter a website URL..."
        />

        {/* Analyze Button */}
        <button
          onClick={startSimulation}
          disabled={simulationRunning}
          className="flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          style={{
            background: "var(--primary)",
          }}
          onMouseEnter={(e) => {
            if (!simulationRunning) {
              e.currentTarget.style.background = "var(--primary-dark)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--primary)";
          }}
        >
          {simulationRunning ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Running...
            </>
          ) : (
            <>
              Analyze
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}