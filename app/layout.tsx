import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FD MAKAN - Seal The Deal | Real Estate Excellence",
  description: "FD MAKAN - Your trusted partner in real estate. Find your dream property, sell with confidence, and seal the deal with our expert team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

