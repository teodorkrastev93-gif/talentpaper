export default function HowItWorks() {
  const steps = [
    { title: "Choose a template", desc: "Pick from minimal, creative, or ATS‑ready styles." },
    { title: "Fill details with AI help", desc: "Import data or let AI suggest bullet points." },
    { title: "Download instantly", desc: "Export PDF/DOCX and share anywhere." },
  ];
  return (
    <section id="how" className="py-16">
      <h2 className="text-3xl font-bold">How it works</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-emerald-200 text-sm">Step {i + 1}</div>
            <div className="mt-2 text-xl font-semibold">{s.title}</div>
            <p className="mt-2 text-white/80">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}