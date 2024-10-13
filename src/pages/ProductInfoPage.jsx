import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader'; // Loader importi
import Modal from '../pages/Modal'; // Modal importi
import './ProductInfoPage.css';

const ProductInfoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]); // Savatcha maxsulotlari
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati
  const [loading, setLoading] = useState(true); // Yuklanish holati

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false); // Yuklanish tugadi
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
        setLoading(false); // Yuklanishni tugatish
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading"><Loader /></div>; // Loader ishlatilishi
  }

  if (!product) {
    return <div className="loading">Mahsulot topilmadi.</div>;
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    const newItem = { 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      quantity: quantity, 
      image: product.image 
    };
    setCartItems([...cartItems, newItem]);
    setIsModalOpen(true); // Modalni ochish
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="product-info-container">
      <div className="container">
        <div className="row product-box">
          <div className="col-md-6">
            <div className="image-gallery">
              <div className="main-image" data-aos="fade-left">
                <img src={product.image} alt={product.title} className="img-fluid" />
              </div>
              {/* Kichik rasmlar API orqali olingan rasmlar */}
              <div className="thumbnail-images">
                <img
                  src={product.image}
                  alt="Thumbnail 1"
                  className="thumbnail"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 product-box2">
            <h1 className="product-name">{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              <span className="price">${totalPrice}</span>
            </div>

            <div className="product-options">
              <div className="option-group">
                <label htmlFor="quantity-select">Miqdor:</label>
                <input
                  type="number"
                  id="quantity-select"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary">Savatchaga qo'shish</button>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cartItems={cartItems} 
        updateQuantity={updateQuantity} 
        removeItem={removeItem} 
      />
    </div>
  );
};

export default ProductInfoPage;
