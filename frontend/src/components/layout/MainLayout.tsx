import Header from "./Header";
import UrlBar from "./UrlBar";
import Sidebar from "../sidebar/Sidebar";
import Visualization from "../visualization/Visualization";
import DetailsPanel from "../panels/DetailsPanel";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page Container */}
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col p-6">

        {/* Header */}
        <Header />

        {/* URL Bar */}
        <div className="mt-6">
          <UrlBar />
        </div>

        {/* Main Content */}
        <div className="mt-6 flex flex-1 gap-6">

          {/* Sidebar */}
          <aside className="w-72">
            <Sidebar />
          </aside>

          {/* Visualization */}
          <main className="flex flex-1 flex-col gap-6">

            <section className="flex-1">
              <Visualization />
            </section>

            <section className="h-72">
              <DetailsPanel />
            </section>

          </main>

        </div>

      </div>
    </div>
  );
}