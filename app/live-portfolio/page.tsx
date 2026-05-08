import Navbar from "@/components/Navbar";
import LivePortfolioExpanded from "@/components/LivePortfolioExpanded";
import Footer from "@/components/Footer";

export default function LivePortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <LivePortfolioExpanded />
      </main>
      <Footer />
    </>
  );
}
