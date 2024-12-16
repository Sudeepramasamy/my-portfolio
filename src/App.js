import React from "react";
import Navbar from './components/Navbar';

import "./App.css";
import "./components/About.css";
import Projects from "./components/Projects";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="section" id="home">
        <h1>Welcome to My Portfolio</h1>
        <p>I am a Full-Stack Developer!</p>
      </div>
      <div className="about-section" id="about">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <p className="about-text">
          Hi, I'm <span className="highlight">Sudeep</span>, a passionate and dedicated 
          <span className="highlight"> Full Stack Web Developer</span> with expertise in 
          creating dynamic, user-friendly websites and applications. With a strong foundation 
          in <span className="highlight">Python, Django, and React</span>, I thrive on bringing ideas 
          to life through code.
        </p>
        <p className="about-text">
          I have a keen interest in crafting seamless user experiences, and I'm always 
          eager to learn new technologies and improve my skills. My background in 
          <span className="highlight"> biotechnology</span> adds a unique perspective to my approach, 
          combining analytical thinking with creative problem-solving.
        </p>
        <p className="about-text">
          When I'm not coding, I enjoy exploring new technologies, contributing to open-source 
          projects, and staying updated with the latest trends in web development.
        </p>
      </div>
      </div>
      <Projects/>
      <div className="section" id="contact">
        <h1>Contact Me</h1>
        <p>Feel free to reach out via email or LinkedIn!</p>
      </div>
    </>
  );
};

export default App;
