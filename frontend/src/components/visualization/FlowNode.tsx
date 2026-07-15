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
        background: "var(--surface)",
        borderColor: active ? "var(--primary)" : "var(--border)",
        boxShadow: active
          ? "0 12px 35px rgba(149,39,29,.15)"
          : "0 8px 24px var(--shadow)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: active
              ? "var(--primary)"
              : "rgba(231,123,73,0.12)",
          }}
        >
          <Icon
            size={22}
            color={active ? "white" : "var(--primary)"}
          />
        </div>

        <div>
          <h3
            className="font-semibold"
            style={{
              color: active
                ? "var(--primary-dark)"
                : "var(--text)",
            }}
          >
            {title}
          </h3>

          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--text-light)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}