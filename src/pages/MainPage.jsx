import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import './MainPage.css';
import backgroundImage from '../img/asal1.png'; // Ensure the path is correct
import Loader from '../components/Loader';
import ImageCarousel from '../pages/ImageCarousel'; // Ensure the path is correct
import Accordion from '../Layout/Accordion'; // Ensure the path is correct
import BigSlider from '../Layout/BigSlider'; // Ensure the path is correct

const MainPage = ({ addToCart }) => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setCards(data);
        setCarouselImages(data.map(product => product.image));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 3 : visibleCards + 3);
  };

  const handleCardClick = (card) => {
    navigate(`/product/${card.id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="main-page">
      <section id="parallax" className="parallax-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="parallax-inner">
          <h1>Beaches</h1>
        </div>
      </section>

      <section className="carousel-section">
        <ImageCarousel images={carouselImages} />
      </section>

      <section className="cards-section">
        <div className="cards-container">
          {cards.slice(0, visibleCards).map((card) => (
            <div className="card" key={card.id} onClick={() => handleCardClick(card)}>
              <img src={card.image} alt={card.title} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{truncateText(card.description, 7)}</p>
                <div className="card-price">
                  <span className="sale-price">${card.price}</span>
                </div>
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(card);
                }}>
                  <FaCartPlus /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more" onClick={toggleShowMore}>
            {showMore ? 'Collapse' : 'Show More'}
          </button>
        </div>
      </section>

      <section className="container accordion-section">
        <Accordion />
      </section>

      <section className="big-slider-section">
        <BigSlider />
      </section>

      <section className="product-sections">
        {/* Additional content can be added here */}
      </section>
    </div>
  );
};

const truncateText = (text, limit) => {
  const words = text.split(' ');
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(' ')}...`;
};

export default MainPage;
