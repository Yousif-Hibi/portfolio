import React from "react";
import Card from "./card";
import "./projects.css";

function Projects() {
  const projectsData = [
    {
      title: "Souls-like Game (Unreal Engine 5)",
      description:
        "Action RPG with AI-driven enemy behavior using C++ and Gemini API for dynamic content generation.",
      previewLink: "https://github.com/Yousif-Hibi/SLAIN",
      codeLink: "https://github.com/Yousif-Hibi/SLAIN",
      imageUrl: "/slain.jpg",
      techStack: ["C++", "Unreal Engine 5", "Gemini API", "AI"],
    },
    {
      title: "Sencilia-MUSLALA",
      description:
        "React Native mobile app with Firestore backend for real-time data tracking and management.",
      previewLink: "https://beekeeping-8f7e6.web.app/",
      codeLink: "https://github.com/Yousif-Hibi/bee-keeping",
      imageUrl: "/beeeKeeping.png",
      techStack: ["React Native", "Firestore", "JavaScript"],
    },
    {
      title: "Keeper App",
      description:
        "Notes & task manager web app with persistent storage, deployed on Render.",
      previewLink: "https://yousif-hibi.github.io/Keeper/",
      codeLink: "https://github.com/Yousif-Hibi/Keeper",
      imageUrl: "/keeperApp.png",
      techStack: ["React", "JavaScript", "CSS"],
    },
    {
      title: "Secret Site",
      description:
        "Secure platform with Google OAuth login for anonymously storing personal secrets.",
      previewLink: "https://secretsite-1.onrender.com/",
      codeLink: "https://github.com/Yousif-Hibi/secretSite",
      imageUrl: "/secret.png",
      techStack: ["Authentication", "Google OAuth", "Security"],
    },
  ];

  return (
    <div className="projects-container">
      <h1 className="title">Projects</h1>
      <div className="cards-grid">
        {projectsData.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
            previewLink={project.previewLink}
            codeLink={project.codeLink}
            imageUrl={project.imageUrl}
            techStack={project.techStack}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
