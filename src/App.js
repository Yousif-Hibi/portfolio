import React, { useRef } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import GlowCursor from "./components/GlowCursor";
import About from "./components/about";
import Projects from "./components/projects";
import Contact from "./components/contact";
import "./App.css";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - window.innerHeight * 0.1;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <GlowCursor />
      <Header
        scrollToHome={() => scrollTo(homeRef)}
        scrollToAbout={() => scrollTo(aboutRef)}
        scrollToProjects={() => scrollTo(projectsRef)}
        scrollToContact={() => scrollTo(contactRef)}
      />
      <div className="App">
        <div ref={homeRef}>
          <Home scrollToContact={() => scrollTo(contactRef)} />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
