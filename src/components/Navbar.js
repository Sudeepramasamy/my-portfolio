import React ,{useState} from "react";
import "./Navbar.css";
import {FaBars} from "react-icons/fa";


const Navbar = () => {
  const[isOpen,setIsOpen]=useState(false);
  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const toggleNavbar=()=>{
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Sudeep</div>
      <button className="navbar-toggler" onClick={toggleNavbar}>
        <FaBars className="toggler-icon"/>
      </button>
      <ul className={`nav-links ${isOpen? "active" : ""}`}>
        <li onClick={() => handleScroll("home")}>Home</li>
        <li onClick={() => handleScroll("about")}>About</li>
        <li onClick={() => handleScroll("projects")}>Projects</li>
        <li onClick={() => handleScroll("contact")}>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
