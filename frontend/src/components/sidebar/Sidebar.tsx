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
        {stages.map((stage, index) => (
          <button
            key={stage}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(231,123,73,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold"
              style={{
                borderColor: "var(--border)",
                color: "var(--primary)",
                background: "rgba(149,39,29,0.05)",
              }}
            >
              {index + 1}
            </span>

            <span
              className="text-sm font-medium"
              style={{
                color: "var(--text)",
              }}
            >
              {stage}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}