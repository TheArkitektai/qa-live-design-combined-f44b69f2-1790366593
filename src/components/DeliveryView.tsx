import { cardStyle, primaryBtn } from "../App";
import type { OrderState } from "../App";

export interface DeliveryViewProps {
  order: OrderState;
  onChange: (patch: Partial<OrderState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const __preview: DeliveryViewProps = {
  order: {
    items: [],
    isLoggedIn: false,
    guestEmail: "",
    shippingName: "Jane Doe",
    shippingAddress: "12 High Street",
    shippingCity: "London",
    shippingPostcode: "EC1A 1BB",
    deliveryMethod: "standard",
    cardNumber: "",
    orderRef: "",
  },
  onChange: () => {},
  onNext: () => {},
  onBack: () => {},
};

const DELIVERY_OPTIONS: { value: OrderState["deliveryMethod"]; label: string; detail: string; pricePence: number }[] = [
  { value: "standard", label: "Standard Delivery", detail: "3-5 business days", pricePence: 299 },
  { value: "express", label: "Express Delivery", detail: "Next business day", pricePence: 799 },
  { value: "click-and-collect", label: "Click & Collect", detail: "Ready in 2 hours at your nearest store", pricePence: 0 },
];

export function DeliveryView({ order, onChange, onNext, onBack }: DeliveryViewProps) {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 700 }}>Select Delivery Method</h1>
      <div style={cardStyle}>
        {DELIVERY_OPTIONS.map((opt) => {
          const selected = order.deliveryMethod === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                borderRadius: 6,
                border: `2px solid ${selected ? "#0a2540" : "#e0e0e0"}`,
                marginBottom: "0.75rem",
                cursor: "pointer",
                background: selected ? "#f0f4f8" : "#fff",
                transition: "border-color 0.15s",
              }}
            >
              <input
                type="radio"
                name="delivery"
                value={opt.value}
                checked={selected}
                onChange={() => onChange({ deliveryMethod: opt.value })}
                style={{ accentColor: "#0a2540", width: 18, height: 18 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{opt.label}</div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>{opt.detail}</div>
              </div>
              <div style={{ fontWeight: 700, color: "#0a2540" }}>
                {opt.pricePence === 0 ? "FREE" : `£${(opt.pricePence / 100).toFixed(2)}`}
              </div>
            </label>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <button
            style={{ background: "none", border: "1px solid #ccc", borderRadius: 6, padding: "0.75rem 1.5rem", cursor: "pointer", fontSize: "1rem" }}
            onClick={onBack}
          >
            ← Back
          </button>
          <button style={primaryBtn} onClick={onNext}>Continue to Payment →</button>
        </div>
      </div>
    </div>
  );
}