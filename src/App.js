import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductInfoPage from './pages/ProductInfoPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Loader from './components/Loader'; // Import the Loader component

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching or initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      {loading && <Loader />} {/* Show loader while loading */}
      <Navbar 
        cartItems={cartItems} 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
      />
      <Routes>
        <Route path="/" element={<MainPage addToCart={addToCart} />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/product/:id" element={<ProductInfoPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
