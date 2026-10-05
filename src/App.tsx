import { useState } from "react";
import { CheckoutFlow } from "./components/CheckoutFlow";
import { CartView } from "./components/CartView";

export type CheckoutStage =
  | "cart"
  | "auth"
  | "shipping"
  | "delivery"
  | "payment"
  | "confirmation"
  | "declined";

export type CartItem = { id: string; name: string; qty: number; price: number };

const INITIAL_CART: CartItem[] = [
  { id: "sku-001", name: "Wireless Headphones", qty: 1, price: 89.99 },
  { id: "sku-002", name: "Phone Case", qty: 2, price: 14.99 },
  { id: "sku-003", name: "USB-C Cable 2m", qty: 3, price: 9.99 },
];

export function App() {
  const [stage, setStage] = useState<CheckoutStage>("cart");
  const [cart] = useState<CartItem[]>(INITIAL_CART);
  const [isGuest, setIsGuest] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f7" }}>
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e5e5ea",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.5 }}>ShopLIVE</span>
        <span style={{ fontSize: 13, color: "#6e6e73" }}>Secure Checkout</span>
      </header>

      <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px" }}>
        {stage === "cart" ? (
          <CartView
            cart={cart}
            onProceed={() => setStage("auth")}
          />
        ) : (
          <CheckoutFlow
            cart={cart}
            stage={stage}
            isGuest={isGuest}
            onStageChange={setStage}
            onGuestChange={setIsGuest}
          />
        )}
      </main>
    </div>
  );
}