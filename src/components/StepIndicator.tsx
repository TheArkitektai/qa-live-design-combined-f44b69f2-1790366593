interface Props {
  steps: string[];
  activeIndex: number;
}

export const __preview: Props = {
  steps: ["Sign In", "Shipping", "Delivery", "Payment", "Confirm"],
  activeIndex: 1,
};

export function StepIndicator({ steps, activeIndex }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((label, idx) => {
        const done = idx < activeIndex;
        const active = idx === activeIndex;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: idx < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: done ? "#34c759" : active ? "#0071e3" : "#e5e5ea",
                color: done || active ? "#fff" : "#6e6e73",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                transition: "background 0.3s",
              }}>
                {done ? "✓" : idx + 1}
              </div>
              <span style={{
                marginTop: 6,
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                color: active ? "#0071e3" : done ? "#34c759" : "#6e6e73",
              }}>{label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: 2,
                background: done ? "#34c759" : "#e5e5ea",
                marginBottom: 20,
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}