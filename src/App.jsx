import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import ProjectsSection from "./Components/ProjectsSection";
import SkillsSection from "./Components/SkillsSection";
import CertificationsSection from "./Components/CertificationsSection";
import ContactSection from "./Components/ContactSection";
import Footer from "./Components/Footer";
import BackToTop from "./Components/BackToTop";
import { Toaster } from "./Components/ui/toaster";

function App() {
  useEffect(() => {
    // Smooth scroll behavior for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}

export default App;