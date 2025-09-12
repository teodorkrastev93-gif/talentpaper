export default function Features() {
  const items = [
    { title: "ATS‑friendly", desc: "Pass screenings with clean structure and keywords." },
    { title: "AI suggestions", desc: "Improve wording and quantify achievements." },
    { title: "Multi‑language", desc: "Build CVs in EN, BG, RO, ES, FR, DE." },
    { title: "Instant export", desc: "PDF and DOCX with one click." },
  ];
  return (
    <section id="features" className="py-16">
      <h2 className="text-3xl font-bold">Features</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {items.map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xl font-semibold">{f.title}</div>
            <p className="mt-2 text-white/80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}