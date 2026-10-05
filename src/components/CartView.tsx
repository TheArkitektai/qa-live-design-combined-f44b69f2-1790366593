import { CartItem } from "../App";

interface Props {
  items: CartItem[];
  onProceed: () => void;
  onUpdateItems: (items: CartItem[]) => void;
}

export const __preview = {
  items: [
    { id: "sku-001", name: "Wireless Headphones", qty: 1, price: 79.99 },
    { id: "sku-002", name: "USB-C Hub (7-port)", qty: 2, price: 34.5 },
  ],
  onProceed: () => {},
  onUpdateItems: () => {},
};

function fmt(n: number) {
  return n.toFixed(2);
}

export function CartView({ items, onProceed, onUpdateItems }: Props) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  function changeQty(id: string, delta: number) {
    onUpdateItems(
      items
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  return (
    <section aria-labelledby="cart-heading">
      <h1
        id="cart-heading"
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "#0f2a4a" }}
      >
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p style={{ color: "#666" }}>Your cart is empty.</p>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f4f8" }}>
                <th style={TH}>Product</th>
                <th style={{ ...TH, textAlign: "center" }}>Qty</th>
                <th style={{ ...TH, textAlign: "right" }}>Unit Price</th>
                <th style={{ ...TH, textAlign: "right" }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={TD}>{item.name}</td>
                  <td style={{ ...TD, textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <button
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => changeQty(item.id, -1)}
                        style={QTY_BTN}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => changeQty(item.id, 1)}
                        style={QTY_BTN}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ ...TD, textAlign: "right" }}>£{fmt(item.price)}</td>
                  <td style={{ ...TD, textAlign: "right", fontWeight: 600 }}>
                    £{fmt(item.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f0f4f8" }}>
                <td colSpan={3} style={{ ...TD, fontWeight: 700, textAlign: "right" }}>
                  Subtotal
                </td>
                <td style={{ ...TD, fontWeight: 700, textAlign: "right", fontSize: 16 }}>
                  £{fmt(subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onProceed}
          disabled={items.length === 0}
          style={{
            background: items.length === 0 ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 700,
            cursor: items.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
    </section>
  );
}

const TH: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 13,
  fontWeight: 600,
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const TD: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: 15,
};

const QTY_BTN: React.CSSProperties = {
  width: 28,
  height: 28,
  border: "1px solid #ccc",
  borderRadius: 4,
  background: "#fff",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};