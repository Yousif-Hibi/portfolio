import React from "react";
import ReactDOM from "react-dom/client";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="userName">
        <h1>Yousif Hibi</h1>
      </div>
      <div className="redirectionButtons bottum">
        <div className="gitHub linkBtn">
          <a
            href="https://github.com/Yousif-Hibi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              <img
                src="/github-mark.png"
                width={30}
                height={30}
                alt="GitHub"
              ></img>
            </button>
          </a>
        </div>
        <div className="linkedin linkBtn">
          <a
            href="https://www.linkedin.com/in/yousif-hibi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              <img
                src="/linkedin.png"
                width={30}
                height={30}
                alt="LinkedIn"
              ></img>
            </button>
          </a>
        </div>
        <div className="email linkBtn">
          <a href="mailto:yousif.hibi@gmail.com">
            <button>
              <img src="/gmail.png" width={30} height={30} alt="Email"></img>
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
