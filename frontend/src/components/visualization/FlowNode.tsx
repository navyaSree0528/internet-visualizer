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
    <div className="relative flex flex-col items-center">
      {/* Connection Line */}
      <div
        className="absolute top-full h-10 w-1 rounded-full transition-all duration-500"
        style={{
          background: active
            ? "var(--primary)"
            : "var(--border)",
        }}
      />

      {/* Card */}
      <div
        className={`w-72 rounded-2xl border p-5 transition-all duration-500 ${
          active
            ? "scale-105 shadow-2xl"
            : "hover:scale-[1.02]"
        }`}
        style={{
          background: "var(--surface)",
          borderColor: active
            ? "var(--primary)"
            : "var(--border)",
          boxShadow: active
            ? "0 20px 45px rgba(191,109,69,0.25)"
            : "0 10px 25px var(--shadow)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
              active ? "animate-pulse" : ""
            }`}
            style={{
              background: active
                ? "var(--primary)"
                : "rgba(191,109,69,0.12)",
            }}
          >
            <Icon
              size={26}
              color={
                active ? "#fff" : "var(--primary)"
              }
            />
          </div>

          {/* Status */}
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: active
                ? "rgba(34,197,94,.12)"
                : "rgba(148,163,184,.12)",
              color: active
                ? "#16a34a"
                : "#64748b",
            }}
          >
            {active ? "ACTIVE" : "WAITING"}
          </span>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h3
            className="text-lg font-semibold transition-all"
            style={{
              color: active
                ? "var(--primary-dark)"
                : "var(--text)",
            }}
          >
            {title}
          </h3>

          <p
            className="mt-2 text-sm leading-6"
            style={{
              color: "var(--text-light)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <span
            className="text-xs uppercase tracking-wider"
            style={{
              color: "var(--text-light)",
            }}
          >
            Network Stage
          </span>

          <span
            className="text-sm font-semibold"
            style={{
              color: active
                ? "var(--primary)"
                : "var(--text)",
            }}
          >
            {active ? "Running..." : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}