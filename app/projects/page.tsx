import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectsExpanded />
      </main>
      <Footer />
    </>
  );
}
