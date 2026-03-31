import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  UserCircle2,
  BriefcaseBusiness,
  WalletCards,
  LogOut,
  Menu,
  Shield,
  Globe2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { NavLink } from "../components/common/NavLink";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../contexts/AuthContext";
import { APP_NAME, LOW_CREDIT_THRESHOLD } from "../utils/constants";
import { canAccessAdmin } from "../utils/permissions";
import { cn } from "../utils/cn";

const baseNavItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: BriefcaseBusiness,
  },
  {
    to: "/community",
    label: "Community",
    icon: Globe2,
  },
  {
    to: "/pricing",
    label: "Pricing",
    icon: WalletCards,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserCircle2,
  },
];

export function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navItems = [
    ...baseNavItems,
    ...(canAccessAdmin(user)
      ? [
          {
            to: "/admin/transactions",
            label: "Admin",
            icon: Shield,
          },
        ]
      : []),
  ];

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [router.asPath]);

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="font-display text-lg font-bold tracking-tight text-primary"
          >
            {APP_NAME}
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  href={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
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

          <div className="flex items-center gap-2">
            <Badge
              tone={
                user?.credits <= LOW_CREDIT_THRESHOLD ? "warning" : "accent"
              }
            >
              Credits: {user?.credits ?? 0}
            </Badge>
            <ThemeToggle />
            <Button
              variant="secondary"
              className="hidden sm:inline-flex"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Button
              variant="ghost"
              className="h-10 w-10 px-0 py-0 rounded-full md:hidden"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-app-nav"
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? (
                <X className="m-0" size={25} />
              ) : (
                <Menu size={36} className="m-0 w-6 h-6" />
              )}
              <span className="sr-only">
                {isMobileNavOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"}
              </span>
            </Button>
          </div>
        </div>

        <nav
          id="mobile-app-nav"
          className={cn(
            "mx-auto max-w-7xl px-4 pb-3 md:hidden sm:px-6 lg:px-8",
            isMobileNavOpen ? "block" : "hidden",
          )}
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-panel/80 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  href={item.to}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-ink/5 hover:text-ink",
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </header>

      {user?.credits <= LOW_CREDIT_THRESHOLD ? (
        <div className="border-b border-warning/30 bg-warning/10">
          <div className="mx-auto max-w-7xl px-4 py-2 text-sm text-warning sm:px-6 lg:px-8">
            Credits running low. Visit pricing to top up and avoid generation
            failures.
          </div>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
