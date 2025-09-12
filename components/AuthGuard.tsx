"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <div className="text-xl font-semibold">Please sign in to continue</div>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/auth/sign-in" className="rounded-xl bg-white px-4 py-2 text-emerald-900 font-semibold">Sign in</Link>
          <Link href="/auth/sign-up" className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20">Create account</Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}