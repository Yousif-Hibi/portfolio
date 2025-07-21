import React from "react";
import "./card.css";

function Card({
  title,
  description,
  previewLink,
  codeLink,
  imageUrl,
  techStack,
}) {
  return (
    <div className="card">
      <div
        className="card__img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="card__descr-wrapper">
        <p className="card__title">{title}</p>
        <p className="card__descr">{description}</p>
        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="card__links">
          <div>
            <a
              className="link"
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
            </a>
          </div>
          <div>
            <a
              className="link"
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
