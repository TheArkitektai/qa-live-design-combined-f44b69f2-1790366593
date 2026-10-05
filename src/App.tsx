import { useState } from "react";
import { CartView } from "./components/CartView";
import { SignInView } from "./components/SignInView";
import { ShippingView } from "./components/ShippingView";
import { DeliveryView } from "./components/DeliveryView";
import { PaymentView } from "./components/PaymentView";
import { ConfirmationView } from "./components/ConfirmationView";
import { ProgressBar } from "./components/ProgressBar";

export type Step = "cart" | "signin" | "shipping" | "delivery" | "payment" | "confirmation" | "declined";

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  pricePence: number;
}

export interface OrderState {
  items: CartItem[];
  isLoggedIn: boolean;
  guestEmail: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostcode: string;
  deliveryMethod: "standard" | "express" | "click-and-collect";
  cardNumber: string;
  orderRef: string;
}

const INITIAL_ITEMS: CartItem[] = [
  { id: "sku-001", name: "Wireless Headphones Pro", qty: 1, pricePence: 7999 },
  { id: "sku-002", name: "USB-C Charging Cable (2m)", qty: 2, pricePence: 1299 },
  { id: "sku-003", name: "Laptop Stand – Aluminium", qty: 1, pricePence: 3499 },
];

const STEPS_ORDERED: Step[] = ["cart", "signin", "shipping", "delivery", "payment", "confirmation"];

export function App() {
  const [step, setStep] = useState<Step>("cart");
  const [order, setOrder] = useState<OrderState>({
    items: INITIAL_ITEMS,
    isLoggedIn: false,
    guestEmail: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostcode: "",
    deliveryMethod: "standard",
    cardNumber: "",
    orderRef: "",
  });

  const updateOrder = (patch: Partial<OrderState>) =>
    setOrder((prev) => ({ ...prev, ...patch }));

  const progressSteps = ["Cart", "Sign In", "Shipping", "Delivery", "Payment", "Confirmation"];
  const currentIndex = STEPS_ORDERED.indexOf(step === "declined" ? "payment" : step);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <header style={{ background: "#0a2540", color: "#fff", padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.02em" }}>ShopSecure</span>
        <span style={{ opacity: 0.5, fontSize: "0.875rem" }}>Checkout</span>
      </header>

      {step !== "confirmation" && step !== "declined" && (
        <ProgressBar steps={progressSteps} currentIndex={currentIndex} />
      )}

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
        {step === "cart" && (
          <CartView order={order} onProceed={() => setStep("signin")} />
        )}
        {step === "signin" && (
          <SignInView
            onSignedIn={() => { updateOrder({ isLoggedIn: true }); setStep("shipping"); }}
            onGuest={(email) => { updateOrder({ isLoggedIn: false, guestEmail: email }); setStep("shipping"); }}
          />
        )}
        {step === "shipping" && (
          <ShippingView
            order={order}
            onChange={updateOrder}
            onNext={() => setStep("delivery")}
          />
        )}
        {step === "delivery" && (
          <DeliveryView
            order={order}
            onChange={updateOrder}
            onNext={() => setStep("payment")}
            onBack={() => setStep("shipping")}
          />
        )}
        {step === "payment" && (
          <PaymentView
            order={order}
            onChange={updateOrder}
            onAuthorised={(ref) => { updateOrder({ orderRef: ref }); setStep("confirmation"); }}
            onDeclined={() => setStep("declined")}
          />
        )}
        {step === "confirmation" && <ConfirmationView order={order} />}
        {step === "declined" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#c0392b", marginBottom: "1rem" }}>Payment Declined</h2>
            <p style={{ marginBottom: "1.5rem" }}>Your payment could not be authorised. Please check your card details and try again.</p>
            <button style={primaryBtn} onClick={() => setStep("payment")}>Try Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 8,
  padding: "2rem",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  marginBottom: "1.5rem",
};

export const primaryBtn: React.CSSProperties = {
  background: "#0a2540",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.75rem 2rem",
  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: 600,
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: "1rem",
  marginTop: "0.25rem",
  marginBottom: "1rem",
};