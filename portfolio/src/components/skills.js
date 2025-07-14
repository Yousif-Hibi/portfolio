import React from "react";
import "./skills.css";

const Skills = () => {
  const column1 = [
    { name: "JavaScript", logo: "/logos/javascript.png" },
    { name: "Python", logo: "/logos/python.png" },
    { name: "C++", logo: "/logos/cpp.png" },
    { name: "Java", logo: "/logos/java.png" },
    { name: "C#", logo: "/logos/csharp.png" },
    { name: "HTML", logo: "/logos/html.png" },
  ];

  const column2 = [
    { name: "postgresql", logo: "/logos/sql.png" },
    { name: "Firestore", logo: "/logos/firestore.png" },
    { name: "MongoDB", logo: "/logos/mongodb.png" },
    { name: "Automation Testing", logo: "/logos/automation.png" },
    { name: "Git", logo: "/logos/git.png" },
    { name: "CSS", logo: "/logos/css.png" },
  ];
  const column3 = [
    { name: "React", logo: "/logos/react.png" },
    { name: "React Native", logo: "/logos/react-native.png" },
    { name: "Unreal Engine 5", logo: "/logos/unreal.png" },
    { name: "REST API", logo: "/logos/restapi.png" },
    { name: "Postman", logo: "/logos/postman.png" },
  ];

  return (
    <div className="skills-container">
      <div className="skills-column">
        {column1.map((skill, index) => (
          <div key={index} className="skill-item">
            <img
              src={process.env.PUBLIC_URL + skill.logo}
              alt={skill.name}
              className="skill-logo"
            />
            <span className="skill-name">{skill.name}</span>
            <div className="orange-line top"></div>
            <div className="orange-line bottom"></div>
          </div>
        ))}
      </div>

      <div className="skills-column">
        {column2.map((skill, index) => (
          <div key={index} className="skill-item">
            <img
              src={process.env.PUBLIC_URL + skill.logo}
              alt={skill.name}
              className="skill-logo"
            />
            <span className="skill-name">{skill.name}</span>
            <div className="orange-line top"></div>
            <div className="orange-line bottom"></div>
          </div>
        ))}
      </div>
      <div className="skills-column">
        {column3.map((skill, index) => (
          <div key={index} className="skill-item">
            <img
              src={process.env.PUBLIC_URL + skill.logo}
              alt={skill.name}
              className="skill-logo"
            />
            <span className="skill-name">{skill.name}</span>
            <div className="orange-line top"></div>
            <div className="orange-line bottom"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
