import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../pages/Modal';
import './Navbar.css';
import { FaShoppingCart, FaHome, FaServicestack, FaBuilding, FaComments, FaPhone } from 'react-icons/fa';
import Logo from '../img/logo.svg';

const Navbar = ({ cartItems, isModalOpen, openModal, closeModal }) => {
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value
    });
  };

  const handleRemoveItem = (itemId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });
  };

  const handlePurchase = () => {
    alert('Purchase functionality is not implemented yet.');
  };

  const totalItemCount = Object.values(quantities).reduce((total, quantity) => total + parseInt(quantity || 1), 0);

  return (
    <>
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="nav-elements">
            <ul className="nav-links">
              <li><Link to="/"><FaHome className="nav-icon" /><span>Главная</span></Link></li>
              <li><Link to="/services"><FaServicestack className="nav-icon" /><span>Услуги</span></Link></li>
              <li><Link to="/company"><FaBuilding className="nav-icon" /><span>Компания</span></Link></li>
              <li><Link to="/consultation"><FaComments className="nav-icon" /><span>Консультация</span></Link></li>
              <li><Link to="/contacts"><FaPhone className="nav-icon" /><span>Контакты</span></Link></li>
              <li>
                <div className="cart-icon-container" onClick={openModal}>
                  <FaShoppingCart className="cart-icon" />
                  {totalItemCount > 0 && (
                    <div className="cart-badge">
                      {totalItemCount}
                    </div>
                  )}
                </div>
              </li>
            </ul>
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
                        <button onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={handlePurchase} className="purchase-btn">Proceed to Checkout</button>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        }
      />
    </>
  );
};

export default Navbar;
