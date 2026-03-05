import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <ShieldX className="h-12 w-12 text-danger" />
      <h1 className="mt-4 font-display text-3xl font-bold">Unauthorized</h1>
      <p className="mt-2 text-sm text-muted">
        You do not have permission to access this resource.
      </p>
      <Button as={Link} to="/dashboard" className="mt-6">
        Back to Dashboard
      </Button>
    </main>
  );
}
