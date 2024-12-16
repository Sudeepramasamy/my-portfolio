import React from "react";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A Django-based platform for seamless online shopping.",
      technologies: ["Django", "Python", "SQLite"],
      link: "https://github.com/Sudeepramasamy/ecommerce-project",
    },
    {
      id: 2,
      title: "Stone-Paper-Scissors Game",
      description: "A 6-round game with interactive UI and database integration.",
      technologies: ["Python", "Django", "JavaScript"],
      link: "https://github.com/Sudeepramasamy/stone-paper-scissors",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive single-page portfolio showcasing my skills.",
      technologies: ["React", "CSS"],
      link: "https://sudeep-portfolio.com",
    },
  ];

  return (
    <div className="projects-section" id="projects">
      <h1>My Projects</h1>
      <p>Here are some of my featured works:</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <ul>
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
