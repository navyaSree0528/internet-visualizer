export default function DetailsPanel() {
  return (
    <section className="h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">

      <div className="border-b border-slate-800 px-6 py-4">

        <h2 className="text-lg font-semibold text-white">
          Stage Details
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Information about the currently selected networking stage.
        </p>

      </div>

      <div className="flex h-[calc(100%-73px)] items-center justify-center px-8">

        <div className="text-center">

          <div className="mb-4 text-6xl text-slate-700">
            ◎
          </div>

          <h3 className="text-lg font-medium text-white">
            No Stage Selected
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
            After running a simulation, selecting any stage from the sidebar
            will display protocol explanations, timings, packets exchanged,
            headers, and networking concepts here.
          </p>

        </div>

      </div>

    </section>
  );
}