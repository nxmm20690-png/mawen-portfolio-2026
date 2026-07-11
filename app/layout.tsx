import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "马文个人作品集 | 品牌视觉与产品设计官网",
  description:
    "马文个人作品集官网，展示 KV 海报、三维渲染、产品详情和线下平面物料构成的完整品牌视觉系统。",
  openGraph: {
    title: "马文个人作品集 | 品牌视觉与产品设计官网",
    description:
      "从活动 KV、三维渲染、产品详情到线下物料，呈现完整的品牌视觉项目官网。",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "马文个人作品集 | 品牌视觉与产品设计官网",
    description:
      "从活动 KV、三维渲染、产品详情到线下物料，呈现完整的品牌视觉项目官网。",
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
