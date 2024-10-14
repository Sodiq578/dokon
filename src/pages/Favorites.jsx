import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './Favorites.css';

const Favorites = ({ favorites, setFavorites }) => {
  const [likedItems, setLikedItems] = useState(favorites.map(item => item.id));

  const handleLikeToggle = (itemId) => {
    if (likedItems.includes(itemId)) {
      // Agar sevimli bo'lsa, o'chirish
      const updatedFavorites = favorites.filter(item => item.id !== itemId);
      setFavorites(updatedFavorites); // Mahsulotni sevimli ro'yxatdan o'chirish
      setLikedItems(likedItems.filter(id => id !== itemId)); // Yurakni o'chirish
    } else {
      // Sevimli mahsulotlar ro'yxatida yo'q bo'lsa, qo'shish
      setLikedItems([...likedItems, itemId]); // Yurakni yoqish
    }
  };

  const handleRemove = (itemId) => {
    // O'chirish funksiyasi
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    setLikedItems(likedItems.filter(id => id !== itemId)); // Yurakni o'chirish
  };

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
                  <div
                    className="favorite-icon"
                    onClick={() => handleLikeToggle(item.id)}
                    title="Sevimli"
                  >
                    {likedItems.includes(item.id) ? (
                      <FaHeart className="favorite-icon liked" />
                    ) : (
                      <FaHeart className="favorite-icon" />
                    )}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item.id)}
                    title="O'chirish"
                  >
                    O'chirish
                  </button>
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
