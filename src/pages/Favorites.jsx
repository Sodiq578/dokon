// Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHeart } from 'react-icons/io';
import './Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <img src={item.image} alt={item.title} className="favorite-item-image" />
              <div className="favorite-item-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <div className="favorite-actions">
                  <Link to={`/product/${item.id}`} className="favorite-details-link">
                    View Details
                  </Link>
                  
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite products.</p>
      )}
    </div>
  );
};

export default Favorites;
