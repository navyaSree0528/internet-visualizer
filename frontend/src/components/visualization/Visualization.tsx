import FlowNode from "./FlowNode";
import { networkStages } from "../../data/networkStages";

interface VisualizationProps {
  activeStage: number;
}

export default function Visualization({
  activeStage,
}: VisualizationProps) {
  return (
    <section
      className="h-full rounded-3xl border"
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
          Every request travels through these stages.
        </p>
      </div>

      {/* Flow */}
      <div
        className="flex h-[700px] flex-col items-center gap-8 overflow-auto p-10"
        style={{
          background: "var(--surface)",
        }}
      >
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
    </section>
  );
}