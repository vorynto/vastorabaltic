"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Palette, Save, Settings, TextCursorInput, Inbox } from "lucide-react";
import { Enquiry } from "@/lib/data";
import { SiteContent, SiteSettings } from "@/lib/defaultContent";

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
  const [tab, setTab] = useState<Tab>("settings");
  const [adminCode, setAdminCode] = useState("");
  const [settings, setSettings] = useState(initialSettings);
  const [content, setContent] = useState(initialContent);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [notice, setNotice] = useState("");

  async function save(path: string, payload: unknown) {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-code": adminCode
      },
      body: JSON.stringify(payload)
    });

    setNotice(response.ok ? "Saved successfully." : "Admin code missing or incorrect.");
  }

  async function refreshEnquiries() {
    const response = await fetch("/api/enquiries", {
      headers: { "x-admin-code": adminCode }
    });
    if (response.ok) {
      setEnquiries(await response.json());
      setNotice("Enquiries refreshed.");
    } else {
      setNotice("Admin code missing or incorrect.");
    }
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("/api/settings", settings);
  }

  function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save("/api/content", content);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Image src={settings.logoUrl} alt="Vastorabaltic logo" width={76} height={76} />
        <h1>Vastorabaltic Admin</h1>
        <label>
          Admin code
          <input
            type="password"
            value={adminCode}
            onChange={(event) => setAdminCode(event.target.value)}
            placeholder="Set ADMIN_ACCESS_CODE"
          />
        </label>
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
      </aside>

      <section className="admin-content">
        <div className="admin-top">
          <div>
            <p className="eyebrow">Control panel</p>
            <h2>{tab === "settings" ? "Website settings" : tab === "content" ? "Website content" : "Public enquiries"}</h2>
          </div>
          {notice && <span className="notice">{notice}</span>}
        </div>

        {tab === "settings" && (
          <form className="admin-form" onSubmit={saveSettings}>
            <label>
              Company name
              <input value={settings.siteName} onChange={(event) => setSettings({ ...settings, siteName: event.target.value })} />
            </label>
            <label>
              Logo URL
              <input value={settings.logoUrl} onChange={(event) => setSettings({ ...settings, logoUrl: event.target.value })} />
            </label>
            <label>
              Email
              <input value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} />
            </label>
            <label>
              Font family
              <input value={settings.fontFamily} onChange={(event) => setSettings({ ...settings, fontFamily: event.target.value })} />
            </label>
            <div className="color-row">
              <label>
                <Palette size={16} />
                Primary
                <input type="color" value={settings.primaryColor} onChange={(event) => setSettings({ ...settings, primaryColor: event.target.value })} />
              </label>
              <label>
                <Palette size={16} />
                Accent
                <input type="color" value={settings.accentColor} onChange={(event) => setSettings({ ...settings, accentColor: event.target.value })} />
              </label>
              <label>
                <Palette size={16} />
                Background
                <input type="color" value={settings.backgroundColor} onChange={(event) => setSettings({ ...settings, backgroundColor: event.target.value })} />
              </label>
            </div>
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
              <input value={content.heroTitle} onChange={(event) => setContent({ ...content, heroTitle: event.target.value })} />
            </label>
            <label>
              Hero subtitle
              <textarea value={content.heroSubtitle} onChange={(event) => setContent({ ...content, heroSubtitle: event.target.value })} />
            </label>
            <label>
              Who We Are
              <textarea value={content.whoWeAre} onChange={(event) => setContent({ ...content, whoWeAre: event.target.value })} />
            </label>
            <label>
              What We Do
              <textarea value={content.whatWeDo} onChange={(event) => setContent({ ...content, whatWeDo: event.target.value })} />
            </label>
            <label>
              Trades, one per line
              <textarea
                value={content.trades.join("\n")}
                onChange={(event) => setContent({ ...content, trades: event.target.value.split("\n").filter(Boolean) })}
              />
            </label>
            <label>
              Why choose us, one per line
              <textarea
                value={content.whyChooseUs.join("\n")}
                onChange={(event) => setContent({ ...content, whyChooseUs: event.target.value.split("\n").filter(Boolean) })}
              />
            </label>
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
                  <time>{item.created_at ? new Date(item.created_at).toLocaleString() : ""}</time>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
