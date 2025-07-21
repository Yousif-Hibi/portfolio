import React from "react";
import "./about.css";
import AboutParagraph from "./aboutParagraph";
import Skills from "./skills";

function About() {
  return (
    <>
      <div className="about">
        <h1 className="title">About ME</h1>
        <div className="aboutcontainer">
          <div className="aboutParagraph">
            <AboutParagraph />
          </div>

          <div className="skillcontainer">
            <Skills />
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
