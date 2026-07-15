import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import { networkStages } from "./data/networkStages";

export default function App() {
  const [url, setUrl] = useState("https://google.com");
  const [activeStage, setActiveStage] = useState(-1);
  const [selectedStage, setSelectedStage] = useState(-1);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startSimulation = async () => {
    if (simulationRunning) return;

    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      new URL(url);
    } catch {
      alert("Please enter a valid URL.");
      return;
    }

    setSimulationRunning(true);

    for (let i = 0; i < networkStages.length; i++) {
      setActiveStage(i);
      setSelectedStage(i);
      await delay(1000);
    }

    setSimulationRunning(false);
  };

  return (
    <MainLayout
      url={url}
      setUrl={setUrl}
      activeStage={activeStage}
      selectedStage={selectedStage}
      setSelectedStage={setSelectedStage}
      simulationRunning={simulationRunning}
      startSimulation={startSimulation}
    />
  );
}