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
        className="border-b px-6 py-5"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-semibold"
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
          Live information for the current networking stage.
        </p>
      </div>

      {!stage ? (
        <div className="flex h-[650px] items-center justify-center p-8">
          <div className="text-center">
            <h3
              className="text-xl font-semibold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              Ready
            </h3>

            <p
              className="mt-3 leading-7"
              style={{
                color: "var(--text-light)",
              }}
            >
              Press <strong>Analyze</strong> to start the
              visualization.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-6">
          {/* Title */}
          <div>
            <h3
              className="text-2xl font-bold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              {stage.title}
            </h3>

            <p
              className="mt-2 leading-7"
              style={{
                color: "var(--text-light)",
              }}
            >
              {stage.description}
            </p>
          </div>

          {/* Status */}
          <InfoCard
            title="Status"
            value="Completed"
          />

          <InfoCard
            title="Protocol"
            value={stage.protocol}
          />

          <InfoCard
            title="Port"
            value={stage.port}
          />

          <InfoCard
            title="Latency"
            value={stage.latency}
          />

          {/* Explanation */}
          <div
            className="rounded-xl border p-5"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <h4
              className="mb-3 font-semibold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              Explanation
            </h4>

            <p
              className="leading-7"
              style={{
                color: "var(--text-light)",
              }}
            >
              {stage.explanation}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
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
        {title}
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