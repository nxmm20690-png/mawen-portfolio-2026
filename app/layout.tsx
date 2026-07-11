import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "马文-作品集15796598436",
  description: "马文作品集",
  openGraph: {
    title: "马文-作品集15796598436",
    description: "马文作品集",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "马文-作品集15796598436",
    description: "马文作品集",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
