import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10);
  const [carouselImages, setCarouselImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false); // Added state for toggling
  const carouselInnerRef1 = useRef(null);
  const carouselInnerRef2 = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setCards(data);

        // Carousel images can be fetched or set separately. For now, let's use placeholders.
        const carouselData = [
          'https://picsum.photos/800/300',
          'https://source.unsplash.com/random/800x300',
          'https://via.placeholder.com/800x300',
        ];
        setCarouselImages(carouselData);
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
      }
    };

    fetchData();
  }, []);

  const showSlide = (n, carouselRef) => {
    if (n >= carouselImages.length) setIndex(0);
    else if (n < 0) setIndex(carouselImages.length - 1);
    else setIndex(n);

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => showSlide(index + 1, carouselInnerRef1), 3000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => showSlide(index + 1, carouselInnerRef2), 3000);
    return () => clearInterval(interval);
  }, [index]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      showSlide(index + 1, carouselInnerRef1);
      showSlide(index + 1, carouselInnerRef2);
    } else if (deltaX < -50) {
      showSlide(index - 1, carouselInnerRef1);
      showSlide(index - 1, carouselInnerRef2);
    }
  };

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return `${words.slice(0, limit).join(' ')}...`;
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 10 : cards.length); // Toggle between 10 and total number of cards
  };

  return (
    <div className="main-page">
      <div className="container">
        {/* First Carousel */}
        <div className="carousel">
          <div className="carousel-inner" ref={carouselInnerRef1} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {carouselImages.map((image, i) => (
              <div className="carousel-item" key={i}>
                <img src={image} alt={`Carousel ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <span key={i} className={`carousel-indicator ${i === index ? 'active' : ''}`} onClick={() => showSlide(i, carouselInnerRef1)}></span>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-container">
          {cards.slice(0, visibleCards).map((card) => (
            <div className="card" key={card.id}>
              <Link to={`/product/${card.id}`}> {/* Link to ProductInfoPage */}
                <img src={card.image} alt={card.title} className="card-img" />
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className='card-text'>{truncateText(card.description, 7)}</p>
                  <div className="card-price">
                    <span className="sale-price">${card.price}</span>
                    {/* Note: fakestoreapi.com does not have salePrice, so only price is shown */}
                  </div>
                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < card.rating ? 'filled' : ''}`}>★</span>
                    ))}
                    {/* Note: fakestoreapi.com does not have reviews, so this part is omitted */}
                  </div>
                  
                </div>
                
              </Link>
              
            </div>
            
          ))}
        </div>
        <button className="load-more" onClick={toggleShowMore}>
          {showMore ? 'Yopish' : 'Yana ko\'proq ko\'rsatish'}
        </button>
        {/* Second Carousel */}
        <div className="carousel">
          <div className="carousel-inner" ref={carouselInnerRef2} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {carouselImages.map((image, i) => (
              <div className="carousel-item" key={i}>
                <img src={image} alt={`Carousel ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <span key={i} className={`carousel-indicator ${i === index ? 'active' : ''}`} onClick={() => showSlide(i, carouselInnerRef2)}></span>
            ))}
          </div>
        </div>

        {/* Additional Cards Section */}
        {showMore && (
          <div className="cards-container">
            {cards.slice(visibleCards, visibleCards + 10).map((card) => (
              <div className="card" key={card.id}>
                <Link to={`/product/${card.id}`}> {/* Link to ProductInfoPage */}
                  <img src={card.image} alt={card.title} className="card-img" />
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className='card-text'>{truncateText(card.description, 7)}</p>
                    <div className="card-price">
                      <span className="sale-price">${card.price}</span>
                      {/* Note: fakestoreapi.com does not have salePrice, so only price is shown */}
                    </div>
                    <div className="card-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < card.rating ? 'filled' : ''}`}>★</span>
                      ))}
                      {/* Note: fakestoreapi.com does not have reviews, so this part is omitted */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
        )}
        

        
      </div>
    </div>
  );
};

export default MainPage;
