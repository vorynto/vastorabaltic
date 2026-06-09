"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Palette, Plus, Save, Settings, Share2, TextCursorInput, Trash2, Inbox } from "lucide-react";
import { Enquiry } from "@/lib/data";
import { SiteContent, SiteSettings } from "@/lib/defaultContent";
import { createClient } from "@/lib/supabase/client";

type Tab = "settings" | "content" | "enquiries";

export function AdminPanel({
  initialContent,
  initialSettings,
  initialEnquiries
}: {
  initialContent: SiteContent;
  initialSettings: SiteSettings;
  initialEnquiries: Enquiry[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("settings");
  const [settings, setSettings] = useState(initialSettings);
  const [content, setContent] = useState(initialContent);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [notice, setNotice] = useState("");

  async function save(path: string, payload: unknown) {
    const response = await fetch(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setNotice(response.ok ? "Saved successfully." : "Save failed. Please try again.");
  }

  async function refreshEnquiries() {
    const response = await fetch("/api/enquiries");
    if (response.ok) {
      setEnquiries(await response.json());
      setNotice("Enquiries refreshed.");
    } else {
      setNotice("Failed to load enquiries.");
    }
  }

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("/api/settings", settings);
  }

  function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("/api/content", content);
  }

  function updateProcessStep(index: number, field: "title" | "text", value: string) {
    const updated = content.process.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setContent({ ...content, process: updated });
  }

  function addProcessStep() {
    setContent({ ...content, process: [...content.process, { title: "", text: "" }] });
  }

  function removeProcessStep(index: number) {
    setContent({ ...content, process: content.process.filter((_, i) => i !== index) });
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Image src={settings.logoUrl} alt="Vastorabaltic logo" width={76} height={76} />
        <h1>Vastorabaltic Admin</h1>
        <button className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}>
          <Settings size={18} />
          Settings
        </button>
        <button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}>
          <TextCursorInput size={18} />
          Content
        </button>
        <button className={tab === "enquiries" ? "active" : ""} onClick={() => setTab("enquiries")}>
          <Inbox size={18} />
          Enquiries
        </button>
        <button className="logout-button" onClick={logout}>
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <section className="admin-content">
        <div className="admin-top">
          <div>
            <p className="eyebrow">Control panel</p>
            <h2>
              {tab === "settings"
                ? "Website settings"
                : tab === "content"
                ? "Website content"
                : "Public enquiries"}
            </h2>
          </div>
          {notice && <span className="notice">{notice}</span>}
        </div>

        {tab === "settings" && (
          <form className="admin-form" onSubmit={saveSettings}>
            <label>
              Company name
              <input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </label>
            <label>
              Logo URL
              <input
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              />
            </label>
            <label>
              Email
              <input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </label>
            <label>
              Font family
              <input
                value={settings.fontFamily}
                onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
              />
            </label>
            <div className="color-row">
              <label>
                <Palette size={16} />
                Primary
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                />
              </label>
              <label>
                <Palette size={16} />
                Accent
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                />
              </label>
              <label>
                <Palette size={16} />
                Background
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                />
              </label>
            </div>
            <div className="admin-social-heading">
              <Share2 size={17} />
              Social Media Links
            </div>
            <label>
              Facebook URL
              <input
                type="url"
                placeholder="https://facebook.com/yourpage"
                value={settings.facebook ?? ""}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              />
            </label>
            <label>
              Instagram URL
              <input
                type="url"
                placeholder="https://instagram.com/yourhandle"
                value={settings.instagram ?? ""}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              />
            </label>
            <label>
              LinkedIn URL
              <input
                type="url"
                placeholder="https://linkedin.com/company/yourcompany"
                value={settings.linkedin ?? ""}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              />
            </label>
            <label>
              YouTube URL
              <input
                type="url"
                placeholder="https://youtube.com/@yourchannel"
                value={settings.youtube ?? ""}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              />
            </label>
            <button className="primary-button" type="submit">
              <Save size={18} />
              Save settings
            </button>
          </form>
        )}

        {tab === "content" && (
          <form className="admin-form" onSubmit={saveContent}>
            <label>
              Hero title
              <input
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              />
            </label>
            <label>
              Hero subtitle
              <textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              />
            </label>
            <label>
              Hero CTA button text
              <input
                value={content.heroCta}
                onChange={(e) => setContent({ ...content, heroCta: e.target.value })}
              />
            </label>
            <label>
              Who We Are
              <textarea
                value={content.whoWeAre}
                onChange={(e) => setContent({ ...content, whoWeAre: e.target.value })}
              />
            </label>
            <label>
              What We Do
              <textarea
                value={content.whatWeDo}
                onChange={(e) => setContent({ ...content, whatWeDo: e.target.value })}
              />
            </label>
            <label>
              Trades (one per line)
              <textarea
                value={content.trades.join("\n")}
                onChange={(e) =>
                  setContent({ ...content, trades: e.target.value.split("\n").filter(Boolean) })
                }
              />
            </label>
            <label>
              Why choose us (one per line)
              <textarea
                value={content.whyChooseUs.join("\n")}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whyChooseUs: e.target.value.split("\n").filter(Boolean)
                  })
                }
              />
            </label>

            <div className="admin-section-heading full">Process steps</div>
            {content.process.map((step, index) => (
              <div key={index} className="process-step-row full">
                <div className="process-step-fields">
                  <label>
                    Step title
                    <input
                      value={step.title}
                      onChange={(e) => updateProcessStep(index, "title", e.target.value)}
                    />
                  </label>
                  <label>
                    Step description
                    <textarea
                      value={step.text}
                      onChange={(e) => updateProcessStep(index, "text", e.target.value)}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="icon-button danger"
                  onClick={() => removeProcessStep(index)}
                  title="Remove step"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" className="secondary-button full" onClick={addProcessStep}>
              <Plus size={16} />
              Add process step
            </button>

            <button className="primary-button" type="submit">
              <Save size={18} />
              Save content
            </button>
          </form>
        )}

        {tab === "enquiries" && (
          <div className="enquiry-admin">
            <button className="secondary-button" onClick={refreshEnquiries}>
              Refresh enquiries
            </button>
            <div className="enquiry-table">
              {enquiries.length === 0 && <p>No enquiries yet.</p>}
              {enquiries.map((item) => (
                <article key={item.id ?? `${item.email}-${item.created_at}`}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.company || "No company"}</span>
                  </div>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                  <span>{item.phone || "No phone"}</span>
                  <p>{item.message}</p>
                  <time>
                    {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                  </time>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
