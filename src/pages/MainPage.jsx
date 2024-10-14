import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io"; // IoIosHeartEmpty ni import qilindi
import "./MainPage.css";
import backgroundImage from '../img/main-back.svg';
import Loader from "../components/Loader";
import ImageCarousel from "../pages/ImageCarousel";
import Thumbs from "../components/Thumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageModal from "../pages/ImageModal"; // Import the modal component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ addToCart, addToFavorites }) => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const [showMore, setShowMore] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIcons, setClickedIcons] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image

  const navigate = useNavigate();

  // Fetch data
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
    AOS.init({ duration: 1000 });
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleCards(showMore ? 4 : visibleCards + 4);
  };

  const handleIconClick = (e, card, action) => {
    e.stopPropagation();

    const newClickedIcons = { ...clickedIcons };
    newClickedIcons[card.id] = newClickedIcons[card.id] || {};
    newClickedIcons[card.id][action] = !newClickedIcons[card.id][action];

    setClickedIcons(newClickedIcons);

    if (action === "favorite") {
      addToFavorites(card);

      if (newClickedIcons[card.id][action]) {
        // Yurakni bosilganda Toast xabari
        toast.success(`${card.title} sevimlilarga qo'shildi!`, {
          position: "top-right", // Positionni string orqali yozdik
          autoClose: 2000, // 2 seconds
        });
      }
    } else if (action === "cart") {
      addToCart(card);
      toast.success(`${card.title} savatchaga qo'shildi!`, {
        position: "top-right", // Positionni string orqali yozdik
        autoClose: 2000, // 2 seconds
      });
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

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
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
              <div className="card-img-box" onClick={() => openModal(card.image)}>
                <img src={card.image} alt={card.title} className="card-img" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{truncateText(card.description, 7)}</p>
                <div className="card-price">
                  <span className="sale-price">${card.price}</span>
                </div>
                <div className="card-actions">
                  <div 
                    className={`like-button ${clickedIcons[card.id]?.favorite ? 'liked' : ''}`} 
                    onClick={(e) => handleIconClick(e, card, 'favorite')}
                  >
                    <IoIosHeartEmpty />
                  </div>
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

      {/* ToastContainer har doim sahifada bo'lishi kerak */}
      <ToastContainer />

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default MainPage;
