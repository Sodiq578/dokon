import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigate uchun import
import ImageCarousel from './ImageCarousel';
import Modal from './Modal';
import './MainPage.css';
import backgroundImage from '../img/asal1.png'; // Lokal rasm importi

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const navigate = useNavigate(); // Sahifalararo navigatsiya uchun

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setCards(data);
        
        // Carousel uchun rasmlarni API'dan olish
        setCarouselImages(data.map(product => product.image));
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 3 : visibleCards + 3);
  };

  // Mahsulot sahifasiga yo'naltirish funksiyasi
  const handleCardClick = (card) => {
    navigate(`/product/${card.id}`); // `product/:id` sahifasiga o'tish
  };

  const openModal = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-page">
      <section id="parallax" className="parallax-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="parallax-inner">
          <h1>Beaches</h1>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-container">
          {cards.slice(0, visibleCards).map((card) => (
            <div className="card" key={card.id} onClick={() => handleCardClick(card)}> {/* Karta bosilganda mahsulot sahifasiga yo'naltirish */}
              <img src={card.image} alt={card.title} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{truncateText(card.description, 7)}</p>
                <div className="card-price">
                  <span className="sale-price">${card.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more" onClick={toggleShowMore}>
            {showMore ? 'Yopish' : 'Yana ko\'proq ko\'rsatish'}
          </button>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="image-carousel">
        <ImageCarousel images={carouselImages} /> {/* Carouselga API'dan olingan rasmlar */}
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={selectedContent && (
        <div>
          <h2>{selectedContent.title}</h2>
          <img src={selectedContent.image} alt={selectedContent.title} style={{ width: '100%' }} />
          <p>{selectedContent.description}</p>
          <p><strong>Price:</strong> ${selectedContent.price}</p>
        </div>
      )} />
    </div>
  );
};

// Matnni qisqartirish funksiyasi
const truncateText = (text, limit) => {
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(' ')}...`;
};

export default MainPage;
