import { CheckoutStage, CartItem } from "../App";
import { StepIndicator } from "./StepIndicator";
import { AuthStep } from "./AuthStep";
import { ShippingStep } from "./ShippingStep";
import { DeliveryStep } from "./DeliveryStep";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { DeclinedStep } from "./DeclinedStep";

interface Props {
  cart: CartItem[];
  stage: CheckoutStage;
  isGuest: boolean;
  onStageChange: (s: CheckoutStage) => void;
  onGuestChange: (g: boolean) => void;
}

export const __preview: Props = {
  cart: [{ id: "sku-001", name: "Wireless Headphones", qty: 1, price: 89.99 }],
  stage: "shipping",
  isGuest: false,
  onStageChange: () => {},
  onGuestChange: () => {},
};

const STEPS: { key: CheckoutStage; label: string }[] = [
  { key: "auth", label: "Sign In" },
  { key: "shipping", label: "Shipping" },
  { key: "delivery", label: "Delivery" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirm" },
];

export function CheckoutFlow({ cart, stage, isGuest, onStageChange, onGuestChange }: Props) {
  const activeIndex = STEPS.findIndex(s => s.key === stage);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      {stage !== "confirmation" && stage !== "declined" && (
        <StepIndicator steps={STEPS.map(s => s.label)} activeIndex={activeIndex} />
      )}

      <div style={{ marginTop: 28 }}>
        {stage === "auth" && (
          <AuthStep
            onAuthenticated={() => onStageChange("shipping")}
            onGuest={() => { onGuestChange(true); onStageChange("shipping"); }}
          />
        )}
        {stage === "shipping" && (
          <ShippingStep onNext={() => onStageChange("delivery")} />
        )}
        {stage === "delivery" && (
          <DeliveryStep onNext={() => onStageChange("payment")} />
        )}
        {stage === "payment" && (
          <PaymentStep
            subtotal={subtotal}
            onAuthorised={() => onStageChange("confirmation")}
            onDeclined={() => onStageChange("declined")}
          />
        )}
        {stage === "confirmation" && (
          <ConfirmationStep cart={cart} subtotal={subtotal} isGuest={isGuest} />
        )}
        {stage === "declined" && (
          <DeclinedStep onRetry={() => onStageChange("payment")} />
        )}
      </div>
    </div>
  );
}