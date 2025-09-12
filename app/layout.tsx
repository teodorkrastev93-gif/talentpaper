import "../styles/globals.css";

export const metadata = {
  title: "Talent Paper — Simplify Your Job Search | Unlock Your Next Opportunity",
  description: "Beautiful templates, AI help, instant download."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        {children}
      </body>
    </html>
  );
}
