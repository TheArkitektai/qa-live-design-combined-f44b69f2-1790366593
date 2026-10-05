import { useState } from "react";
import { card, primaryBtn, inputStyle, labelStyle } from "../styles/shared";

interface Props {
  onAuthenticated: () => void;
  onGuest: () => void;
}

export const __preview: Props = {
  onAuthenticated: () => {},
  onGuest: () => {},
};

export function AuthStep({ onAuthenticated, onGuest }: Props) {
  const [mode, setMode] = useState<"choose" | "signin">("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 6) {
      setError("Please enter a valid email and password (min 6 chars).");
      return;
    }
    // Simulated WAF → App → DB flow; credentials validated client-side for demo
    onAuthenticated();
  }

  if (mode === "choose") {
    return (
      <div style={card}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>How would you like to continue?</h2>
        <p style={{ color: "#6e6e73", marginBottom: 28 }}>Sign in for faster checkout or continue as a guest.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button style={{ ...primaryBtn, flex: 1 }} onClick={() => setMode("signin")}>Sign In</button>
          <button style={{ ...primaryBtn, flex: 1, background: "#f5f5f7", color: "#1d1d1f", border: "1px solid #e5e5ea" }} onClick={onGuest}>
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={card}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Sign In</h2>
      <form onSubmit={handleSignIn} noValidate>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Email address</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
            required
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p style={{ color: "#ff3b30", marginBottom: 16, fontSize: 14 }}>{error}</p>}
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" style={{ ...primaryBtn, flex: 1 }}>Sign In →</button>
          <button type="button" style={{ ...primaryBtn, flex: 1, background: "#f5f5f7", color: "#1d1d1f", border: "1px solid #e5e5ea" }} onClick={() => setMode("choose")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}