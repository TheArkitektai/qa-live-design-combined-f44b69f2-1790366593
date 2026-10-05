import { useState } from "react";
import { ShippingDetails } from "../App";
import { Card } from "./Card";

interface Props {
  shipping: ShippingDetails;
  onUpdate: (s: ShippingDetails) => void;
  onNext: () => void;
}

export const __preview = {
  shipping: { fullName: "", address: "", city: "", postcode: "", country: "" },
  onUpdate: () => {},
  onNext: () => {},
};

function sanitise(val: string): string {
  return val.replace(/[<>"'`]/g, "");
}

export function ShippingStep({ shipping, onUpdate, onNext }: Props) {
  const [local, setLocal] = useState<ShippingDetails>(shipping);
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  function set(field: keyof ShippingDetails, val: string) {
    const clean = sanitise(val);
    setLocal((prev) => ({ ...prev, [field]: clean }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<ShippingDetails> = {};
    if (!local.fullName.trim()) e.fullName = "Full name is required.";
    if (!local.address.trim()) e.address = "Address is required.";
    if (!local.city.trim()) e.city = "City is required.";
    if (!local.postcode.trim()) e.postcode = "Postcode is required.";
    if (!local.country.trim()) e.country = "Country is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onUpdate(local);
    onNext();
  }

  return (
    <Card title="Shipping Details">
      <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
        🔒 Input is sanitised by the application layer before storage. Fields stripped of HTML special characters.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        {(
          [
            { field: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
            { field: "address", label: "Street Address", type: "text", autoComplete: "street-address" },
            { field: "city", label: "City", type: "text", autoComplete: "address-level2" },
            { field: "postcode", label: "Postcode / ZIP", type: "text", autoComplete: "postal-code" },
            { field: "country", label: "Country", type: "text", autoComplete: "country-name" },
          ] as const
        ).map(({ field, label, type, autoComplete }) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              {label} <span style={{ color: "#c62828" }}>*</span>
            </label>
            <input
              type={type}
              value={local[field]}
              onChange={(e) => set(field, e.target.value)}
              autoComplete={autoComplete}
              style={{
                ...INPUT,
                borderColor: errors[field] ? "#c62828" : "#ccc",
              }}
            />
            {errors[field] && (
              <p role="alert" style={{ color: "#c62828", fontSize: 12, marginTop: 4 }}>
                {errors[field]}
              </p>
            )}
          </div>
        ))}
        <button type="submit" style={PRIMARY_BTN}>Save & Continue →</button>
      </form>
    </Card>
  );
}

const INPUT: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 15,
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
  marginTop: 8,
};