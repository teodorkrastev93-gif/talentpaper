export default function Testimonials() {
  const items = [
    { name: "Mila P.", quote: "Got interviews the same week!" },
    { name: "Alex R.", quote: "AI bullet points saved me hours." },
    { name: "Teo K.", quote: "Clean, ATS‑friendly, and fast." },
  ];
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold">What users say</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/90">“{t.quote}”</p>
            <div className="mt-4 text-sm text-white/70">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}