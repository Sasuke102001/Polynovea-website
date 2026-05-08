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
  title: "Polynovea — Music Intelligence Platform",
  description:
    "Not creative. Not consulting. Something else. The behavioral intelligence layer that converts shows into measurable outcomes.",
  openGraph: {
    title: "Polynovea",
    description: "Music Intelligence Platform",
    siteName: "Polynovea",
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
