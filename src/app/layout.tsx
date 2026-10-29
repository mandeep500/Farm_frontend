import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { APP_CONFIG } from "../lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a3d29",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — Purity, Heritage & Sustainable Agriculture`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description:
    "Discover Sekhon Farm: 100% chemical-free organic produce, heirloom onions, potatoes, tender lady finger, sweet carrots, living soil stewardship, and generational agricultural trust.",
  keywords: [
    "Sekhon Farm",
    "Organic Farm",
    "Fresh Vegetables",
    "Heirloom Produce",
    "Lady Finger Okra",
    "Organic Onions",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900 font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
