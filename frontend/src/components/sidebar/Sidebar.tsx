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

export default function Sidebar() {
  return (
    <aside className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Request Flow
      </h2>

      <nav className="space-y-2">
        {stages.map((stage, index) => (
          <button
            key={stage}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-slate-800"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 text-xs text-slate-400">
              {index + 1}
            </span>

            <span className="text-sm text-slate-300">
              {stage}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}