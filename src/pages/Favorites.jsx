import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from 'react-icons/io';
import './Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  const handleDelete = (itemId) => {
    // Removes item from favorites list
    removeFromFavorites(itemId);
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <Link to={`/product/${item.id}`} className="favorite-item-link">
                <img src={item.image} alt={item.title} className="favorite-item-image" />
                <div className="favorite-item-info">
                  <h4 className="title-truncated">{item.title}</h4>
                  <p className="description-truncated">{item.description}</p>
                  <p>${item.price}</p>
                </div>
              </Link>
              <div className="favorite-actions">
                <IoIosHeartEmpty
                  className="favorite-icon red-icon"
                  onClick={() => handleDelete(item.id)}
                  title="Remove from Favorites"
                />
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
