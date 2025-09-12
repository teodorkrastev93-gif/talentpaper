export type User = { email: string };

const USERS_KEY = "talentpaper:users";
const CURRENT_KEY = "talentpaper:user";

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
}
function writeUsers(users: User[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CURRENT_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function register(email: string) {
  if (typeof window === "undefined") return { ok: false, error: "No window" };
  const users = readUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    users.push({ email });
    writeUsers(users);
  }
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ email }));
  return { ok: true };
}

export function signIn(email: string) {
  if (typeof window === "undefined") return { ok: false, error: "No window" };
  const users = readUsers();
  const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!match) return { ok: false, error: "Account not found" };
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ email }));
  return { ok: true };
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_KEY);
}
