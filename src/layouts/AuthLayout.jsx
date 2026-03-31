import { useRouter } from "next/router";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { APP_NAME } from "../utils/constants";

export function AuthLayout({ children }) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-surface text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(2,132,199,0.16),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_40%_95%,rgba(34,197,94,0.1),transparent_30%)]" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-display text-xl font-bold text-primary"
        >
          {APP_NAME}
        </button>
        <ThemeToggle />
      </header>
      <main className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-panel/95 p-6 shadow-soft sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
