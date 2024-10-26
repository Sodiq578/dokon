import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import ProductInfoPage from './pages/ProductInfoPage';
import AboutUsPage from './pages/AboutUsPage';
import Favorites from './pages/Favorites';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// Make sure to remove duplicate imports if any

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to add items to favorites
  const addToFavorites = (item) => {
    if (!favorites.some(favItem => favItem.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  // Function to remove items from favorites
  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  return (
    <Router>
      <Navbar 
        cartItems={cartItems} 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <MainPage 
              addToCart={addToCart} 
              addToFavorites={addToFavorites} 
              favorites={favorites}
            />
          } 
        />
        <Route path="/product/:id" element={<ProductInfoPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/favorites" 
          element={
            <Favorites 
              favorites={favorites} 
              removeFromFavorites={removeFromFavorites}
            />
          } 
        />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/consulting" element={<div>Consulting Services</div>} />
        <Route path="/development" element={<div>Development Services</div>} />
        <Route path="/design" element={<div>Design Services</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
