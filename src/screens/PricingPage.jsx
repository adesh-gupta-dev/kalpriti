import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { PRICING_PLANS } from "../utils/constants";
import { Card } from "../components/ui/Card";
import { PricingCard } from "../features/payments/components/PricingCard";
import { TransactionTable } from "../features/payments/components/TransactionTable";
import { createTransaction, getTransactions } from "../api/paymentApi";
import { useAuth } from "../contexts/AuthContext";

const CheckoutModal = dynamic(
  () =>
    import("../features/payments/components/CheckoutModal").then(
      (module) => module.CheckoutModal,
    ),
  { ssr: false, loading: () => null },
);

export default function PricingPage() {
  const { user, refreshProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loadingPlanId, setLoadingPlanId] = useState("");
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Kalpriti Credits",
      description: "Purchase credits and continue generating websites with Kalpriti.",
      brand: { "@type": "Brand", name: "Kalpriti" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        offerCount: PRICING_PLANS.length,
      },
    }),
    [],
  );

  async function fetchTransactions() {
    try {
      const response = await getTransactions();
      setTransactions(response.transactions || []);
    } catch (_error) {
      setTransactions([]);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleSelectPlan(plan) {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
    setClientSecret("");
    setLoadingPlanId(plan.id);

    try {
      const response = await createTransaction({
        planId: plan.id,
        totalPrice: plan.price,
      });
      setClientSecret(response.clientSecret || "");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to initialize checkout");
      setCheckoutOpen(false);
      setSelectedPlan(null);
    } finally {
      setLoadingPlanId("");
    }
  }

  async function handleCheckoutSuccess() {
    setCheckoutOpen(false);
    await fetchTransactions();
    await refreshProfile();
  }

  return (
    <section className="space-y-6">
      <Head>
        <title>Kalpriti Pricing | Plans & Credits</title>
        <meta
          name="description"
          content="Purchase credits and continue generating websites with Kalpriti."
        />
        <meta
          name="keywords"
          content="AI website builder pricing, website builder plans, credits for AI website builder, Kalpriti pricing, SaaS website builder pricing, AI web design subscription"
        />
        <meta property="og:title" content="Kalpriti Pricing | Plans & Credits" />
        <meta
          property="og:description"
          content="Purchase credits and continue generating websites with Kalpriti."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kalpriti.vercel.app/pricing" />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div>
        <h1 className="font-display text-3xl font-bold">Plans & Credits</h1>
        <p className="mt-1 text-sm text-muted">
          Purchase credits and continue generating websites with Kalpriti.
        </p>
      </div>

      {user?.credits <= 5 ? (
        <Card className="flex items-start gap-3 border-warning/30 bg-warning/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
          <div>
            <h2 className="font-display text-base font-semibold text-warning">Low credit warning</h2>
            <p className="text-sm text-warning/90">
              You have {user.credits} credits left. Purchase a plan to avoid interruptions.
            </p>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelectPlan}
            loading={loadingPlanId === plan.id}
          />
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Transaction History</h2>
        <TransactionTable transactions={transactions} />
      </section>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        clientSecret={clientSecret}
        selectedPlan={selectedPlan}
        onSuccess={handleCheckoutSuccess}
      />
    </section>
  );
}
