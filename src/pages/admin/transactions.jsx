import AdminTransactionsPage from "../../screens/admin/AdminTransactionsPage";
import { AdminLayout } from "../../layouts/AdminLayout";
import { AdminRoute } from "../../routes/AdminRoute";

function AdminTransactions() {
  return <AdminTransactionsPage />;
}

AdminTransactions.getLayout = (page) => (
  <AdminRoute>
    <AdminLayout>{page}</AdminLayout>
  </AdminRoute>
);

export default AdminTransactions;
