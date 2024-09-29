import React from 'react';
import './Footer.css';
import Logo from '../img/logo.svg'; // Logo manzilingiz

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo-section">
        <img src={Logo} alt="Logo" className="footer-logo" />
        <p className="footer-text">Мы гордимся нашим исключительным обслуживанием клиентов и вниманием к деталям.</p>
      </div>
      <div className="footer-section links-section">
        <ul className="footer-links">
          <li>Home</li>
          <li>Products</li>
          <li>About Us</li>
          <li>Blog</li>
          <li>Contacts</li>
        </ul>
      </div>
      <div className="footer-section contact-section">
        <p>Contacts</p>
        <p>+998 90 333 30 03</p>
        <p>info@samist.com</p>
      </div>
    </footer>
  );
};

export default Footer;
