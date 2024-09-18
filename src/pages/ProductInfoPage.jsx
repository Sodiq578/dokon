import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader'; // Loader importi
import './ProductInfoPage.css';

const ProductInfoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true); // Yuklanish holati

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.image);
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
    console.log(`Mahsulot: ${product.title}, Son: ${quantity}, Rang: ${selectedColor}, O'lcham: ${selectedSize}`);
  };

  const handleBuyNow = () => {
    console.log(`Buy Now - Mahsulot: ${product.title}, Son: ${quantity}, Rang: ${selectedColor}, O'lcham: ${selectedSize}`);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="product-info-container">
      <div className="container">
        <div className="row product-box">
          <div className="col-md-6">
            <div className="image-gallery">
              <div className="main-image">
                <img src={mainImage} alt={product.title} className="img-fluid" />
              </div>
              <div className="thumbnail-images">
                {/* Kichik rasmlar API orqali olingan rasmlar */}
                <img
                  src={product.image}
                  alt="Thumbnail 1"
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(product.image)}
                />
                <img
                src={product.image}
                  alt="Thumbnail 2"
                  className="thumbnail"
                  onClick={() => handleThumbnailClick("https://fakestoreapi.com/img/1.jpg")}
                />
                <img
                  src={product.image}
                  alt="Thumbnail 3"
                  className="thumbnail"
                  onClick={() => handleThumbnailClick("https://fakestoreapi.com/img/2.jpg")}
                />
               
                <img
                  src={product.image}
                  alt="Thumbnail 5"
                  className="thumbnail"
                  onClick={() => handleThumbnailClick("https://fakestoreapi.com/img/4.jpg")}
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
                <label htmlFor="color-select">Rang:</label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  disabled={!product.colors || product.colors.length === 0}
                  className={!product.colors || product.colors.length === 0 ? 'disabled-select' : ''}
                >
                  <option value="">Tanlang</option>
                  {product.colors?.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div className="option-group">
                <label htmlFor="size-select">O'lcham:</label>
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  disabled={!product.sizes || product.sizes.length === 0}
                  className={!product.sizes || product.sizes.length === 0 ? 'disabled-select' : ''}
                >
                  <option value="">Tanlang</option>
                  {product.sizes?.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))}
                </select>
              </div>

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
            <button onClick={handleBuyNow} className="btn btn-success">Hozir sotib olish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;
