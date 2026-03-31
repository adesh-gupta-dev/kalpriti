import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppSpinner } from "../../components/common/AppSpinner";
import { AdminLayout } from "../../layouts/AdminLayout";
import { AdminRoute } from "../../routes/AdminRoute";

function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/transactions");
  }, [router]);

  return <AppSpinner label="Redirecting to admin..." />;
}

AdminIndex.getLayout = (page) => (
  <AdminRoute>
    <AdminLayout>{page}</AdminLayout>
  </AdminRoute>
);

export default AdminIndex;
