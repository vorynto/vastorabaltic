import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { defaultContent, defaultSettings, SiteContent, SiteSettings } from "./defaultContent";

export type Enquiry = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  created_at?: string;
};

type LocalStore = {
  settings: SiteSettings;
  content: SiteContent;
  enquiries: Enquiry[];
};

// On serverless (Vercel etc.) the project dir is read-only; /tmp is writable.
const dataFile = path.join(
  process.env.NODE_ENV === "production" ? "/tmp" : process.cwd(),
  "local-data.json"
);

// Uses the publishable (anon) key for reads — RLS allows anon to read
// site_settings and site_content. Writes go through the API routes which
// use the authenticated SSR client so RLS allows writes too.
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function readLocal(): Promise<LocalStore> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return {
      settings: defaultSettings,
      content: defaultContent,
      enquiries: []
    };
  }
}

async function writeLocal(store: LocalStore) {
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = publicClient();

  if (supabase) {
    const { data } = await supabase
      .from("site_settings")
      .select("settings")
      .eq("id", "global")
      .single();

    if (data?.settings) {
      return { ...defaultSettings, ...(data.settings as SiteSettings) };
    }
  }

  const local = await readLocal();
  return { ...defaultSettings, ...local.settings };
}

// Local-file fallback only — Supabase writes are handled by the API routes
// using the authenticated SSR client so the user's session grants write access.
export async function saveSettings(settings: SiteSettings) {
  const nextSettings = { ...defaultSettings, ...settings };
  const local = await readLocal();
  local.settings = nextSettings;
  await writeLocal(local);
  return nextSettings;
}

export async function getContent(): Promise<SiteContent> {
  const supabase = publicClient();

  if (supabase) {
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "global")
      .single();

    if (data?.content) {
      return { ...defaultContent, ...(data.content as SiteContent) };
    }
  }

  const local = await readLocal();
  return { ...defaultContent, ...local.content };
}

export async function saveContent(content: SiteContent) {
  const nextContent = { ...defaultContent, ...content };
  const local = await readLocal();
  local.content = nextContent;
  await writeLocal(local);
  return nextContent;
}

// Requires an authenticated client — anon role cannot read enquiries (RLS).
// Callers must pass the SSR supabase client from their route/page context.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function listEnquiries(supabase: any): Promise<Enquiry[]> {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch {
    const local = await readLocal();
    return local.enquiries.sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  }
}

export async function createEnquiry(enquiry: Enquiry) {
  const payload = {
    ...enquiry,
    created_at: new Date().toISOString()
  };
  const supabase = publicClient();

  if (supabase) {
    const { data, error } = await supabase.from("enquiries").insert(payload).select().single();
    if (error) {
      throw error;
    }
    return data as Enquiry;
  }

  const local = await readLocal();
  local.enquiries.push({ ...payload, id: crypto.randomUUID() });
  await writeLocal(local);
  return payload;
}

