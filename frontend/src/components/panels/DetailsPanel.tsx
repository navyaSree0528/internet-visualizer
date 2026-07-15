import { networkStages } from "../../data/networkStages";

interface DetailsPanelProps {
  activeStage: number;
}

export default function DetailsPanel({
  activeStage,
}: DetailsPanelProps) {
  const stage =
    activeStage >= 0 ? networkStages[activeStage] : null;

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
          Information about the currently active networking stage.
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {!stage ? (
          <div className="flex h-[500px] items-center justify-center">
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
                Ready to Start
              </h3>

              <p
                className="mt-2 text-sm"
                style={{
                  color: "var(--text-light)",
                }}
              >
                Click <strong>Analyze</strong> to begin the
                visualization.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3
                className="text-2xl font-semibold"
                style={{
                  color: "var(--primary-dark)",
                }}
              >
                {stage.title}
              </h3>

              <p
                className="mt-2"
                style={{
                  color: "var(--text-light)",
                }}
              >
                {stage.description}
              </p>
            </div>

            <div className="space-y-4">
              <InfoRow
                label="Status"
                value="Completed"
              />

              <InfoRow
                label="Protocol"
                value={
                  [
                    "Browser",
                    "DNS",
                    "TCP",
                    "TLS",
                    "HTTP",
                    "HTTP",
                    "HTTP",
                    "HTTP",
                    "Redis",
                    "SQL",
                    "HTTP",
                  ][activeStage]
                }
              />

              <InfoRow
                label="Latency"
                value={`${(activeStage + 1) * 12} ms`}
              />

              <InfoRow
                label="Stage"
                value={`${activeStage + 1} / ${
                  networkStages.length
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div
      className="flex items-center justify-between rounded-xl border p-4"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <span
        style={{
          color: "var(--text-light)",
        }}
      >
        {label}
      </span>

      <span
        className="font-semibold"
        style={{
          color: "var(--primary-dark)",
        }}
      >
        {value}
      </span>
    </div>
  );
}