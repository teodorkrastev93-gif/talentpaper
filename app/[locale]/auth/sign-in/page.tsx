"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { signIn } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const locale = useLocale() as string;
  const t = useTranslations("auth");
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-bold">{t("signin")}</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const res = signIn(email);
          if (!res.ok) return setErr(res.error || "Error");
          router.push(`/${locale}/dashboard`);
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none placeholder:text-white/50"
        />
        {err && <p className="text-sm text-red-300">{err}</p>}
        <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-emerald-900">
          {t("continue")}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-white/80">
        <Link href={`/${locale}/auth/forgot-password`} className="hover:opacity-80">
          {t("forgot")}
        </Link>
      </div>
      <div className="mt-2 text-center text-sm text-white/80">
        {t("noAccount")}{" "}
        <Link href={`/${locale}/auth/sign-up`} className="font-semibold hover:opacity-80">
          {t("createOne")}
        </Link>
      </div>
    </div>
  );
}
