import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaRegFileAlt, FaProjectDiagram, FaInfoCircle, FaEnvelope, FaInfoCircle as FaAdditionalInfo } from 'react-icons/fa'; // Ikonlarni import qilish
import Logo from "../img/logo.svg";
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const [showBottomNavbar, setShowBottomNavbar] = React.useState(true);
  const [scrollDirection, setScrollDirection] = React.useState('up');
  const lastScrollTop = React.useRef(0);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleNavItemClick = () => {
    if (showNavbar) {
      setShowNavbar(false);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollTop.current = currentScrollTop;

      setShowBottomNavbar(scrollDirection === 'up' || currentScrollTop < 50); // Adjust scroll position as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  return (
    <>
      <nav className={`navbar ${scrollDirection === 'down' && !showBottomNavbar ? 'hidden' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
            
            <div className={`overlay ${showNavbar ? "active" : ""}`} onClick={handleShowNavbar}></div>
            <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
              <ul>
                <li>
                  <NavLink to="/" onClick={handleNavItemClick}>
                    <FaHome />
                    <span className="nav-text">Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blogs" onClick={handleNavItemClick}>
                    <FaRegFileAlt />
                    <span className="nav-text">Blogs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/projects" onClick={handleNavItemClick}>
                    <FaProjectDiagram />
                    <span className="nav-text">Projects</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" onClick={handleNavItemClick}>
                    <FaInfoCircle />
                    <span className="nav-text">About</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={handleNavItemClick}>
                    <FaEnvelope />
                    <span className="nav-text">Contact</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {showBottomNavbar && (
        <footer className="bottom-navbar">
          <NavLink to="/" onClick={handleNavItemClick}>
            <FaHome />
            <span className="bottom-text">Home</span>
          </NavLink>
          <NavLink to="/blogs" onClick={handleNavItemClick}>
            <FaRegFileAlt />
            <span className="bottom-text">Blogs</span>
          </NavLink>
          <NavLink to="/projects" onClick={handleNavItemClick}>
            <FaProjectDiagram />
            <span className="bottom-text">Projects</span>
          </NavLink>
          <NavLink to="/about" onClick={handleNavItemClick}>
            <FaAdditionalInfo />
            <span className="bottom-text">About</span>
          </NavLink>
          <NavLink to="/contact" onClick={handleNavItemClick}>
            <FaEnvelope />
            <span className="bottom-text">Contact</span>
          </NavLink>
        </footer>
      )}
    </>
  );
};

export default Navbar;
