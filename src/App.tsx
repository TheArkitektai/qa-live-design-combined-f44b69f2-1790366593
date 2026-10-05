import { useState } from "react";
import { CheckoutFlow } from "./components/CheckoutFlow";
import { CartView } from "./components/CartView";
import { ProgressBar } from "./components/ProgressBar";

export type Step =
  | "cart"
  | "auth"
  | "shipping"
  | "delivery"
  | "payment"
  | "review"
  | "confirmation";

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface CheckoutState {
  items: CartItem[];
  isLoggedIn: boolean;
  guestEmail: string;
  shipping: ShippingDetails;
  deliveryMethod: string;
  payment: PaymentDetails;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
}

const INITIAL_ITEMS: CartItem[] = [
  { id: "sku-001", name: "Wireless Headphones", qty: 1, price: 79.99 },
  { id: "sku-002", name: "USB-C Hub (7-port)", qty: 2, price: 34.5 },
  { id: "sku-003", name: "Laptop Stand (Aluminium)", qty: 1, price: 49.0 },
];

const INITIAL_STATE: CheckoutState = {
  items: INITIAL_ITEMS,
  isLoggedIn: false,
  guestEmail: "",
  shipping: { fullName: "", address: "", city: "", postcode: "", country: "" },
  deliveryMethod: "",
  payment: { cardNumber: "", expiry: "", cvv: "", nameOnCard: "" },
};

const STEPS: Step[] = [
  "cart",
  "auth",
  "shipping",
  "delivery",
  "payment",
  "review",
  "confirmation",
];

const STEP_LABELS: Record<Step, string> = {
  cart: "Cart",
  auth: "Sign In",
  shipping: "Shipping",
  delivery: "Delivery",
  payment: "Payment",
  review: "Review",
  confirmation: "Confirmed",
};

export function App() {
  const [step, setStep] = useState<Step>("cart");
  const [state, setState] = useState<CheckoutState>(INITIAL_STATE);

  const currentIndex = STEPS.indexOf(step);

  function goTo(s: Step) {
    setStep(s);
  }

  function next() {
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1]);
    }
  }

  function update(partial: Partial<CheckoutState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <header
        style={{
          background: "#0f2a4a",
          color: "#fff",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
          ShopLIVE
        </span>
        <span
          style={{
            background: "#1976d2",
            borderRadius: 4,
            fontSize: 11,
            padding: "2px 8px",
            fontWeight: 600,
          }}
        >
          SECURE CHECKOUT
        </span>
      </header>

      {step !== "confirmation" && (
        <ProgressBar steps={STEPS.slice(0, -1)} currentStep={step} labels={STEP_LABELS} />
      )}

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
        {step === "cart" ? (
          <CartView items={state.items} onProceed={next} onUpdateItems={(items) => update({ items })} />
        ) : (
          <CheckoutFlow
            step={step}
            state={state}
            onUpdate={update}
            onNext={next}
            onGoTo={goTo}
          />
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          fontSize: 12,
          color: "#666",
          borderTop: "1px solid #ddd",
          marginTop: 40,
        }}
      >
        🔒 All data is transmitted over HTTPS and protected by WAF filtering.
        &nbsp;|&nbsp; Referrer-Policy: strict-origin-when-cross-origin
      </footer>
    </div>
  );
}