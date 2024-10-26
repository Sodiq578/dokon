<<<<<<< HEAD
// Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHeart } from 'react-icons/io';
import './Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Modal from './Modal'; // Modal komponentini import qiling
import './Favorites.css';

const Favorites = ({ favorites, setFavorites }) => {
  const [likedItems, setLikedItems] = useState(favorites.map(item => item.id));
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    setLikedItems(likedItems.filter(id => id !== itemId)); // Yurakni o'chirish
  };

  const openModal = (item) => {
    setSelectedProduct(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const addToFavorites = () => {
    if (selectedProduct) {
      const updatedFavorites = [...favorites, selectedProduct];
      setFavorites(updatedFavorites);
      setLikedItems([...likedItems, selectedProduct.id]);
      closeModal();
    }
  };

>>>>>>> 22aa6dacf8b05926782f71211ce29377d338f41d
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
<<<<<<< HEAD
                  
                 
=======
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
                  <button className="add-to-favorites" onClick={() => openModal(item)}>
                    Qo'shish
                  </button>
>>>>>>> 22aa6dacf8b05926782f71211ce29377d338f41d
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite products.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} content={
        <div>
          <h3>{selectedProduct ? selectedProduct.title : ''}</h3>
          <p>{selectedProduct ? `Narxi: $${selectedProduct.price}` : ''}</p>
          <button onClick={addToFavorites}>Sevimlilarga qo'shish</button>
        </div>
      } />
    </div>
  );
};

export default Favorites;
