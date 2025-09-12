import Link from "next/link";
import Image from "next/image";
import {useTranslations} from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="py-10 text-sm text-white/80">
      <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white font-semibold">
            <Image src="/logo.png" alt="Talent Paper logo" width={20} height={20} />
            Talent Paper
          </div>
          <p className="mt-2 text-white/70">Simplify Your Job Search — Unlock Your Next Opportunity.</p>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-2 space-y-2">
            <li><Link href="#" className="hover:opacity-80">{t("about")}</Link></li>
            <li><Link href="#" className="hover:opacity-80">{t("contact")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 space-y-2">
            <li><Link href="#" className="hover:opacity-80">{t("terms")}</Link></li>
            <li><Link href="#" className="hover:opacity-80">{t("privacy")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">{t("follow")}</div>
          <ul className="mt-2 space-y-2">
            <li><Link href="#" className="hover:opacity-80">Instagram</Link></li>
            <li><Link href="#" className="hover:opacity-80">LinkedIn</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-white/60">© {new Date().getFullYear()} Talent Paper. {t("rights")}</p>
    </footer>
  );
}