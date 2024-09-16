import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaProjectDiagram, FaInfoCircle, FaEnvelope, FaList, FaInfoCircle as FaAdditionalInfo } from 'react-icons/fa'; // Ikonlarni import qilish
import Logo from "../img/logo.svg";
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleNavItemClick = () => {
    if (showNavbar) {
      setShowNavbar(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="nav-wrapper">
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
            <div className={`overlay ${showNavbar ? "active" : ""}`} onClick={handleShowNavbar}></div>
            <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
              
              <ul>
                <li>
                  <NavLink to="/" onClick={handleNavItemClick}><FaHome /> Home</NavLink>
                </li>
                <li>
                  <NavLink to="/blogs" onClick={handleNavItemClick}><FaRegFileAlt /> Blogs</NavLink>
                </li>
                <li>
                  <NavLink to="/projects" onClick={handleNavItemClick}><FaProjectDiagram /> Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/about" onClick={handleNavItemClick}><FaInfoCircle /> About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={handleNavItemClick}><FaEnvelope /> Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <footer className="bottom-navbar">
        <NavLink to="/" onClick={handleNavItemClick}><FaHome /> Home</NavLink>
        <NavLink to="/blogs" onClick={handleNavItemClick}><FaRegFileAlt /> Blogs</NavLink>
        <NavLink to="/projects" onClick={handleNavItemClick}><FaProjectDiagram /> Projects</NavLink>
        <NavLink to="/about" onClick={handleNavItemClick}><FaAdditionalInfo /> About</NavLink>
        <NavLink to="/contact" onClick={handleNavItemClick}><FaEnvelope /> Contact</NavLink>
      </footer>
    </>
  );
};

export default Navbar;
