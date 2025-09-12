// /components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

export default function Header() {
  const pathname = usePathname() || "/";
  const onDashboard = pathname.includes("/dashboard");
  const t = useTranslations("nav");
  const locale = (useLocale() || "en") as string;

  return (
    <header className="flex items-center justify-between py-6">
      {/* Brand */}
      <Link
        href={`/${locale}`}
        className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white"
      >
        <Image src="/logo.png" alt="Talent Paper logo" width={36} height={36} priority />
        {t("brand")}
      </Link>

      {/* Nav (hash links -> plain anchors) */}
      <nav className="hidden gap-6 md:flex">
        <a href="#how" className="text-white hover:opacity-80">{t("how")}</a>
        <a href="#features" className="text-white hover:opacity-80">{t("features")}</a>
        <a href="#templates" className="text-white hover:opacity-80">{t("templates")}</a>
        <a href="#pricing" className="text-white hover:opacity-80">{t("pricing")}</a>
        <a href="#faq" className="text-white hover:opacity-80">{t("faq")}</a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        {onDashboard ? (
          <Link
            href={`/${locale}`}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            {t("home")}
          </Link>
        ) : (
          <>
            <Link
              href={`/${locale}/auth/sign-in`}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
            >
              {t("signin")}
            </Link>
            <Link
              href={`/${locale}/auth/sign-up`}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:opacity-90"
            >
              {t("signup")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
