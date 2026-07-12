import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "马文作品集 | 视觉设计师",
  description:
    "马文个人作品集，展示KV海报、三维渲染、产品详情、包装和平面物料等电商视觉设计能力。",
  openGraph: {
    title: "马文作品集 | 视觉设计师",
    description:
      "8年电商视觉设计经验，专注母婴与儿童食品类目，覆盖KV、详情页、包装及线下物料设计。",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "马文作品集 | 视觉设计师",
    description:
      "8年电商视觉设计经验，专注母婴与儿童食品类目，覆盖KV、详情页、包装及线下物料设计。",
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
