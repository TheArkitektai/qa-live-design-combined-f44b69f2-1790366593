import { useState } from "react";
import { card, primaryBtn, inputStyle, labelStyle } from "../styles/shared";

interface Props {
  onNext: () => void;
}

export const __preview: Props = { onNext: () => {} };

export function ShippingStep({ onNext }: Props) {
  const [form, setForm] = useState({ fullName: "", line1: "", city: "", postcode: "", country: "GB" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.line1.trim()) e.line1 = "Address line 1 is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(form.postcode.trim())) e.postcode = "Enter a valid UK postcode.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext();
  }

  function field(name: keyof typeof form, label: string, type = "text", placeholder = "") {
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{label}</label>
        <input
          type={type}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          style={{ ...inputStyle, borderColor: errors[name] ? "#ff3b30" : "#e5e5ea" }}
          placeholder={placeholder}
          autoComplete={name === "fullName" ? "name" : name === "line1" ? "address-line1" : name === "postcode" ? "postal-code" : name}
        />
        {errors[name] && <span style={{ color: "#ff3b30", fontSize: 13 }}>{errors[name]}</span>}
      </div>
    );
  }

  return (
    <div style={card}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Shipping Details</h2>
      <form onSubmit={handleSubmit} noValidate>
        {field("fullName", "Full name", "text", "Jane Smith")}
        {field("line1", "Address line 1", "text", "123 High Street")}
        {field("city", "City", "text", "London")}
        {field("postcode", "Postcode", "text", "SW1A 1AA")}
        <button type="submit" style={primaryBtn}>Continue to Delivery →</button>
      </form>
    </div>
  );
}