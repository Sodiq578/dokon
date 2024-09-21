import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import './MainPage.css';
import backgroundImage from '../img/asal1.png';
import Loader from '../components/Loader';
import ImageCarousel from '../pages/ImageCarousel';
import Accordion from '../Layout/Accordion';
import BigSlider from '../Layout/BigSlider';

const MainPage = ({ addToCart }) => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
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

  useEffect(() => {
    const handleScroll = () => {
      const boxes = document.querySelectorAll('.product-section-box-one, .product-section-box-two, .card');

      boxes.forEach(box => {
        const boxPosition = box.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        if (boxPosition < screenPosition) {
          box.classList.add('in-view');
        } else {
          box.classList.remove('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 4 : visibleCards + 4);
  };

  const handleCardClick = (card) => {
    navigate(`/product/${card.id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="main-page">
      <section id="parallax" className="parallax-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="parallax-inner">
          <h1>Asal haqida</h1>
          <p>Asal — tabiiy shirin ne’mat bo'lib, asosan asalarilar tomonidan tayyorlanadi. U inson salomatligi uchun foydali va ozuqaviy moddalarga boydir.</p>
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
                  <FaCartPlus />
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

      <section className="container product-sections">
        <div className='product-section-box-one'>
          <h2>Lorem ipsum dolor sit, amet consectetur adipisicing.</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic consectetur ea accusantium tempore dolorem.</p>
        </div>
        <div className='product-section-box-two'>
          <img 
            src="https://static.vecteezy.com/system/resources/previews/030/639/575/large_2x/honey-image-hd-free-photo.jpg" 
            alt="Honey Image" 
            className="responsive-image"
          />
        </div>
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
