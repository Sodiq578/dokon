// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import ProductInfoPage from './pages/ProductInfoPage';
import AboutUsPage from './pages/AboutUsPage';
 
import Favorites from './pages/Favorites'; 
 import Contact from "./pages/Contact"

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
        <Route  path='/contact' element={<Contact/>}/>
    
        <Route 
          path="/favorites" 
          element={
            <Favorites 
              favorites={favorites} 
              removeFromFavorites={removeFromFavorites}
            />
          } 
        />
        {/* Other routes */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
