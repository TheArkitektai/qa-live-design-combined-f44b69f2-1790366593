import { useState } from "react";
import { CheckoutState } from "../App";
import { Card } from "./Card";

interface Props {
  isLoggedIn: boolean;
  guestEmail: string;
  onUpdate: (v: Partial<CheckoutState>) => void;
  onNext: () => void;
}

export const __preview = {
  isLoggedIn: false,
  guestEmail: "",
  onUpdate: () => {},
  onNext: () => {},
};

export function AuthStep({ isLoggedIn, guestEmail, onUpdate, onNext }: Props) {
  const [mode, setMode] = useState<"login" | "guest">("login");
  const [email, setEmail] = useState(guestEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mode === "login" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    onUpdate({
      isLoggedIn: mode === "login",
      guestEmail: mode === "guest" ? email : "",
    });
    onNext();
  }

  if (isLoggedIn) {
    return (
      <Card title="Sign In">
        <p style={{ color: "#2e7d32", fontWeight: 600 }}>✓ You are already signed in.</p>
        <button onClick={onNext} style={PRIMARY_BTN}>Continue</button>
      </Card>
    );
  }

  return (
    <Card title="Sign In or Continue as Guest">
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {(["login", "guest"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); }}
            style={{
              flex: 1,
              padding: "10px",
              border: `2px solid ${mode === m ? "#1976d2" : "#ccc"}`,
              borderRadius: 6,
              background: mode === m ? "#e3f0fc" : "#fff",
              fontWeight: mode === m ? 700 : 400,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {m === "login" ? "Sign In" : "Continue as Guest"}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        {mode === "login" && (
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            required
          />
        )}
        {error && (
          <p role="alert" style={{ color: "#c62828", fontSize: 13, marginBottom: 12 }}>
            {error}
          </p>
        )}
        <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
          🔒 Credentials are transmitted over HTTPS and filtered by WAF before reaching the application layer.
        </p>
        <button type="submit" style={PRIMARY_BTN}>
          {mode === "login" ? "Sign In & Continue" : "Continue as Guest →"}
        </button>
      </form>
    </Card>
  );
}

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}

function Field({ label, type, value, onChange, autoComplete, required }: FieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
        {label} {required && <span style={{ color: "#c62828" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        style={INPUT}
      />
    </div>
  );
}

const INPUT: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 15,
  outline: "none",
};

const PRIMARY_BTN: React.CSSProperties = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "13px 28px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  width: "100%",
};