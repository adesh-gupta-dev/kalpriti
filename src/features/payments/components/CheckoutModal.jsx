import { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import toast from "react-hot-toast";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { STRIPE_PUBLISHABLE_KEY } from "../../../utils/constants";
import { formatCurrencyInr } from "../../../utils/formatters";
import { confirmTransaction } from "../../../api/paymentApi";

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

function CheckoutForm({ onSuccess, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.href,
      },
    });
    setSubmitting(false);

    if (error) {
      toast.error(error.message || "Payment failed");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        await confirmTransaction(paymentIntent.id);
      } catch (confirmError) {
        toast.error(
          confirmError.response?.data?.message ||
            "Payment succeeded but credits sync failed. Please refresh shortly.",
        );
        return;
      }

      toast.success("Payment processed successfully");
      onSuccess?.();
      return;
    }

    if (paymentIntent?.status === "processing") {
      toast("Payment is processing. Credits will be added once Stripe confirms.");
      onSuccess?.();
      return;
    }

    toast.error("Payment was not completed. Please try again.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-primary/10 p-3 text-sm text-primary">
        Amount payable: {formatCurrencyInr(amount)}
      </div>
      <PaymentElement />
      <Button type="submit" className="w-full" loading={submitting}>
        Confirm Payment
      </Button>
    </form>
  );
}

export function CheckoutModal({
  open,
  onClose,
  clientSecret,
  selectedPlan,
  onSuccess,
}) {
  if (!selectedPlan) return null;

  const stripeUnavailable = !stripePromise;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Checkout - ${selectedPlan.name}`}
      description={`${selectedPlan.credits} credits for ${formatCurrencyInr(selectedPlan.price)}`}
      className="max-w-xl"
    >
      {stripeUnavailable ? (
        <div className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
          Stripe key is missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in your environment.
        </div>
      ) : null}

      {!stripeUnavailable && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onSuccess={onSuccess} amount={selectedPlan.price} />
        </Elements>
      ) : null}

      {!stripeUnavailable && !clientSecret ? (
        <div className="rounded-xl border border-ink/10 bg-panel/70 p-4 text-sm text-muted">
          Preparing secure checkout...
        </div>
      ) : null}
    </Modal>
  );
}
