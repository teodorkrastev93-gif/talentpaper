export default function FAQ() {
  const qas = [
    { q: "Can I edit after download?", a: "Yes, export to DOCX or re‑open your project and export again." },
    { q: "Do you support multiple languages?", a: "Yes: EN, BG, RO, ES, FR, DE." },
    { q: "What is ATS?", a: "Applicant Tracking System. Our layouts are parse‑friendly." },
  ];
  return (
    <section id="faq" className="py-16">
      <h2 className="text-3xl font-bold">FAQ</h2>
      <div className="mt-6 space-y-4">
        {qas.map((item) => (
          <details key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <summary className="cursor-pointer text-lg font-semibold">{item.q}</summary>
            <p className="mt-2 text-white/80">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}