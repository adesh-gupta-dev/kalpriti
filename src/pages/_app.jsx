import Head from "next/head";
import { Sora, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { APP_NAME } from "../utils/constants";
import "../index.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

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
        <div className={`${sora.variable} ${spaceGrotesk.variable}`}>
          <Head>
            <title>{APP_NAME}</title>
          <meta
            name="description"
            content="Kalpriti - AI-powered website builder platform"
          />
          
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#0e7490" />
            



          </Head>
          <ThemedToaster />
          {getLayout(<Component {...pageProps} />)}
              


        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
