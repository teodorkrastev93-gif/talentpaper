"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">{t("message")}</p>
      <Link
        href={`/${locale}`}
        className="mt-6 rounded-lg bg-white px-4 py-2 text-emerald-900 font-semibold"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
