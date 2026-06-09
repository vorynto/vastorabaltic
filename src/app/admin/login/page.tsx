"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (authError) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="login-shell">
      <div className="login-card">
        <Image src="/images/vastorabaltic-logo.jpg" alt="Vastorabaltic logo" width={64} height={64} />
        <h1>Admin Login</h1>
        <p className="login-sub">Sign in with your admin account to access the control panel.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoFocus
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error && <span className="login-error">{error}</span>}
          <button className="primary-button" type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
