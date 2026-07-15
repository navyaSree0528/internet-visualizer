import Header from "./Header";
import UrlBar from "./UrlBar";
import Sidebar from "../sidebar/Sidebar";
import Visualization from "../visualization/Visualization";
import DetailsPanel from "../panels/DetailsPanel";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="mx-auto flex max-w-[1700px] flex-col gap-5">

        {/* Header */}
        <Header />

        {/* URL */}
        <UrlBar />

        {/* Main Workspace */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "260px 1fr 340px",
            minHeight: "72vh",
          }}
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Visualization */}
          <Visualization />

          {/* Details */}
          <DetailsPanel />
        </div>

      </div>
    </div>
  );
}