import { CheckoutState, Step } from "../App";
import { AuthStep } from "./AuthStep";
import { ShippingStep } from "./ShippingStep";
import { DeliveryStep } from "./DeliveryStep";
import { PaymentStep } from "./PaymentStep";
import { ReviewStep } from "./ReviewStep";
import { ConfirmationStep } from "./ConfirmationStep";

interface Props {
  step: Step;
  state: CheckoutState;
  onUpdate: (partial: Partial<CheckoutState>) => void;
  onNext: () => void;
  onGoTo: (step: Step) => void;
}

export const __preview = {
  step: "shipping" as Step,
  state: {
    items: [{ id: "sku-001", name: "Wireless Headphones", qty: 1, price: 79.99 }],
    isLoggedIn: false,
    guestEmail: "",
    shipping: { fullName: "", address: "", city: "", postcode: "", country: "" },
    deliveryMethod: "",
    payment: { cardNumber: "", expiry: "", cvv: "", nameOnCard: "" },
  },
  onUpdate: () => {},
  onNext: () => {},
  onGoTo: () => {},
};

export function CheckoutFlow({ step, state, onUpdate, onNext, onGoTo }: Props) {
  switch (step) {
    case "auth":
      return (
        <AuthStep
          isLoggedIn={state.isLoggedIn}
          guestEmail={state.guestEmail}
          onUpdate={(v) => onUpdate(v)}
          onNext={onNext}
        />
      );
    case "shipping":
      return (
        <ShippingStep
          shipping={state.shipping}
          onUpdate={(shipping) => onUpdate({ shipping })}
          onNext={onNext}
        />
      );
    case "delivery":
      return (
        <DeliveryStep
          selected={state.deliveryMethod}
          onSelect={(deliveryMethod) => onUpdate({ deliveryMethod })}
          onNext={onNext}
        />
      );
    case "payment":
      return (
        <PaymentStep
          payment={state.payment}
          onUpdate={(payment) => onUpdate({ payment })}
          onNext={onNext}
        />
      );
    case "review":
      return (
        <ReviewStep
          state={state}
          onNext={onNext}
          onGoTo={onGoTo}
        />
      );
    case "confirmation":
      return <ConfirmationStep state={state} />;
    default:
      return null;
  }
}