import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function ServerErrorPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <TriangleAlert className="h-12 w-12 text-warning" />
      <h1 className="mt-4 font-display text-3xl font-bold">Server Error</h1>
      <p className="mt-2 text-sm text-muted">
        We could not complete this request due to an internal issue.
      </p>
      <Button as={Link} to="/dashboard" className="mt-6">
        Back to Dashboard
      </Button>
    </main>
  );
}
