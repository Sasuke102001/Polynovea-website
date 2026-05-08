import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import TiltEffect from "@/components/TiltEffect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polynovea — Behavioral Intelligence Framework",
  description:
    "An AI and data company building the behavioral intelligence layer. We observe decisions, extract patterns, and convert them into repeatable frameworks — across domains.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Polynovea",
    description: "Behavioral Intelligence Framework",
    siteName: "Polynovea",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CustomCursor />
        <ScrollReveal />
        <TiltEffect />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
