import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Architecture from "@/components/Architecture";
import WhoWeAre from "@/components/WhoWeAre";
import Projects from "@/components/Projects";
import LivePortfolio from "@/components/LivePortfolio";
import WhyDifferent from "@/components/WhyDifferent";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Architecture />
        <WhyDifferent />
        <WhoWeAre />
        <Projects />
        <LivePortfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
