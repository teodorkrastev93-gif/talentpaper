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
    // Create a new CV if we visit /builder/new
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

  function save(field: keyof CV["data"], value: any) {
    if (!cv) return;
    const updated = updateCV(cv.id, { data: { [field]: value } as any });
    if (updated) setCv(updated);
  }

  function generateSummary() {
    if (!cv) return;
    const { headline, skills } = cv.data;
    const summary = [headline, ...(skills || [])]
      .filter(Boolean)
      .join(" – ");
    save("summary", summary);
  }

  function downloadPDF() {
    if (!cv) return;
    const doc = new jsPDF();
    doc.text(cv.data.name || "", 10, 10);
    doc.text(cv.data.headline || "", 10, 20);
    doc.text(cv.data.summary || "", 10, 30);
    doc.text(cv.data.experience || "", 10, 40);
    doc.save("cv.pdf");
  }

  // Don’t render until CV is loaded
  if (!cv) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left column: Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold">CV Builder</h1>

        {/* Name */}
        <label className="mt-6 block text-sm text-white/70">Name</label>
        <input
          className="w-full rounded-md bg-white/10 p-2"
          value={cv.data.name || ""}
          onChange={(e) => save("name", e.target.value)}
        />

        {/* Headline */}
        <label className="mt-4 block text-sm text-white/70">Headline</label>
        <input
          className="w-full rounded-md bg-white/10 p-2"
          value={cv.data.headline || ""}
          onChange={(e) => save("headline", e.target.value)}
        />

        {/* Skills */}
        <label className="mt-4 block text-sm text-white/70">
          Skills (comma separated)
        </label>
        <input
          className="w-full rounded-md bg-white/10 p-2"
          value={(cv.data.skills || []).join(", ")}
          onChange={(e) =>
            save(
              "skills",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s)
            )
          }
        />

        {/* Education */}
        <label className="mt-4 block text-sm text-white/70">Education</label>
        <input
          className="w-full rounded-md bg-white/10 p-2"
          value={cv.data.education || ""}
          onChange={(e) => save("education", e.target.value)}
        />

        {/* Photo URL */}
        <label className="mt-4 block text-sm text-white/70">Photo URL</label>
        <input
          className="w-full rounded-md bg-white/10 p-2"
          value={cv.data.photo || ""}
          onChange={(e) => save("photo", e.target.value)}
        />

        {/* Template selection */}
        <label className="mt-4 block text-sm text-white/70">Template</label>
        <select
          className="w-full rounded-md bg-white/10 p-2"
          value={cv.data.template || "classic"}
          onChange={(e) => save("template", e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
        </select>

        {/* Generate Summary */}
        <button
          className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white"
          onClick={generateSummary}
        >
          Generate Summary
        </button>

        {/* Summary */}
        <label className="mt-4 block text-sm text-white/70">Summary</label>
        <textarea
          className="w-full rounded-md bg-white/10 p-2"
          rows={4}
          value={cv.data.summary || ""}
          onChange={(e) => save("summary", e.target.value)}
        />

        {/* Experience */}
        <label className="mt-4 block text-sm text-white/70">Experience</label>
        <textarea
          className="w-full rounded-md bg-white/10 p-2"
          rows={6}
          value={cv.data.experience || ""}
          onChange={(e) => save("experience", e.target.value)}
        />

        {/* Download button */}
        <button
          className="mt-6 rounded-md bg-green-600 px-4 py-2 text-white"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>

      {/* Right column: Preview */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">
          {cv.data.name || "Your Name"}
        </h2>
        <p className="text-sm text-white/70">{cv.data.headline}</p>

        {/* Photo preview if present */}
        {cv.data.photo && (
          <img
            src={cv.data.photo}
            alt="Photo"
            className="mt-4 h-32 w-32 rounded-full object-cover"
          />
        )}

        <h3 className="mt-4 font-semibold">Summary</h3>
        <p className="whitespace-pre-wrap">
          {cv.data.summary || "—"}
        </p>

        <h3 className="mt-4 font-semibold">Experience</h3>
        <p className="whitespace-pre-wrap">
          {cv.data.experience || "—"}
        </p>

        {cv.data.skills && (
          <>
            <h3 className="mt-4 font-semibold">Skills</h3>
            <ul className="list-disc pl-4">
              {cv.data.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </>
        )}

        {cv.data.education && (
          <>
            <h3 className="mt-4 font-semibold">Education</h3>
            <p>{cv.data.education}</p>
          </>
        )}
      </div>
    </div>
  );
}
