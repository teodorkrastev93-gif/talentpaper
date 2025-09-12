"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import AuthGuard from "@/components/AuthGuard";
import { getUser, signOut } from "@/lib/auth";
import { listCVs, createCV, CV } from "@/lib/cv";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const t = useTranslations("dashboard");
  const locale = useLocale() as string;
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    const em = u?.email ?? null;
    setEmail(em);
    if (em) setCvs(listCVs(em));
  }, []);

  function handleCreate() {
    if (!email) return;
    const newCv = createCV(email, `Resume ${cvs.length + 1}`);
    setCvs(listCVs(email)); // refresh
    router.push(`/${locale}/builder/${newCv.id}`);
  }

  return (
    <AuthGuard>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <button
            onClick={() => { signOut(); router.push(`/${locale}`); }}
            className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            {t("signout")}
          </button>
        </div>
        <p className="mt-2 text-white/80">
          {t("welcome")}{email ? `, ${email}` : ""}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {cvs.map((cv) => (
            <div key={cv.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{cv.title}</div>
                  <div className="text-sm text-white/70">Updated {new Date(cv.updatedAt).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/${locale}/builder/${cv.id}`} className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20">Edit</Link>
                  <Link href={`/${locale}/builder/${cv.id}#download`} className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20">Download</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button onClick={handleCreate} className="rounded-xl bg-white px-4 py-2 font-semibold text-emerald-900">
            {t("createNew")}
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
