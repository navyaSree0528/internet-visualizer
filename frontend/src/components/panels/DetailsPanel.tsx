export default function DetailsPanel() {
  return (
    <section
      className="h-full rounded-2xl border"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 10px 30px var(--shadow)",
      }}
    >
      {/* Header */}
      <div
        className="border-b px-6 py-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-lg font-semibold"
          style={{
            color: "var(--primary-dark)",
          }}
        >
          Stage Details
        </h2>

        <p
          className="mt-1 text-sm"
          style={{
            color: "var(--text-light)",
          }}
        >
          Information about the currently selected networking stage.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex h-[calc(100%-73px)] items-center justify-center px-8">
        <div className="text-center">
          <div
            className="mb-4 text-6xl"
            style={{
              color: "var(--accent)",
            }}
          >
            ◎
          </div>

          <h3
            className="text-lg font-medium"
            style={{
              color: "var(--primary-dark)",
            }}
          >
            No Stage Selected
          </h3>

          <p
            className="mt-2 max-w-lg text-sm leading-6"
            style={{
              color: "var(--text-light)",
            }}
          >
            After running a simulation, selecting any stage from the sidebar
            will display protocol explanations, timings, packets exchanged,
            headers, and networking concepts here.
          </p>
        </div>
      </div>
    </section>
  );
}