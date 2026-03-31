import DashboardPage from "../screens/DashboardPage";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";

function Dashboard() {
  return <DashboardPage />;
}

Dashboard.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default Dashboard;
