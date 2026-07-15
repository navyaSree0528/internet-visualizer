import { Link2, ArrowRight } from "lucide-react";

export default function UrlBar() {
  return (
    <section
      className="rounded-3xl border p-5"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 8px 25px var(--shadow)",
      }}
    >
      <div className="flex items-center gap-4">

        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "#F8E7DA",
            color: "var(--primary)",
          }}
        >
          <Link2 size={20} />
        </div>

        <input
          defaultValue="https://google.com"
          className="flex-1 rounded-2xl border px-5 py-4 text-lg outline-none"
          style={{
            borderColor: "var(--border)",
          }}
        />

        <button
          className="flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "var(--primary)",
          }}
        >
          Analyze

          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}