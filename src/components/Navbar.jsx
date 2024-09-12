import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../img/logo.svg";
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <div className="hamburger-icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <span className="close-icon" onClick={handleShowNavbar}>&times;</span>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="browse-categories">
              <NavLink to="/categories">Browse Categories</NavLink>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
