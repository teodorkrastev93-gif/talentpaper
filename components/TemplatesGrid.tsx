export default function TemplatesGrid() {
  const templates = ["Minimal","Modern","Classic","Creative","Blue","Green"];
  return (
    <section id="templates" className="py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">Templates</h2>
        <a href="/auth/sign-up" className="rounded-xl bg-white text-emerald-900 px-4 py-2 text-sm font-semibold">Start free</a>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {templates.map((t) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="aspect-[3/4] rounded-xl bg-white/10" />
            <div className="mt-3 font-semibold">{t}</div>
            <div className="text-sm text-white/70">ATS‑safe layout</div>
          </div>
        ))}
      </div>
    </section>
  );
}