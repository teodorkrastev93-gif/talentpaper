"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { getUser } from "@/lib/auth";
import { getCV, updateCV, createCV, CV } from "@/lib/cv";
import jsPDF from "jspdf";

export default function BuilderPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const locale = useLocale() as string;

  const [cv, setCv] = useState<CV | null>(null);

  useEffect(() => {
    // If someone visited /builder/new directly, create and replace
    if (id === "new") {
      const email = getUser()?.email;
      if (!email) return;
      const created = createCV(email, "Resume");
      window.location.replace(`/${locale}/builder/${created.id}`);
      return;
    }
    const existing = getCV(id);
    setCv(existing);
  }, [id, locale]);

  function save(field: keyof CV["data"], value: string) {
    if (!cv) return;
    const updated = updateCV(cv.id, { data: { [field]: value } as any });
    if (updated) setCv(updated);
  }

  function downloadPDF() {
    if (!cv) return;
    const doc = new jsPDF();
    const line = (t: string, y: number, size = 12, bold = false) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(t, 20, y);
      return y + size + 4;
    };

    let y = 20;
    y = line(cv.data.name || "Your Name", y, 18, true);
    y = line(cv.data.headline || "Job Title", y, 12);
    y = line("Summary", y + 6, 14, true);
    y = line(cv.data.summary || "-", y);
    y = line("Experience", y + 6, 14, true);
    const exp = (cv.data.experience || "-").split("\n");
    exp.forEach(row => { y = line(row, y); });

    doc.save(`${cv.title || "resume"}.pdf`);
  }

  if (!cv) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left: form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold">CV Builder</h1>

        <label className="mt-6 block text-sm text-white/70">Name</label>
        <input
          value={cv.data.name || ""}
          onChange={(e) => save("name", e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />

        <label className="mt-4 block text-sm text-white/70">Headline</label>
        <input
{/* Skills */}
        <label className="mt-4 block text-sm text-white/70">Skills (comma separated)</label>
        <input
          value={(cv.data.skills || []).join(", ")}
          onChange={(e) => save("skills", e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />
        {/* Education */}
        <label className="mt-4 block text-sm text-white/70">Education</label>
        <input
          value={cv.data.education || ""}
          onChange={(e) => save("education", e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />
        {/* Photo */}
        <label className="mt-4 block text-sm text-white/70">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                save("photo", reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />
        {/* Template */}
        <label className="mt-4 block text-sm text-white/70">Template</label>
        <select
          value={cv.data.template || "classic"}
          onChange={(e) => save("template", e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-black outline-none"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
        </select>
        {/* Generate summary button */}
        <button
          type="button"
          onClick={() => {
            const skills = cv.data.skills || [];
            const head = cv.data.headline || "";
            const summary = `${head ? head + '. ' : ''}Skilled in ${skills.join(", ")}.`;
            save("summary", summary);
          }}
          className="mt-4 rounded-xl bg-green-700 px-4 py-2 text-white"
        >
          Generate Summary
        </button>
          value={cv.data.headline || ""}
          onChange={(e) => save("headline", e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />

        <label className="mt-4 block text-sm text-white/70">Summary</label>
        <textarea
          value={cv.data.summary || ""}
          onChange={(e) => save("summary", e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />

        <label className="mt-4 block text-sm text-white/70">Experience</label>
        <textarea
          value={cv.data.experience || ""}
          onChange={(e) => save("experience", e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 outline-none"
        />

        <button id="download" onClick={downloadPDF} className="mt-6 rounded-xl bg-white px-4 py-2 font-semibold text-emerald-900">
          Download PDF
        </button>
      </div>

      {/* Right: simple preview */}
      <div className="rounded-2xl border border-white/10 bg-white p-6 text-emerald-900">
        <div className="text-3xl font-extrabold">{cv.data.name || "Your Name"}</div>
        <div className="mt-1 text-lg">{cv.data.headline || "Job Title"}</div>
        <hr className="my-4" />
        <div className="font-semibold">Summary</div>
        <p className="mt-1 whitespace-pre-wrap">{cv.data.summary || "—"}</p>
        <div className="mt-4 font-semibold">Experience</div>
        <p className="mt-1 whitespace-pre-wrap">{cv.data.experience || "—"}</p>
      </div>
    </div>
  );
}
