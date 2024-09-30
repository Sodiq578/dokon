import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import "./MainPage.css";
import backgroundImage from '../img/main-back.svg';
import Loader from "../components/Loader";
import ImageCarousel from "../pages/ImageCarousel";
import Accordion from "../Layout/Accordion";
import Thumbs from "../components/Thumbs"; // O'z komponentingizni import qiling



const MainPage = ({ addToCart, addToFavorites }) => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const [showMore, setShowMore] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIcons, setClickedIcons] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setCards(data);
        setCarouselImages(data.map((product) => product.image));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 4 : visibleCards + 4);
  };

  const handleIconClick = (e, card, action) => {
    e.stopPropagation();
    setClickedIcons((prevState) => ({
      ...prevState,
      [card.id]: {
        ...prevState[card.id],
        [action]: !prevState[card.id]?.[action],
      },
    }));

    if (action === 'favorite') {
      addToFavorites(card);
    } else if (action === 'cart') {
      addToCart(card);
    }
  };

  const handleCardClick = (card) => {
    navigate(`/product/${card.id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="main-page">
      <div className="main-content container">
        <div className="text-section">
          <h2 className="main-page-title">The Finest and Purest Honey</h2>
          <p className="main-page-text">
            Isuzu is a Japanese company specializing in the production of trucks and commercial vehicles...
          </p>
        </div>
        <div className="image-section" style={{ maxWidth: "100%", flexGrow: 1 }}>
          <img src={backgroundImage} alt="Honey background" className="main-image" />
        </div>
      </div>

      <section>
        <Thumbs />
      </section>

      <section className="carousel-section">
        <ImageCarousel images={carouselImages} />
      </section>

      <section className="carousel-section">
  {/* Bu yerda carousel yoki slayd ko'rsatkich joylashtiriladi */}
</section>

<section className="cards-section">
  <h2 className="card-box-title">Our Products</h2>

  <div className="cards-container">
    {cards.slice(0, visibleCards).map((card) => (
      <div
        className="card"
        key={card.id}
        onClick={() => handleCardClick(card)}
      >
        <div className="card-img-box">
          <img src={card.image} alt={card.title} className="card-img" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-text">{truncateText(card.description, 7)}</p>
          <div className="card-price">
            <span className="sale-price">${card.price}</span>
          </div>
          <div className="card-actions">
            <div className={`clic-icon ${clickedIcons[card.id]?.favorite ? 'active' : ''}`}>
              <button
                className={`add-to-favorites-btn ${clickedIcons[card.id]?.favorite ? 'active' : ''}`}
                onClick={(e) => handleIconClick(e, card, 'favorite')}
              >
                <FaHeart />
              </button>
            </div>

            <div className={`clic-icon ${clickedIcons[card.id]?.cart ? 'active' : ''}`}>
              <button
                className="add-to-cart-btn"
                onClick={(e) => handleIconClick(e, card, 'cart')}
              >
                <FaCartPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="load-more-container">
    <button className="load-more" onClick={toggleShowMore}>
      {showMore ? "Collapse" : "Show More"}
    </button>
  </div>
</section>


   <section className="process-section container">
  <div className="text-container">
    <h2 className="process-title">Honey Production Process</h2>
    <p className="process-description">
      Our team strives to provide our clients with a personalized experience.
    </p>
  </div>

  <div className="video-container">
    <iframe
      src="https://www.youtube.com/embed/PdkGSFf8keo"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</section>

      <section className="container accordion-section">
        <Accordion />
      </section>

      {/* Yangi bo'lim */}
   




    </div>
  );
};

const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(" ")}...`;
};

export default MainPage;
