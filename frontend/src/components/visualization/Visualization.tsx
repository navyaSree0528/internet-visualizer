import FlowNode from "./FlowNode";
import { networkStages } from "../../data/networkStages";

export default function Visualization() {
  return (
    <section className="h-full rounded-3xl border bg-white shadow-sm">

      <div className="border-b p-6">

        <h2 className="text-2xl font-semibold">
          Request Journey
        </h2>

        <p className="mt-2 text-gray-500">
          Every request travels through these stages.
        </p>

      </div>

      <div className="flex h-[700px] flex-col items-center gap-8 overflow-auto p-10">

        {networkStages.map((stage, index) => (
          <FlowNode
            key={stage.id}
            title={stage.title}
            description={stage.description}
            icon={stage.icon}
            active={index === 0}
          />
        ))}

      </div>

    </section>
  );
}