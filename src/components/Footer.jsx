import React from 'react';
// import '../components/Footer'; // CSS faylini import qilamiz

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>MyWebsite</h1>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="#" className="social-icon">FB</a>
          <a href="#" className="social-icon">TW</a>
          <a href="#" className="social-icon">IG</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
