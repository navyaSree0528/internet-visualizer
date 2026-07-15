import FlowNode from "./FlowNode";
import { networkStages } from "../../data/networkStages";

interface VisualizationProps {
  activeStage: number;
}

export default function Visualization({
  activeStage,
}: VisualizationProps) {
  const progress =
    activeStage < 0
      ? 0
      : ((activeStage + 1) / networkStages.length) * 100;

  return (
    <section
      className="flex h-full flex-col rounded-3xl border overflow-hidden"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 10px 30px var(--shadow)",
      }}
    >
      {/* Header */}
      <div
        className="border-b p-6"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              Request Journey
            </h2>

            <p
              className="mt-2"
              style={{
                color: "var(--text-light)",
              }}
            >
              Watch the request travel through every networking layer.
            </p>
          </div>

          <div className="text-right">
            <div
              className="text-sm"
              style={{
                color: "var(--text-light)",
              }}
            >
              Progress
            </div>

            <div
              className="text-xl font-bold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-5 h-2 overflow-hidden rounded-full"
          style={{
            background: "var(--border)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: "var(--primary)",
            }}
          />
        </div>
      </div>

      {/* Current Stage */}
      <div
        className="border-b px-6 py-3"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            style={{
              color: "var(--text-light)",
            }}
          >
            Current Stage
          </span>

          <span
            className="font-semibold"
            style={{
              color: "var(--primary-dark)",
            }}
          >
            {activeStage >= 0
              ? networkStages[activeStage].title
              : "Waiting..."}
          </span>
        </div>
      </div>

      {/* Flow */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background: "linear-gradient(to bottom,#faf8f4,#f5f2ec)",
        }}
      >
        <div className="flex flex-col items-center gap-10 py-10">
          {networkStages.map((stage, index) => (
            <FlowNode
              key={stage.id}
              title={stage.title}
              description={stage.description}
              icon={stage.icon}
              active={index === activeStage}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t px-6 py-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            style={{
              color: "var(--text-light)",
            }}
          >
            Stage
          </span>

          <span
            className="font-semibold"
            style={{
              color: "var(--primary-dark)",
            }}
          >
            {activeStage >= 0
              ? `${activeStage + 1} / ${networkStages.length}`
              : `0 / ${networkStages.length}`}
          </span>
        </div>
      </div>
    </section>
  );
}