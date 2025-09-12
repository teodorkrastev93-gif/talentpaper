export type CV = {
    id: string;
    user: string;     // email
    title: string;
    data: {
      name?: string;
      headline?: string;
      summary?: string;
      experience?: string;
    };
    updatedAt: string;
  };
  
  const CVS_KEY = "talentpaper:cvs";
  
  function readAll(): CV[] {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(CVS_KEY) || "[]"); }
    catch { return []; }
  }
  function writeAll(list: CV[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(CVS_KEY, JSON.stringify(list));
  }
  
  export function listCVs(userEmail: string): CV[] {
    return readAll().filter(c => c.user === userEmail);
  }
  
  export function getCV(id: string): CV | null {
    return readAll().find(c => c.id === id) || null;
  }
  
  export function createCV(userEmail: string, title = "Untitled CV"): CV {
    const id =
      (globalThis.crypto && "randomUUID" in globalThis.crypto)
        ? (globalThis.crypto as Crypto).randomUUID()
        : String(Date.now());
    const cv: CV = {
      id,
      user: userEmail,
      title,
      data: {},
      updatedAt: new Date().toISOString()
    };
    const all = readAll();
    all.push(cv);
    writeAll(all);
    return cv;
  }
  
  export function updateCV(id: string, patch: Partial<CV>): CV | null {
    const all = readAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;
    all[idx] = {
      ...all[idx],
      ...patch,
      data: { ...all[idx].data, ...(patch.data || {}) },
      updatedAt: new Date().toISOString()
    };
    writeAll(all);
    return all[idx];
  }
  