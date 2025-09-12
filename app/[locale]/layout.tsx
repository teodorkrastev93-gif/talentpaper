import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {NextIntlClientProvider} from "next-intl";

const SUPPORTED = ["en","bg","ro","es","fr","de"] as const;

export function generateStaticParams() {
  return SUPPORTED.map((l) => ({locale: l}));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-10">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
