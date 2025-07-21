import useRef from "react";
import "./header.css";

function Header({
  scrollToHome,
  scrollToAbout,
  scrollToProjects,
  scrollToContact,
}) {
  return (
    <header>
      <div className="userName">
        <h1>Yousif Hibi</h1>
      </div>
      <div className="redirectionButtons">
        <div className="Home">
          <button className="headerbtn" onClick={scrollToHome}>
            Home
          </button>
        </div>

        <button className="headerbtn" onClick={scrollToAbout}>
          about
        </button>

        <button className="headerbtn" onClick={scrollToProjects}>
          projects
        </button>

        <button className="headerbtn" onClick={scrollToContact}>
          contact
        </button>
      </div>
    </header>
  );
}

export default Header;
