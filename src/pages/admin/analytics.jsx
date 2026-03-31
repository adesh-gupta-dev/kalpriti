import AdminAnalyticsPage from "../../screens/admin/AdminAnalyticsPage";
import { AdminLayout } from "../../layouts/AdminLayout";
import { AdminRoute } from "../../routes/AdminRoute";

function AdminAnalytics() {
  return <AdminAnalyticsPage />;
}

AdminAnalytics.getLayout = (page) => (
  <AdminRoute>
    <AdminLayout>{page}</AdminLayout>
  </AdminRoute>
);

export default AdminAnalytics;
