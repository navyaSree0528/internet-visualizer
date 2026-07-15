import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 25px var(--shadow)",
      }}
    >
      {children}
    </div>
  );
}