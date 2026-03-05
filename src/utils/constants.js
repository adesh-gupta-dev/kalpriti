export const APP_NAME = "Kalpriti";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000";

export const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() || "";

export const LOW_CREDIT_THRESHOLD = 5;

export const PRICING_PLANS = [
  {
    id: "plan_basic_10",
    name: "Basic",
    price: 50,
    credits: 20,
    description: "Ideal for individuals starting out with basic website needs.",
  },
  {
    id: "plan_pro_50",
    name: "Pro",
    price: 150,
    credits: 150,
    description: "Best for freelancers and creators shipping fast.",
  },
  {
    id: "plan_enterprise_150",
    name: "Enterprise",
    price: 500,
    credits: 700,
    description: "For teams building and iterating at scale.",
  },
];
