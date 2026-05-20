import { useState } from "react";
import MagneticCursor from "./components/MagneticCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ResearchSection from "./components/ResearchSection";
import ProjectsSection from "./components/ProjectsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <MagneticCursor />
      <ScrollProgress />
      <BackToTop />
      <PageLoader onComplete={() => setLoaded(true)} />
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}>
        <Navbar />
        <HeroSection loaded={loaded} />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ResearchSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
