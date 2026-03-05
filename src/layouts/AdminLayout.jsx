import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, CreditCard, LogOut, Shield, Home } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { Button } from "../components/ui/Button";

const adminNavItems = [
  {
    to: "/admin/transactions",
    label: "Transactions",
    icon: CreditCard,
  },
  {
    to: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-ink/10 bg-panel/80 p-4 backdrop-blur">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-6 inline-flex items-center gap-2 font-display text-xl font-bold text-primary"
          >
            <Shield className="h-5 w-5" />
            Admin Panel
          </button>

          <nav className="space-y-2">
            <Button as={NavLink} to="/dashboard" variant="ghost" className="w-full justify-start">
              <Home className="h-4 w-4" />
              Back to App
            </Button>

            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-ink/5 hover:text-ink"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-surface/90 px-4 py-3 backdrop-blur sm:px-6">
            <div>
              <p className="text-sm text-muted">Signed in as</p>
              <p className="text-sm font-semibold">{user?.name} ({user?.role})</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="secondary" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
