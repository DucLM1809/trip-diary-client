import React from "react";
import {
  AboutSection,
  DestinationsSection,
  Footer,
  HeroSection,
  NavbarLandingPage,
  ServicesSection,
} from "../components";

const LandingPage = () => {
  return (
    <>
      <NavbarLandingPage />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DestinationsSection />
      <Footer />
    </>
  );
};

export default LandingPage;
