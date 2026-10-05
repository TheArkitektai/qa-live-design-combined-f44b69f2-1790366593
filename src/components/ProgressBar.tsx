import { Step } from "../App";

interface Props {
  steps: Step[];
  currentStep: Step;
  labels: Record<Step, string>;
}

export const __preview = {
  steps: ["cart", "auth", "shipping", "delivery", "payment", "review"] as Step[],
  currentStep: "shipping" as Step,
  labels: {
    cart: "Cart",
    auth: "Sign In",
    shipping: "Shipping",
    delivery: "Delivery",
    payment: "Payment",
    review: "Review",
    confirmation: "Confirmed",
  } as Record<Step, string>,
};

export function ProgressBar({ steps, currentStep, labels }: Props) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <nav
      aria-label="Checkout progress"
      style={{
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 16px",
      }}
    >
      <ol
        style={{
          display: "flex",
          listStyle: "none",
          maxWidth: 760,
          margin: "0 auto",
          padding: 0,
        }}
      >
        {steps.map((s, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li
              key={s}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px 4px",
                fontSize: 13,
                fontWeight: active ? 700 : 400,
                color: done ? "#1976d2" : active ? "#0f2a4a" : "#999",
                borderBottom: active
                  ? "3px solid #1976d2"
                  : done
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: done ? "#1976d2" : active ? "#0f2a4a" : "#e0e0e0",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 4,
                  marginRight: 6,
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              {labels[s]}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}