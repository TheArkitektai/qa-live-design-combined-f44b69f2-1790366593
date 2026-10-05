export interface ProgressBarProps {
  steps: string[];
  currentIndex: number;
}

export const __preview: ProgressBarProps = {
  steps: ["Cart", "Sign In", "Shipping", "Delivery", "Payment", "Confirmation"],
  currentIndex: 2,
};

export function ProgressBar({ steps, currentIndex }: ProgressBarProps) {
  return (
    <nav
      aria-label="Checkout progress"
      style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", padding: "0.75rem 1rem" }}
    >
      <ol
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.25rem",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {steps.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.8rem",
                fontWeight: active ? 700 : 400,
                color: done ? "#27ae60" : active ? "#0a2540" : "#999",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  background: done ? "#27ae60" : active ? "#0a2540" : "#e0e0e0",
                  color: done || active ? "#fff" : "#666",
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              {label}
              {i < steps.length - 1 && (
                <span style={{ color: "#ccc", margin: "0 0.25rem" }}>›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}