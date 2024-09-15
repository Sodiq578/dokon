import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import './MainPage.css';

// Import local images
import backgroundImage from '../img/asal1.png'; // Adjust the path as needed

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3); // Initially show 3 cards
  const [showMore, setShowMore] = useState(false); // State for toggling
  const [carouselImages, setCarouselImages] = useState([]); // State for carousel images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setCards(data);
        
        // Set carousel images from API data
        setCarouselImages(data.map(product => product.image));
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
      }
    };

    fetchData(); // Fetch products data
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 3 : visibleCards + 3); // Toggle between 3 and additional 3 cards
  };

  useEffect(() => {
    const parallax = document.getElementById('parallax');
    const handleScroll = () => {
      let offset = window.pageYOffset;
      if (parallax) {
        parallax.style.backgroundPositionY = offset * 0.5 + 'px'; // Parallax effect for background
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-page">
      {/* Parallax Section with local image */}
      <section id="parallax" className="parallax-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="parallax-inner">
          <h1>Beaches</h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="cards-container">
          {cards.slice(0, visibleCards).map((card) => (
            <div className="card" key={card.id}>
              <Link to={`/product/${card.id}`}>
                <img src={card.image} alt={card.title} className="card-img" />
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{truncateText(card.description, 7)}</p>
                  <div className="card-price">
                    <span className="sale-price">${card.price}</span>
                  </div>
                 
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more" onClick={toggleShowMore}>
            {showMore ? 'Yopish' : 'Yana ko\'proq ko\'rsatish'}
          </button>
        </div>
      </section>

      {/* Parallax sections */}
      <section className="parallax-beach">
        <div className="parallax-inner">
          <h1>Beaches</h1>
        </div>
      </section>

      <section className="parallax-mountain">
        <div className="parallax-inner">
          <h1>Mountains</h1>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="image-carousel">
        <ImageCarousel images={carouselImages} />
      </section>
    </div>
  );
};

// Utility function to truncate text
const truncateText = (text, limit) => {
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(' ')}...`;
};

export default MainPage;
