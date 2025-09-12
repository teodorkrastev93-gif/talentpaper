export default function Pricing() {
  const plans = [
    { name: "Free", price: "€0", features: ["1 template", "Basic export", "Email support"] },
    { name: "Pro", price: "€9", features: ["All templates", "Unlimited downloads", "Cover letters", "Priority support"] },
  ];
  return (
    <section id="pricing" className="py-16">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xl font-semibold">{p.name}</div>
            <div className="mt-2 text-4xl font-extrabold">{p.price}<span className="text-base font-normal text-white/70">/mo</span></div>
            <ul className="mt-4 space-y-2 text-white/80">
              {p.features.map((f) => (<li key={f}>• {f}</li>))}
            </ul>
            <a href="/auth/sign-up" className="mt-6 inline-block rounded-xl bg-white text-emerald-900 px-4 py-2 font-semibold">Get started</a>
          </div>
        ))}
      </div>
    </section>
  );
}