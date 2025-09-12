"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const t = useTranslations("auth");

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-bold">{t("forgotPassword")}</h1>
      {sent ? (
        <p className="mt-4 text-white/80">
          {t("resetSent")}: <span className="font-semibold">{email}</span>
        </p>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
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
            {t("sendReset")}
          </button>
        </form>
      )}
      <div className="mt-4 text-center text-sm text-white/80">
        <Link href="/auth/sign-in" className="hover:opacity-80">
          {t("backToSignin")}
        </Link>
      </div>
    </div>
  );
}
