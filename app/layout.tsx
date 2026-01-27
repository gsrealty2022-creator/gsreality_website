import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GS Reality - Your Trusted Real Estate Partner | Excellence in Property",
  description: "GS Reality - Your trusted partner in real estate. Find your dream property, sell with confidence, and experience excellence with our expert team.",
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

