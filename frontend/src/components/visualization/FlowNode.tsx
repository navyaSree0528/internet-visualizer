import {
  Globe,
  Search,
  Network,
  Shield,
  ArrowRightLeft,
  GitBranch,
  Server,
  Database,
  HardDrive,
  Monitor,
  ArrowLeft,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Globe,
  Search,
  Network,
  Shield,
  ArrowRightLeft,
  GitBranch,
  Server,
  Database,
  HardDrive,
  Monitor,
  ArrowLeft,
};

interface FlowNodeProps {
  title: string;
  description: string;
  icon: keyof typeof icons;
  active?: boolean;
}

export default function FlowNode({
  title,
  description,
  icon,
  active = false,
}: FlowNodeProps) {
  const Icon = icons[icon];

  return (
    <div
      className={`w-64 rounded-2xl border p-5 transition-all duration-300 ${
        active ? "scale-105" : ""
      }`}
      style={{
        background: active ? "#FFF4EA" : "white",
        borderColor: active ? "#E8A07C" : "#E6DED2",
        boxShadow: active
          ? "0 12px 35px rgba(232,160,124,.25)"
          : "0 8px 24px rgba(0,0,0,.05)",
      }}
    >
      <div className="flex items-center gap-4">

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: active ? "#E8A07C" : "#F5F2ED",
          }}
        >
          <Icon
            size={22}
            color={active ? "white" : "#827148"}
          />
        </div>

        <div>

          <h3
            className="font-semibold"
            style={{ color: "#2E2A25" }}
          >
            {title}
          </h3>

          <p
            className="mt-1 text-sm"
            style={{ color: "#80786D" }}
          >
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}