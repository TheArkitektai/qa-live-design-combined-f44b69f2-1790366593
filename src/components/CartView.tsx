import { CartItem } from "../App";

interface Props {
  cart: CartItem[];
  onProceed: () => void;
}

export const __preview: Props = {
  cart: [
    { id: "sku-001", name: "Wireless Headphones", qty: 1, price: 89.99 },
    { id: "sku-002", name: "Phone Case", qty: 2, price: 14.99 },
  ],
  onProceed: () => {},
};

export function CartView({ cart, onProceed }: Props) {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Your Cart</h1>
      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f7" }}>
              <th style={thStyle}>Item</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Qty</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Unit Price</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item.id} style={{ borderTop: idx === 0 ? "none" : "1px solid #e5e5ea" }}>
                <td style={tdStyle}>{item.name}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{item.qty}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>£{item.price.toFixed(2)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 600 }}>
                  £{(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid #e5e5ea" }}>
              <td colSpan={3} style={{ ...tdStyle, fontWeight: 700, textAlign: "right" }}>Subtotal</td>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 18, textAlign: "right" }}>
                £{subtotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style={{ marginTop: 24, textAlign: "right" }}>
        <button onClick={onProceed} style={primaryBtn}>
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: 13,
  fontWeight: 600,
  textAlign: "left",
  color: "#6e6e73",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: 15,
};

const primaryBtn: React.CSSProperties = {
  background: "#0071e3",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "14px 28px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};