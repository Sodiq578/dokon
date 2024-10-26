import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Modal from './Modal'; // Import the Modal component
import './Favorites.css';

const Favorites = ({ favorites, setFavorites }) => {
  const [likedItems, setLikedItems] = useState(favorites.map(item => item.id));
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLikeToggle = (itemId) => {
    if (likedItems.includes(itemId)) {
      // Remove from favorites if already liked
      const updatedFavorites = favorites.filter(item => item.id !== itemId);
      setFavorites(updatedFavorites);
      setLikedItems(likedItems.filter(id => id !== itemId));
    } else {
      // Add to favorites if not already liked
      setLikedItems([...likedItems, itemId]);
    }
  };

  const handleRemove = (itemId) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    setLikedItems(likedItems.filter(id => id !== itemId));
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
                  <div
                    className="favorite-icon"
                    onClick={() => handleLikeToggle(item.id)}
                    title="Toggle Favorite"
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
                    title="Remove from Favorites"
                  >
                    Remove
                  </button>
                  <button className="add-to-favorites" onClick={() => openModal(item)}>
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite products.</p>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        content={selectedProduct && (
          <div>
            <h3>{selectedProduct.title}</h3>
            <p>Price: ${selectedProduct.price}</p>
            <button onClick={addToFavorites}>Add to Favorites</button>
          </div>
        )} 
      />
    </div>
  );
};

export default Favorites;
