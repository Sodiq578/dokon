import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../pages/Modal';
import './Navbar.css';
import { FaShoppingCart, FaHome, FaServicestack, FaBuilding, FaComments, FaPhone, FaHeart } from 'react-icons/fa'; // Yurak ikonkasi import
import Logo from '../img/logo.svg';

const Navbar = ({ cartItems, isModalOpen, openModal, closeModal }) => {
  const [quantities, setQuantities] = useState({});
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // Dropdown ko'rsatish uchun
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
              <li><Link to="/"><FaHome className="nav-icon" /><span>Home</span></Link></li>
              <li 
                onMouseEnter={() => setShowServicesDropdown(true)} 
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <FaServicestack className="nav-icon" /><span>Services</span>
                {showServicesDropdown && (
                  <div className="dropdown">
                    <Link to="/service1">Service 1</Link>
                    <Link to="/service2">Service 2</Link>
                    <Link to="/service3">Service 3</Link>
                    <Link to="/service4">Service 4</Link>
                  </div>
                )}
              </li>
              <li><Link to="/company"><FaBuilding className="nav-icon" /><span>Company</span></Link></li>
              <li><Link to="/consultation"><FaComments className="nav-icon" /><span>Consultation</span></Link></li>
              <li><Link to="/contacts"><FaPhone className="nav-icon" /><span>Contacts</span></Link></li>
              <li>
                <div className="cart-icon-container" onClick={openModal}>
                  <FaShoppingCart className="cart-icon favorites-icon" />
                  <span>Add card</span>
                  {totalItemCount > 0 && (
                    <div className="cart-badge">
                      {totalItemCount}
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link to="/favorites">
                  <FaHeart className="favorites-icon" />
                  <span>Sevimli mahsulotlar</span> {/* Yangi yozuv bilan */}
                </Link>
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
