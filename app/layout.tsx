import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
