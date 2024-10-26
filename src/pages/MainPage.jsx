import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi"; // Savat ikonkasi
import { IoIosHeartEmpty } from "react-icons/io"; // Like ikonkasi
import "./MainPage.css";
import backgroundImage from '../img/backasal.png';
import Loader from "../components/Loader";
import ImageCarousel from "../pages/ImageCarousel";
import Thumbs from "../components/Thumbs";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageModal from "../pages/ImageModal"; // Modal komponentini import qilish
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from '../Layout/Accordion';

const MainPage = ({ addToCart, addToFavorites }) => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const [showMore, setShowMore] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIcons, setClickedIcons] = useState({});
  const [modalOpen, setModalOpen] = useState(false); // Modal holati
  const [selectedImage, setSelectedImage] = useState(""); // Tanlangan rasm

  const navigate = useNavigate();

  // Ma'lumotlarni olish
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setCards(data);
        setCarouselImages(data.map((product) => product.image));
        setLoading(false);
      } catch (error) {
        console.error("Mahsulot ma'lumotlarini olishda xatolik:", error);
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

    // Agar mahsulot allaqachon sevimlilarga qo'shilgan bo'lsa
    if (action === "favorite" && newClickedIcons[card.id][action]) {
      toast.error(`${card.title} allaqachon sevimlilarda!`, {
        position: "top-right",
        autoClose: 2000,
      });
      return; // Ikkinchi marta qo'shilmasin
    }

    // Agar mahsulot allaqachon savatga qo'shilgan bo'lsa
    if (action === "cart" && newClickedIcons[card.id][action]) {
      toast.error(`${card.title} allaqachon savatchada!`, {
        position: "top-right",
        autoClose: 2000,
      });
      return; // Ikkinchi marta qo'shilmasin
    }

    // Mahsulot hali qo'shilmagan bo'lsa, uni qo'shamiz
    newClickedIcons[card.id][action] = true;
    setClickedIcons(newClickedIcons);

    if (action === "favorite") {
      addToFavorites(card);
      toast.success(`${card.title} sevimlilarga qo'shildi!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (action === "cart") {
      addToCart(card);
      toast.success(`${card.title} savatchaga qo'shildi!`, {
        position: "top-right",
        autoClose: 2000,
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
      <div className="main-content container" data-aos="fade-up"> {/* AOS qo'shildi */}
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
                    style={{ fontSize: '30px' }} // Like ikonkasini o'lchami
                  >
                    <IoIosHeartEmpty />
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleIconClick(e, card, 'cart')}
                    style={{ fontSize: '30px' }} // Savat ikonkasini o'lchami
                  >
                    <PiShoppingCartSimple />
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

      <section className="process-section" data-aos="fade-up">
        <div className="text-container">
          <h2 className="process-title">Our Process</h2>
          <p className="process-description">
<<<<<<< HEAD
  Learn more about how we create our honey and our dedication to quality and sustainability. Our video showcases the entire process, from beekeeping to packaging, ensuring you receive the best honey possible. 
  We prioritize organic practices and maintain healthy bee populations, ensuring that our honey not only tastes great but also supports the environment. Watch our journey and discover the passion behind every jar of our honey.
</p>

        </div>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/PdkGSFf8keo?si=TUcqaOAZX5uN9P_t" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </section>

=======
            Learn more about how we create our honey and our dedication to quality and sustainability. Our video showcases the entire process, from beekeeping to packaging, ensuring you receive the best honey possible.
          </p>
        </div>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/PdkGSFf8keo?si=TUcqaOAZX5uN9P_t" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </section>

>>>>>>> 22aa6dacf8b05926782f71211ce29377d338f41d
      <section>
        <Accordion />
      </section>

      <ToastContainer />

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default MainPage;
