import React from 'react';
import './Footer.css'; // CSS faylni alohida yozamiz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Компания</h4>
            <ul>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Наши услуги</a></li>
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Партнёрская программа</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Получить помощь</h4>
            <ul>
              <li><a href="#">Часто задаваемые вопросы</a></li>
              <li><a href="#">Доставка</a></li>
              <li><a href="#">Возвраты</a></li>
              <li><a href="#">Статус заказа</a></li>
              <li><a href="#">Способы оплаты</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Интернет-магазин</h4>
            <ul>
              <li><a href="#">Часы</a></li>
              <li><a href="#">Сумка</a></li>
              <li><a href="#">Обувь</a></li>
              <li><a href="#">Платье</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Следите за нами</h4>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
