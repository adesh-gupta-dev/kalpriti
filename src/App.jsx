import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#111827" : "#ffffff",
          color: theme === "dark" ? "#f9fafb" : "#0f172a",
          border: theme === "dark" ? "1px solid #334155" : "1px solid #e5e7eb",
        },
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemedToaster />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
