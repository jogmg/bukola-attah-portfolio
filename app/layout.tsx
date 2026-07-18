import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  display: "swap",
});

const playFair_Display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["ui-serif", "serif"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  fallback: ["monospace"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bukola Social - Digital Influence",
  description: "Elevate your digital influence with Bukola Social Management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playFair_Display.variable} ${outfit.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
