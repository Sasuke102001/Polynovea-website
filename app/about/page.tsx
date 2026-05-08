"use client";

import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const About = dynamic(() => import("@/components/About"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
