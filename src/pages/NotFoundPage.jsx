import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <SearchX className="h-12 w-12 text-primary" />
      <h1 className="mt-4 font-display text-3xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button as={Link} to="/dashboard" className="mt-6">
        Back to Dashboard
      </Button>
    </main>
  );
}
