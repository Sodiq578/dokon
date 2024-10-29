import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Modal from './Modal'; 
import './ProductInfoPage.css';
 

const ProductInfoPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customerSurname, setCustomerSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // To'lov usuli
  const chatId = "5838205785"; 
  const telegramBotId = "7753999301:AAF44xI3AzisnwNu-sCWu5cVs8gnadqx9JY"; 
  const url = `https://api.telegram.org/bot${telegramBotId}/sendMessage`; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading"><Loader /></div>;
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
    setIsModalOpen(true); 
  };

  const handleConfirmPurchase = async () => {
    if (!customerName || !customerSurname || !address || !phoneNumber) {
      alert("Iltimos, barcha ma'lumotlarni to'ldiring.");
      return;
    }

    const totalPrice = (product.price * quantity).toFixed(2);
    const message = `
      🛒 Buyurtma ma'lumotlari:
      👤 Xaridor: ${customerName} ${customerSurname}
      📦 Mahsulot: ${product.title}
      🔢 Miqdor: ${quantity}
      📍 Manzil: ${address}
      📞 Telefon raqami: ${phoneNumber}
      💰 To'lov miqdori: $${totalPrice}
      🏦 To'lov usuli: ${paymentMethod}
    `;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: message
      });
      alert("Buyurtma muvaffaqiyatli tasdiqlandi va Telegramga yuborildi!");
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Telegramga xabar yuborishda xatolik:", error);
      alert("Buyurtma tafsilotlarini Telegramga yuborib bo'lmadi.");
    }
  };

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
              <div className="thumbnail-images">
                <img src={product.image} alt="Thumbnail" className="thumbnail" onClick={() => {}} />
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
                style={{ border: 'none', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFB01E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFE4BD'}
                onClick={handleAddToCart} 
              >
                Sotib olish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal oynasi */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} content={
        <div>
          <h2>Xaridor ma'lumotlari</h2>
          <div>
            <label>Xaridor ismi:</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="Ismingizni kiriting" 
            />
          </div>
          <div>
            <label>Xaridor familiyasi:</label>
            <input 
              type="text" 
              value={customerSurname} 
              onChange={(e) => setCustomerSurname(e.target.value)} 
              placeholder="Familiyangizni kiriting" 
            />
          </div>
          <div>
            <label>Manzil:</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Manzilni kiriting" 
            />
          </div>
          <div>
            <label>Telefon raqami:</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Telefon raqamingizni kiriting" 
            />
          </div>

          {/* To'lov usulini tanlash */}
          <div>
            <label>To'lov usuli:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="cash">Naqd pul</option>
              <option value="credit_card">Kredit karta</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="apple_pay">Apple Pay</option>
              <option value="google_pay">Google Pay</option>
            </select>
          </div>

          <button className='btn-tast' onClick={handleConfirmPurchase}>Buyurtmani tasdiqlash</button>
        </div>
      } />
 
    </div>
  );
};

export default ProductInfoPage;
