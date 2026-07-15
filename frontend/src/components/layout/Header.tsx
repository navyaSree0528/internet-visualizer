import {
  Globe,
  Settings,
  ExternalLink,
} from "lucide-react";

export default function Header() {
  return (
    <header
      className="flex items-center justify-between rounded-3xl border px-8 py-6"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 8px 25px var(--shadow)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-5">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: "#F8E7DA",
            color: "var(--primary)",
          }}
        >
          <ExternalLink size={18} />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1
              className="text-4xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Internet Visualizer
            </h1>

            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "#EEF3E4",
                color: "var(--success)",
              }}
            >
              v0.1 ALPHA
            </span>
          </div>

          <p
            className="mt-2 text-base"
            style={{ color: "var(--text-light)" }}
          >
            Visualize every network request from browser to server.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 rounded-2xl border px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "white",
            borderColor: "var(--border)",
          }}
        >
          <ExternalLink size={18} />
          GitHub
        </button>

        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "white",
            borderColor: "var(--border)",
          }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}