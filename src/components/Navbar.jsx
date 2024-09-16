import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Modal from '../pages/Modal';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartItems, isModalOpen, openModal, closeModal }) => {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  // Update the quantity of an existing item or add a new item to the cart
  const handleAddToCart = (item) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[item.id]) {
        newQuantities[item.id] += 1; // Increase the quantity if the item already exists
      } else {
        newQuantities[item.id] = 1; // Add the item with quantity 1
      }
      return newQuantities;
    });
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value
    });
  };

  const handleRemoveItem = (itemId) => {
    // Remove item from quantities and cartItems
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemId];
      return newQuantities;
    });

    // Optional: Remove the item from cartItems if needed
    // setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handlePurchase = () => {
    // Handle purchase logic here
    alert('Purchase functionality is not implemented yet.');
  };

  const handleMoreDetails = (productId) => {
    // Navigate to the product info page with the product ID
    navigate(`/product/${productId}`);
  };

  // Calculate total item count
  const totalItemCount = Object.values(quantities).reduce((total, quantity) => total + parseInt(quantity), 0);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo">
              <img src="/img/logo.svg" alt="Logo" />
            </div>
            <div className="cart-icon-container" onClick={openModal}>
              <FaShoppingCart className="cart-icon" />
              {totalItemCount > 0 && (
                <div className="cart-badge">
                  {totalItemCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        content={
          <div>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p>${item.price}</p>
                      <div className="quantity">
                        <input 
                          type="number" 
                          value={quantities[item.id] || 1} 
                          min="1" 
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                        />
                        <button onClick={() => handleMoreDetails(item.id)}>To'liq malumot</button>
                        <button onClick={() => handleRemoveItem(item.id)}>O'chirish</button> {/* Remove button */}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="purchase-button" onClick={handlePurchase}>
                  Purchase
                </button>
              </div>
            ) : (
              <p>Cart is empty.</p>
            )}
          </div>
        }
      />
    </>
  );
};

export default Navbar;
