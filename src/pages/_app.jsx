import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { APP_NAME } from "../utils/constants";
import "../index.css";

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

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const defaultTitle = `${APP_NAME} | AI Website Builder`;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Head>
          <title>{defaultTitle}</title>
          <meta
            name="description"
            content="Kalpriti - AI-powered website builder platform"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/site.webmanifest" />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ThemedToaster />
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </ThemeProvider>
  );
}
