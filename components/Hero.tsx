import Link from "next/link";
import {useTranslations} from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="grid items-center gap-10 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-5xl font-extrabold leading-tight">{t("title")}</h1>
        <p className="mt-4 text-white/80">{t("tagline")}</p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth/sign-up" className="rounded-2xl bg-white text-emerald-900 px-6 py-3 font-semibold">{t("ctaCreate")}</Link>
          <a href="#templates" className="rounded-2xl bg-white/10 px-6 py-3 hover:bg-white/20">{t("ctaSee")}</a>
        </div>
      </div>
      <div className="rounded-3xl border border-white/20 bg-white/5 p-6 shadow-xl backdrop-blur">
        <div className="grid grid-cols-3 gap-4">
          {["Minimal","Blue","Green","Light","Creative","ATS"].map((t)=> (
            <div key={t} className="rounded-2xl bg-white/10 p-8 text-center text-white/80">{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}