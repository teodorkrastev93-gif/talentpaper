"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { register } from "@/lib/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const locale = useLocale() as string;
  const t = useTranslations("auth");

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-bold">{t("createAccount")}</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          register(email);
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
        <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-emerald-900">
          {t("createAccount")}
        </button>
      </form>
      <div className="mt-2 text-center text-sm text-white/80">
        {t("haveAccount")}{" "}
        <Link href={`/${locale}/auth/sign-in`} className="font-semibold hover:opacity-80">
          {t("signin")}
        </Link>
      </div>
    </div>
  );
}
