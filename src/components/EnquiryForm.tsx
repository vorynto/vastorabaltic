"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "Construction recruitment",
  message: ""
};

export function EnquiryForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setForm(initial);
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <label>
        Name
        <input
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </label>
      <label>
        Email
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
      </label>
      <label>
        Phone
        <input
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
      </label>
      <label>
        Company
        <input
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
        />
      </label>
      <label className="full">
        Service needed
        <select
          value={form.service}
          onChange={(event) => setForm({ ...form, service: event.target.value })}
        >
          <option>Construction recruitment</option>
          <option>Domestic recruitment</option>
          <option>Overseas recruitment</option>
          <option>Customized staffing solution</option>
        </select>
      </label>
      <label className="full">
        Message
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
      </label>
      <button className="primary-button" disabled={status === "sending"} type="submit">
        <Send size={18} />
        {status === "sending" ? "Sending..." : "Submit enquiry"}
      </button>
      {status === "sent" && <p className="success">Thank you. Your enquiry has been received.</p>}
      {status === "error" && <p className="error">Please try again or email us directly.</p>}
    </form>
  );
}
