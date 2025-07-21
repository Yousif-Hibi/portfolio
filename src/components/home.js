import React from "react";
import ReactDOM from "react-dom/client";
import "./home.css";

function Home({ scrollToContact }) {
  function downloadResume() {
    const link = document.createElement("a");
    link.href = "/YousifHibiCV.pdf";
    link.download = "YousifHibiCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="home ">
        <div className="container">
          <div className="text">
            <h1>
              {" "}
              Hello ,<br /> I'm Yousif Hibi
              <br />
            </h1>
            <h1 className="job">Software Engineer</h1>
            <button className="CountentBtn" onClick={scrollToContact}>
              Contact{" "}
            </button>
            <button className="resume Btn" onClick={downloadResume}>
              Resume
            </button>
          </div>
          <div className="photo">
            <img className="imgs" src="/personal.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
