import PricingPage from "../screens/PricingPage";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";

function Pricing() {
  return <PricingPage />;
}

Pricing.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default Pricing;
