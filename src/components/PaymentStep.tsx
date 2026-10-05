import { useState } from "react";
import { card, primaryBtn, inputStyle, labelStyle } from "../styles/shared";

interface Props {
  subtotal: number;
  onAuthorised: () => void;
  onDeclined: () => void;
}

export const __preview: Props = {
  subtotal: 119.96,
  onAuthorised: () => {},
  onDeclined: () => {},
};

function luhn(n: string): boolean {
  const digits = n.replace(/\D/g, "").split("").reverse().map(Number);
  const sum = digits.reduce((acc, d, i) => {
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    return acc + d;
  }, 0);
  return sum % 10 === 0;
}

export function PaymentStep({ subtotal, onAuthorised, onDeclined }: Props) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    const raw = card.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(raw) || !luhn(raw)) e.card = "Enter a valid card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) e.expiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(cvv)) e.cvv = "CVV must be 3–4 digits.";
    if (!name.trim()) e.name = "Cardholder name is required.";
    return e;
  }

  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setProcessing(true);
    // Simulate payment gateway round-trip (WAF → App → Payment Gateway)
    // Card ending 0002 always declines per test harness convention
    setTimeout(() => {
      setProcessing(false);
      const raw = card.replace(/\s/g, "");
      if (raw.endsWith("0002")) { onDeclined(); } else { onAuthorised(); }
    }, 1500);
  }

  function fieldErr(key: string) {
    return errors[key] ? <span style={{ color: "#ff3b30", fontSize: 13, display: "block", marginTop: 4 }}>{errors[key]}</span> : null;
  }

  return (
    <div style={{ ...card as any }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Payment Details</h2>
      <p style={{ color: "#6e6e73", fontSize: 14, marginBottom: 24 }}>
        All payment data is transmitted over HTTPS and filtered by WAF before processing.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Card number</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={card}
            onChange={ev => setCard(formatCard(ev.target.value))}
            style={{ ...inputStyle, borderColor: errors.card ? "#ff3b30" : "#e5e5ea" }}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {fieldErr("card")}
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Expiry (MM/YY)</label>
            <input
              type="text"
              autoComplete="cc-exp"
              value={expiry}
              onChange={ev => {
                let v = ev.target.value.replace(/\D/g, "").slice(0, 4);
                if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                setExpiry(v);
              }}
              style={{ ...inputStyle, borderColor: errors.expiry ? "#ff3b30" : "#e5e5ea" }}
              placeholder="08/27"
              maxLength={5}
            />
            {fieldErr("expiry")}
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>CVV</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvv}
              onChange={ev => setCvv(ev.target.value.replace(/\D/g, "").slice(0, 4))}
              style={{ ...inputStyle, borderColor: errors.cvv ? "#ff3b30" : "#e5e5ea" }}
              placeholder="123"
              maxLength={4}
            />
            {fieldErr("cvv")}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Cardholder name</label>
          <input
            type="text"
            autoComplete="cc-name"
            value={name}
            onChange={ev => setName(ev.target.value)}
            style={{ ...inputStyle, borderColor: errors.name ? "#ff3b30" : "#e5e5ea" }}
            placeholder="Jane Smith"
          />
          {fieldErr("name")}
        </div>
        <div style={{ background: "#f5f5f7", borderRadius: 8, padding: "12px 16px", marginBottom: 24, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 600 }}>Total to pay</span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>£{subtotal.toFixed(2)}</span>
        </div>
        <button type="submit" style={{ ...primaryBtn, width: "100%", opacity: processing ? 0.6 : 1 }} disabled={processing}>
          {processing ? "Processing…" : `Pay £${subtotal.toFixed(2)} →`}
        </button>
      </form>
    </div>
  );
}