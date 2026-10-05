import { cardStyle, primaryBtn } from "../App";
import type { OrderState } from "../App";

export interface CartViewProps {
  order: OrderState;
  onProceed: () => void;
}

export const __preview: CartViewProps = {
  order: {
    items: [
      { id: "sku-001", name: "Wireless Headphones Pro", qty: 1, pricePence: 7999 },
      { id: "sku-002", name: "USB-C Charging Cable (2m)", qty: 2, pricePence: 1299 },
    ],
    isLoggedIn: false,
    guestEmail: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostcode: "",
    deliveryMethod: "standard",
    cardNumber: "",
    orderRef: "",
  },
  onProceed: () => {},
};

function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(2)}`;
}

export function CartView({ order, onProceed }: CartViewProps) {
  const subtotal = order.items.reduce((sum, item) => sum + item.qty * item.pricePence, 0);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 700 }}>Your Cart</h1>
      <div style={cardStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e0e0e0", textAlign: "left" }}>
              <th style={{ padding: "0.5rem 0" }}>Item</th>
              <th style={{ padding: "0.5rem", textAlign: "center" }}>Qty</th>
              <th style={{ padding: "0.5rem 0", textAlign: "right" }}>Price</th>
              <th style={{ padding: "0.5rem 0", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "0.75rem 0" }}>{item.name}</td>
                <td style={{ padding: "0.75rem", textAlign: "center" }}>{item.qty}</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right" }}>{formatPrice(item.pricePence)}</td>
                <td style={{ padding: "0.75rem 0", textAlign: "right", fontWeight: 600 }}>
                  {formatPrice(item.qty * item.pricePence)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ padding: "1rem 0 0", fontWeight: 700, textAlign: "right" }}>
                Subtotal:
              </td>
              <td style={{ padding: "1rem 0 0", fontWeight: 700, textAlign: "right", fontSize: "1.1rem" }}>
                {formatPrice(subtotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={primaryBtn} onClick={onProceed}>
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}