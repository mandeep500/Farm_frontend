import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { APP_CONFIG } from "../lib/constants";

export const viewport: Viewport = {
  themeColor: "#1a3d29",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — Log In or Sign Up`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description:
    "Log in to Sekhon Farm to access your patron portal, seasonal organic harvest updates, and regenerative agriculture community.",
  keywords: [
    "Sekhon Farm",
    "Log in",
    "Sign up",
    "Organic Farm",
    "Regenerative Agriculture",
    "Non-GMO Produce",
  ],
  authors: [{ name: "Sekhon Farm Estate" }],
  creator: "Sekhon Farm",
  metadataBase: new URL("https://sekhonfarm.com"),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900 font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
