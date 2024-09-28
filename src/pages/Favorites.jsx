import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Favorites.css'; // CSS faylini import qilish

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Sevimli mahsulotlar</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <img src={item.image} alt={item.title} className="favorite-item-image" />
              <div className="favorite-item-info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <div className="favorite-actions">
                  <Link to={`/product/${item.id}`} className="favorite-details-link">
                    To'liq ma'lumot
                  </Link>
                  <FaStar className="favorite-icon" title="Sevimli" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Sevimli mahsulotlaringiz yo'q.</p>
      )}
    </div>
  );
};

export default Favorites;
