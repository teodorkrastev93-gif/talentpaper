// /components/i18n/LanguageSwitcher.tsx
"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";

const SUPPORTED = ["en","bg","ro","es","fr","de"] as const;
type Locale = typeof SUPPORTED[number];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname() || "/";
  const router = useRouter();

  function switchTo(next: Locale) {
    const parts = pathname.split("/").filter(Boolean);
    if (SUPPORTED.includes(parts[0] as Locale)) parts[0] = next;
    else parts.unshift(next);
    router.push("/" + parts.join("/"));
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchTo(e.target.value as Locale)}
      className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
    >
      {SUPPORTED.map((l) => (
        <option key={l} value={l} className="bg-emerald-800">
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
