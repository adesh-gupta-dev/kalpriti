import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  History,
  Layers3,
  Rocket,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import { APP_NAME, PRICING_PLANS } from "../utils/constants";
import { formatCurrencyInr } from "../utils/formatters";

function HeroOrb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl ${className}`}
      aria-hidden="true"
    />
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="group h-full space-y-3 border-ink/10 bg-panel/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <span className="inline-flex rounded-xl bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </Card>
  );
}

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface text-ink">
      <HeroOrb className="-left-16 top-8 h-60 w-60 bg-sky-500/20" />
      <HeroOrb className="right-0 top-24 h-72 w-72 bg-emerald-400/20" />
      <HeroOrb className="bottom-10 left-1/3 h-72 w-72 bg-cyan-400/20" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-primary">
          {APP_NAME}
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button as={Link} href="/dashboard">
              Dashboard
            </Button>
          ) : (
            <>
              <Button as={Link} href="/login" variant="secondary" className="hidden sm:inline-flex">
                Login
              </Button>
              <Button as={Link} href="/register">
                Get Started
              </Button>
            </>
          )}
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI Website Builder Platform
            </span>

            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Build production-ready websites from a single prompt.
            </h1>

            <p className="max-w-xl text-base text-muted sm:text-lg">
              Kalpriti turns ideas into deployable web experiences with AI chat,
              code editing, version control, and instant live preview.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button as={Link} href={isAuthenticated ? "/projects/new" : "/register"} size="lg">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as={Link} href={isAuthenticated ? "/projects" : "/login"} variant="secondary" size="lg">
                View Demo Workflow
              </Button>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl border border-ink/10 bg-panel/70 p-3 text-center">
                <p className="font-display text-2xl font-bold text-primary">10x</p>
                <p className="text-xs text-muted">Faster Iteration</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-panel/70 p-3 text-center">
                <p className="font-display text-2xl font-bold text-primary">1-click</p>
                <p className="text-xs text-muted">Version Restore</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-panel/70 p-3 text-center">
                <p className="font-display text-2xl font-bold text-primary">Live</p>
                <p className="text-xs text-muted">Code Preview</p>
              </div>
            </div>
          </div>

          <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-b from-primary/10 to-panel">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="relative space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Builder Workspace
              </p>

              <div className="rounded-xl border border-ink/10 bg-surface p-3">
                <p className="text-xs text-muted">AI Chat</p>
                <p className="mt-1 text-sm">
                  “Create a clean SaaS landing page with pricing and testimonials.”
                </p>
              </div>

              <div className="rounded-xl border border-ink/10 bg-surface p-3">
                <p className="text-xs text-muted">Generated Output</p>
                <pre className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary">
                  &lt;section class="hero"&gt;...&lt;/section&gt;
                </pre>
              </div>

              <div className="rounded-xl border border-ink/10 bg-surface p-3">
                <p className="text-xs text-muted">Version</p>
                <p className="mt-1 text-sm">“Homepage refinement before launch”</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            icon={WandSparkles}
            title="Prompt to Website"
            description="Generate complete HTML/CSS/JS from natural language."
          />
          <FeatureCard
            icon={Code2}
            title="Monaco Code Editor"
            description="Refine code with syntax-aware editing in real time."
          />
          <FeatureCard
            icon={History}
            title="Version Control"
            description="Save, compare, restore, and remove project versions."
          />
          <FeatureCard
            icon={Layers3}
            title="Live Preview"
            description="Preview every update instantly with debounced rendering."
          />
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold">Simple credit-based plans</h2>
            <p className="mt-1 text-sm text-muted">
              Scale from personal projects to enterprise workflows.
            </p>
          </div>
          <Button as={Link} href={isAuthenticated ? "/pricing" : "/register"} variant="secondary">
            Full Pricing
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card key={plan.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {plan.credits} credits
                </span>
              </div>
              <p className="text-3xl font-bold">{formatCurrencyInr(plan.price)}</p>
              <p className="text-sm text-muted">{plan.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-t border-ink/10 bg-panel/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold">Ready to launch your next website faster?</h2>
            <p className="mt-1 text-sm text-muted">
              Start with Kalpriti and ship ideas into production quickly.
            </p>
          </div>
          <Button as={Link} href={isAuthenticated ? "/projects/new" : "/register"} size="lg">
            <Rocket className="h-4 w-4" />
            Build with AI
          </Button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-muted sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <span className="inline-flex items-center gap-1">
            <Bot className="h-4 w-4" />
            AI-powered Website Builder
          </span>
        </div>
      </footer>
    </main>
  );
}
