import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import "./MainPage.css"; // CSS fayllarini import qiling
import backgroundImage from '../img/main-back.svg'; // Rasmlar yo'lini to'g'rilang
import Loader from "../components/Loader"; // Yuklash holati uchun komponent
import ImageCarousel from "../pages/ImageCarousel"; // Rasm karuseli komponenti
import Accordion from "../Layout/Accordion"; // Qo'shimcha ma'lumotlar uchun akordiyon
import Thumbs from "../components/Thumbs"; // Mini rasmlar komponenti
import LikeButton from "../pages/LikeButton"; // Yoqqan tugmasi komponenti
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({ duration: 1000 }); // AOS kutubxonasini ishga tushirish
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 4 : visibleCards + 4);
  };

  const handleIconClick = (e, card, action) => {
    e.stopPropagation();

    const newClickedIcons = { ...clickedIcons };

 
    setClickedIcons(newClickedIcons); // Davlatni yangilash

    // Harakatga ko'ra qo'shimcha funksiyalarni chaqirish
    if (action === 'favorite') {
      addToFavorites(card);
    } else if (action === 'cart') {
      addToCart(card);
    }
  };

  const handleCardClick = (card) => {
    navigate(`/product/${card.id}`);
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return `${words.slice(0, limit).join(" ")}...`;
  };

  if (loading) return <Loader />;

  return (
    <div className="main-page">
      <div className="main-content container">
        <div className="text-section" data-aos="fade-right">
          <h2 className="main-page-title">The Finest and Purest Honey</h2>
          <p className="main-page-text">
            Discover the best honey products sourced directly from the finest producers.
          </p>
        </div>
        <div className="image-section" style={{ maxWidth: "100%", flexGrow: 1 }}>
          <img src={backgroundImage} alt="Honey background" className="main-image" />
        </div>
      </div>

      <section>
        <div className="thumbs-wrapper container" data-aos="fade-up">
          <Thumbs />
        </div>
      </section>

      <section className="carousel-section">
        <ImageCarousel images={carouselImages} />
      </section>

      <section className="cards-section">
        <h2 className="card-box-title">Our Products</h2>
        <div className="cards-container">
          {cards.slice(0, visibleCards).map((card) => (
            <div
              data-aos="fade-left"
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
                  <LikeButton
                    isActive={clickedIcons[card.id]?.favorite}
                    onClick={(e) => handleIconClick(e, card, 'favorite')}
                  />
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleIconClick(e, card, 'cart')}
                  >
                    <FaCartPlus />
                  </button>
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

      <section className="process-section container" >
        <div className="text-container" data-aos="fade-right">
          <h2 className="process-title">Honey Production Process</h2>
          <p className="process-description">
            Learn about our premium honey production methods.
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

      <section className="accordion-section container" data-aos="fade-up">
        <Accordion />
      </section>
    </div>
  );
};

export default MainPage;
