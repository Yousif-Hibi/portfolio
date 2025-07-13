import React from "react";
import ReactDOM from "react-dom/client";
import "./aboutParagraph.css";





function AboutParagraph() {
    return (
      <>
        <p className="aboutP">
          <strong>Full-Stack Engineer | From Databases to Game Engines</strong>
          <br />
          Hey, I'm Yousif. A recent Software Engineering grad who loves
          <br />
          connecting dots across the stack - whether it's
          <strong> React frontends,</strong>
          <br />
          <strong>Firestore backends, or Unreal Engine gameplay</strong>. My
          sweet spot?
          <br />
          Building complete systems where AI spices up the experience (like
          Gemini API ).
          <br />
          <strong> Where I thrive:</strong>
          <br />
          <p className="square">Frontend</p> → Crafting smooth UIs with React
          <br />
          <p className="square">Backend</p> → Wiring up databases & APIs
          <br />
          <p className="square">Testing</p> → Automating QA with Selenium/Pytest
          Game
          <br />
          <p className="square">Dev</p> → Building C++ mechanics in Unreal
          Engine 5
          <br />
          Off-screen: Optimizing my dev setup, exploring AI tools, or debugging
          that one CSS bug that should work.
        </p>
      </>
    );
}
export default AboutParagraph;
