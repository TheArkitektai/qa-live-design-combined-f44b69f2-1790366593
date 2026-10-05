import { Card } from "./Card";

interface DeliveryOption {
  id: string;
  label: string;
  description: string;
  price: number;
  days: string;
}

const OPTIONS: DeliveryOption[] = [
  { id: "standard", label: "Standard Delivery", description: "Tracked parcel", price: 3.99, days: "3–5 business days" },
  { id: "express", label: "Express Delivery", description: "Next-day guaranteed", price: 9.99, days: "Next business day" },
  { id: "collect", label: "Click & Collect", description: "Pick up from store", price: 0, days: "Ready in 2 hours" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export const __preview = {
  selected: "standard",
  onSelect: () => {},
  onNext: () => {},
};

export function DeliveryStep({ selected, onSelect, onNext }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    onNext();
  }

  return (
    <Card title="Select Delivery Method">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {OPTIONS.map((opt) => {
            const active = selected === opt.id;
            return (
              <label
                key={opt.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  border: `2px solid ${active ? "#1976d2" : "#ddd"}`,
                  borderRadius: 8,
                  padding: "14px 16px",
                  cursor: "pointer",
                  background: active ? "#e3f0fc" : "#fff",
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={opt.id}
                  checked={active}
                  onChange={() => onSelect(opt.id)}
                  style={{ width: 18, height: 18, accentColor: "#1976d2" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{opt.label}</div>
                  <div style={{ fontSize: 13, color: "#555" }}>
                    {opt.description} · {opt.days}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: opt.price === 0 ? "#2e7d32" : "#0f2a4a" }}>
                  {opt.price === 0 ? "FREE" : `£${opt.price.toFixed(2)}`}
                </div>
              </label>
            );
          })}
        </div>
        <button
          type="submit"
          disabled={!selected}
          style={{
            background: !selected ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "13px 28px",
            fontSize: 15,
            fontWeight: 700,
            cursor: !selected ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          Continue to Payment →
        </button>
      </form>
    </Card>
  );
}