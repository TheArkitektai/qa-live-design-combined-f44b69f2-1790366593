import { useState } from "react";
import { cardStyle, primaryBtn, inputStyle } from "../App";

export interface SignInViewProps {
  onSignedIn: () => void;
  onGuest: (email: string) => void;
}

export const __preview: SignInViewProps = {
  onSignedIn: () => {},
  onGuest: () => {},
};

function sanitise(input: string): string {
  return input.replace(/[<>"'`]/g, "").trim();
}

export function SignInView({ onSignedIn, onGuest }: SignInViewProps) {
  const [tab, setTab] = useState<"signin" | "guest">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");

  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "0.75rem",
    background: active ? "#0a2540" : "#f0f0f0",
    color: active ? "#fff" : "#333",
    border: "none",
    cursor: "pointer",
    fontWeight: active ? 700 : 400,
    fontSize: "0.95rem",
    borderRadius: 0,
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitise(email);
    const cleanPassword = sanitise(password);
    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate: any credentials accepted for demo
    setError("");
    onSignedIn();
  };

  const handleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitise(guestEmail);
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onGuest(cleanEmail);
  };

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 700 }}>Sign In or Continue as Guest</h1>
      <div style={cardStyle}>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", marginBottom: "1.5rem" }}>
          <button style={tabBtn(tab === "signin")} onClick={() => { setTab("signin"); setError(""); }}>
            Sign In
          </button>
          <button style={tabBtn(tab === "guest")} onClick={() => { setTab("guest"); setError(""); }}>
            Guest Checkout
          </button>
        </div>

        {error && (
          <p role="alert" style={{ color: "#c0392b", background: "#fdecea", padding: "0.6rem", borderRadius: 4, marginBottom: "1rem", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}

        {tab === "signin" && (
          <form onSubmit={handleSignIn} noValidate>
            <label htmlFor="si-email" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email</label>
            <input
              id="si-email"
              type="email"
              autoComplete="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <label htmlFor="si-password" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Password</label>
            <input
              id="si-password"
              type="password"
              autoComplete="current-password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button type="submit" style={primaryBtn}>Sign In</button>
          </form>
        )}

        {tab === "guest" && (
          <form onSubmit={handleGuest} noValidate>
            <label htmlFor="guest-email" style={{ fontWeight: 600, fontSize: "0.9rem" }}>Email address</label>
            <input
              id="guest-email"
              type="email"
              autoComplete="email"
              style={inputStyle}
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "1rem" }}>
              We'll send your order confirmation to this address.
            </p>
            <button type="submit" style={primaryBtn}>Continue as Guest</button>
          </form>
        )}
      </div>
    </div>
  );
}