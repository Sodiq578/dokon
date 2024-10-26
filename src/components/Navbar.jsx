import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from '../pages/Modal';
import './Navbar.css';
import { GoHome } from "react-icons/go";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { IoIosHeartEmpty } from "react-icons/io";


import Logo from '../img/logo.svg';

const Navbar = ({ cartItems, isModalOpen, openModal, closeModal }) => {
  const [quantities, setQuantities] = useState({});
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [favorites, setFavorites] = useState([]);
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

  const handleToggleFavorite = (item) => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter(id => id !== item.id));
    } else {
      setFavorites([...favorites, item.id]);
    }
  };

  const totalItemCount = Object.values(quantities).reduce((total, quantity) => total + parseInt(quantity || 1), 0);
  const totalFavoritesCount = favorites.length;

  return (
    <>
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className="logo"> 
            <img src={Logo} alt="Logo" />
          </div>
          <div className="nav-elements">
 
          <li><Link to="/"><GoHome className="nav-icon" /> <span>Home</span></Link></li>
          <li 
  onMouseEnter={() => setShowServicesDropdown(true)} 
  onMouseLeave={() => setShowServicesDropdown(false)}
  className="relative"
>
  <IoSettingsOutline className="nav-icon" />
  <span>Services</span>
  {showServicesDropdown && (
    <div className="dropdown">
      <Link className='dropdown-content' to="/service1">Service 1</Link>
      <Link className='dropdown-content' to="/service2">Service 2</Link>
      <Link className='dropdown-content' to="/service3">Service 3</Link>
      <Link className='dropdown-content' to="/service4">Service 4</Link>
    </div>
  )}
</li>

<li><Link to="/contact"> <HiOutlinePhone className="nav-icon" /> <span>Contacts</span></Link></li>
<li>
  <div className="cart-icon-container" onClick={openModal}>
    <PiShoppingCartSimple className="cart-icon favorites-icon" />
    <span>Add Card</span>
    {totalItemCount > 0 && (
      <div className="cart-badge">{totalItemCount}</div>
    )}
  </div>
</li>
<li>
  <Link to="/favorites">
    <IoIosHeartEmpty className="favorites-icon  favorites-icon-heart" />
    <span>Sevimli mahsulotlar</span>
    {totalFavoritesCount > 0 && (
      <div className="favorites-badge">{totalFavoritesCount}</div>
    )}
  </Link>
</li>

 
     
 
          </div>
        </div>
      </nav>

  <div className="bottom-navbar">
  <Link to="/">
    <GoHome className="icon" />
    <span>Home</span>
  </Link>
  <div
    className="dropdown"
    onMouseEnter={() => setShowServicesDropdown(true)}
    onMouseLeave={() => setShowServicesDropdown(false)}
  >
    <IoSettingsOutline className="icon" />
    {showServicesDropdown && (
      <div className="dropdown-menu">
        <Link to="/service1">Service 1</Link>
        <Link to="/service2">Service 2</Link>
        <Link to="/service3">Service 3</Link>
        <Link to="/service4">Service 4</Link>
      </div>
    )}
  </div>
  <Link to="/contacts">
    <HiOutlinePhone className="icon" />
    <span>Contacts</span>
  </Link>
  <div className="cart-icon-container" onClick={openModal}>
  <PiShoppingCartSimple style={{ fontSize: '30px', width: '30px', height: '30px' }} />
  {totalItemCount > 0 && (
    <div className="cart-badge">{totalItemCount}</div>
  )}
</div>


  <Link to="/favorites">
    <IoIosHeartEmpty className="icon" />
    <span>Sevimli mahsulotlar</span>
    {totalFavoritesCount > 0 && (
      <div className="favorites-badge">{totalFavoritesCount}</div>
    )}
  </Link>
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
 
                      <button onClick={() => handleToggleFavorite(item)}> 
                        {favorites.includes(item.id) ? "Remove from Favorites" : "Add to Favorites"}
                      </button>
                      <div className="quantity">
                        <input 
                          type="number" 
                          value={quantities[item.id] || 1} 
                          min="1" 
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                        />
                        
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
