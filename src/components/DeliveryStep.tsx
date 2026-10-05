import { useState } from "react";
import { card, primaryBtn } from "../styles/shared";

interface Props {
  onNext: () => void;
}

export const __preview: Props = { onNext: () => {} };

type DeliveryOption = { id: string; label: string; description: string; price: number };

const OPTIONS: DeliveryOption[] = [
  { id: "standard", label: "Standard Delivery", description: "3–5 working days", price: 3.99 },
  { id: "express", label: "Express Delivery", description: "Next working day", price: 8.99 },
  { id: "collect", label: "Click & Collect", description: "Ready in 2 hours at your nearest store", price: 0 },
];

export function DeliveryStep({ onNext }: Props) {
  const [selected, setSelected] = useState("standard");

  return (
    <div style={card}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Select Delivery Method</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {OPTIONS.map(opt => (
          <label key={opt.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px",
            border: `2px solid ${selected === opt.id ? "#0071e3" : "#e5e5ea"}`,
            borderRadius: 10,
            cursor: "pointer",
            background: selected === opt.id ? "#f0f7ff" : "#fff",
            transition: "border-color 0.2s, background 0.2s",
          }}>
            <input
              type="radio"
              name="delivery"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              style={{ accentColor: "#0071e3", width: 18, height: 18 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{opt.label}</div>
              <div style={{ fontSize: 13, color: "#6e6e73" }}>{opt.description}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: opt.price === 0 ? "#34c759" : "#1d1d1f" }}>
              {opt.price === 0 ? "FREE" : `£${opt.price.toFixed(2)}`}
            </div>
          </label>
        ))}
      </div>
      <button style={primaryBtn} onClick={onNext}>Continue to Payment →</button>
    </div>
  );
}