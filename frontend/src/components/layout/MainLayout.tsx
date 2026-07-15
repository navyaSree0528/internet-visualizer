import Header from "./Header";
import UrlBar from "./UrlBar";
import Sidebar from "../sidebar/Sidebar";
import Visualization from "../visualization/Visualization";
import DetailsPanel from "../panels/DetailsPanel";
import type { Dispatch, SetStateAction } from "react";

interface MainLayoutProps {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;

  activeStage: number;

  selectedStage: number;
  setSelectedStage: Dispatch<SetStateAction<number>>;

  simulationRunning: boolean;

  startSimulation: () => Promise<void>;
}

export default function MainLayout({
  url,
  setUrl,
  activeStage,
  selectedStage,
  setSelectedStage,
  simulationRunning,
  startSimulation,
}: MainLayoutProps) {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "var(--bg)",
      }}
    >
      <div className="mx-auto flex max-w-[1700px] flex-col gap-6">
        {/* Header */}
        <Header />

        {/* URL Bar */}
        <UrlBar
          url={url}
          setUrl={setUrl}
          simulationRunning={simulationRunning}
          startSimulation={startSimulation}
        />

        {/* Main Workspace */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "260px 1fr 340px",
            minHeight: "72vh",
          }}
        >
          {/* Sidebar */}
          <Sidebar
            activeStage={activeStage}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
          />

          {/* Visualization */}
          <Visualization
            activeStage={activeStage}
          />

          {/* Details Panel */}
          <DetailsPanel
            activeStage={activeStage}
          />
        </div>
      </div>
    </div>
  );
}