import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader'; // Loader komponenti
import Modal from '../pages/Modal'; // Modal komponenti
import './ProductInfoPage.css';

const ProductInfoPage = () => {
  const { id } = useParams(); // Parametrlarni olish
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]); // Savatcha
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal ochilishi
  const [loading, setLoading] = useState(true); // Yuklanish holati

  // Mahsulot ma'lumotlarini olish
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false); // Yuklanish tugadi
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading"><Loader /></div>; // Loader ko'rsatish
  }

  if (!product) {
    return <div className="loading">Mahsulot topilmadi.</div>;
  }

  // Miqdor o'zgarishi
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // Savatchaga qo'shish
  const handleAddToCart = () => {
    const newItem = { 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      quantity: quantity, 
      image: product.image 
    };
    setCartItems([...cartItems, newItem]);
    setIsModalOpen(true); // Modal ochish
  };

  // Savatchadagi mahsulotni yangilash
  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Savatchadan mahsulotni olib tashlash
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Mahsulot narxini hisoblash
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="product-info-container">
      <div className="container">
        <div className="product-box">
          <div>
            <div className="image-gallery">
              <div className="main-image" data-aos="fade-left">
                <img src={product.image} alt={product.title} className="img-fluid" />
              </div>
              {/* API orqali olingan kichik rasmlar */}
              <div className="thumbnail-images">
                <img
                  src={product.image}
                  alt="Thumbnail 1"
                  className="thumbnail"
                  onClick={() => {}}
                />
                <img
                  src={product.image}
                  alt="Thumbnail 2"
                  className="thumbnail"
                  onClick={() => {}}
                />
                <img
                  src={product.image}
                  alt="Thumbnail 3"
                  className="thumbnail"
                  onClick={() => {}}
                />
                <img
                  src={product.image}
                  alt="Thumbnail 4"
                  className="thumbnail"
                  onClick={() => {}}
                />
                <img
                  src={product.image}
                  alt="Thumbnail 5"
                  className="thumbnail"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="product-box2">
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

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <button 
                className='load-more'
                style={{ 
                  border: 'none', 
                  padding: '10px 20px', 
                  cursor: 'pointer', 
                  transition: 'background-color 0.3s' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFB01E'} // Hover holati
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFE4BD'} // Normal holat
                onClick={handleAddToCart} // Savatchaga qo'shish
              >
                Sotib olish
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;
