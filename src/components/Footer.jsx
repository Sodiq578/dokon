import React from 'react';
import './Footer.css'; // CSS faylni alohida yozamiz


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <h2>ЕСТЬ ВОПРОСЫ?</h2>
          <p>Мы всегда готовы помочь вам. Свяжитесь с нами или оставьте ваши контакты!</p>
        </div>
        <div className="footer-form">
          <form>
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Электронная почта" required />
            <textarea placeholder="Описание" required></textarea>
            <button type="submit">
              ОТПРАВИТЬ <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
