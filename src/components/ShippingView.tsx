import { useState } from "react";
import { cardStyle, primaryBtn, inputStyle } from "../App";
import type { OrderState } from "../App";

export interface ShippingViewProps {
  order: OrderState;
  onChange: (patch: Partial<OrderState>) => void;
  onNext: () => void;
}

export const __preview: ShippingViewProps = {
  order: {
    items: [],
    isLoggedIn: false,
    guestEmail: "test@example.com",
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
};

function sanitise(input: string): string {
  return input.replace(/[<>"'`]/g, "").trim();
}

export function ShippingView({ order, onChange, onNext }: ShippingViewProps) {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.shippingName || !order.shippingAddress || !order.shippingCity || !order.shippingPostcode) {
      setError("Please complete all shipping fields.");
      return;
    }
    setError("");
    onNext();
  };

  const field = (
    id: keyof OrderState,
    label: string,
    placeholder: string,
    autoComplete: string
  ) => (
    <>
      <label htmlFor={id} style={{ fontWeight: 600, fontSize: "0.9rem" }}>{label}</label>
      <input
        id={id}
        type="text"
        autoComplete={autoComplete}
        style={inputStyle}
        value={order[id] as string}
        onChange={(e) => onChange({ [id]: sanitise(e.target.value) } as Partial<OrderState>)}
        placeholder={placeholder}
      />
    </>
  );

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 700 }}>Shipping Details</h1>
      <div style={cardStyle}>
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" style={{ color: "#c0392b", background: "#fdecea", padding: "0.6rem", borderRadius: 4, marginBottom: "1rem", fontSize: "0.9rem" }}>
              {error}
            </p>
          )}
          {field("shippingName", "Full Name", "Jane Doe", "name")}
          {field("shippingAddress", "Address Line", "12 High Street", "address-line1")}
          {field("shippingCity", "City", "London", "address-level2")}
          {field("shippingPostcode", "Postcode", "EC1A 1BB", "postal-code")}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="submit" style={primaryBtn}>Continue to Delivery →</button>
          </div>
        </form>
      </div>
    </div>
  );
}