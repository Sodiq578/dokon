import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../pages/Modal';
import './Navbar.css';
import { FaShoppingCart, FaHome, FaServicestack, FaBuilding, FaComments, FaPhone, FaRegCreditCard } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md'; 

const Navbar = ({ cartItems, isModalOpen, openModal, closeModal, addToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value
    });
  };

  const handleRemoveItem = (itemId) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const handlePurchase = () => {
    alert('Purchase functionality is not implemented yet.');
  };

  const handleMoreDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const totalItemCount = Object.values(quantities).reduce((total, quantity) => total + parseInt(quantity), 0);

  return (
    <>
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className="logo">
            <img src="/img/logo.svg" alt="Logo" />
          </div>
          <div className="nav-elements">
            <ul className="nav-links">
              <li><Link to="/"><FaHome className="nav-icon" /><span>Главная</span></Link></li>
              <li><Link to="/services"><FaServicestack className="nav-icon" /><span>Услуги</span></Link></li>
              <li><Link to="/company"><FaBuilding className="nav-icon" /><span>Компания</span></Link></li>
              <li><Link to="/consultation"><FaComments className="nav-icon" /><span>Консультация</span></Link></li>
              <li><Link to="/contacts"><FaPhone className="nav-icon" /><span>Контакты</span></Link></li>
              <li>
               
              </li>
            </ul>
            <div className="cart-icon-container" onClick={openModal}>
              <FaShoppingCart className="cart-icon" />
              {totalItemCount > 0 && (
                <div className="cart-badge">
                  {totalItemCount}
                </div>
              )}
            </div>
            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MdMenu />
            </div>
          </div>
        </div>
      </nav>

      <div className={`bottom-navbar ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/"><FaHome className="nav-icon" /><span>Главная</span></Link>
        <Link to="/services"><FaServicestack className="nav-icon" /><span>Услуги</span></Link>
        <Link to="/company"><FaBuilding className="nav-icon" /><span>Компания</span></Link>
        <Link to="/consultation"><FaComments className="nav-icon" /><span>Консультация</span></Link>
        <Link to="/contacts"><FaPhone className="nav-icon" /><span>Контакты</span></Link>
        <div className="cart-icon-container" onClick={openModal}>
              <FaShoppingCart className="cart-icon" />
              {totalItemCount > 0 && (
                <div className="cart-badge">
                  {totalItemCount}
                </div>
              )}
            </div>
      </div>

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
                        <button onClick={() => handleRemoveItem(item.id)}>O'chirish</button>
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

      <Modal 
        isOpen={isCardModalOpen} 
        onClose={() => setIsCardModalOpen(false)} 
        content={
          <div>
            <h2>Add Card</h2>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No cards to add yet.</p>
            )}
            <button onClick={() => setIsCardModalOpen(false)}>Close</button>
          </div>
        }
      />
    </>
  );
};

export default Navbar;
