import React from 'react';
import './Footer.css'; // CSS faylini import qilamiz

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h6>About Us</h6>
          <p>
            Our mission is to empower aspiring programmers with the knowledge they need to succeed. Join us as we simplify coding concepts and enhance your skills.
          </p>
        </div>

        <div className="footer-section services">
          <h6>Services</h6>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Mobile App Development</a></li>
            <li><a href="#">UI/UX Design</a></li>
            <li><a href="#">Consulting</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h6>Contact Us</h6>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
          <p>Phone: <a href="tel:+123456789">+1 (234) 567-890</a></p>
        </div>

        <div className="footer-section social">
          <h6>Follow Us</h6>
          <ul className="social-icons">
            <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
            <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
            <li><a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="#" className="instagram"><i className="fa fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 All Rights Reserved | <a href="#">YourCompanyName</a></p>
      </div>
    </footer>
  );
};

export default Footer;
