import React, { useEffect, useRef, useState } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10); // Dastlab 10 ta mahsulot ko'rinadi
  const [carouselImages, setCarouselImages] = useState([]);
  const [index, setIndex] = useState(0);
  const carouselInnerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Ma'lumotlarni fetch qilish
  useEffect(() => {
    const fetchData = async () => {
      const productData = [
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 1', text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum et quis unde dolorum? Soluta, debitis. At error deleniti assumenda eaque corrupti quam ea, inventore culpa molestiae harum, vero, a alias?", price: "$10.00", salePrice: "$8.00", rating: 4, reviews: 20 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 2', text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", price: "$20.00", salePrice: "$15.00", rating: 5, reviews: 15 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 3', text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.", price: "$30.00", salePrice: "$25.00", rating: 3, reviews: 25 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 4', text: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", price: "$40.00", salePrice: "$35.00", rating: 4, reviews: 18 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 5', text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.", price: "$50.00", salePrice: "$45.00", rating: 5, reviews: 12 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 6', text: "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.", price: "$60.00", salePrice: "$55.00", rating: 4, reviews: 22 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 7', text: "Explicabo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.", price: "$70.00", salePrice: "$65.00", rating: 3, reviews: 30 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 8', text: "Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.", price: "$80.00", salePrice: "$75.00", rating: 5, reviews: 17 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 9', text: "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quod autem ossibus esse cillum dolore eu fugiat nulla pariatur.", price: "$90.00", salePrice: "$85.00", rating: 4, reviews: 14 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 10', text: "Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.", price: "$100.00", salePrice: "$95.00", rating: 5, reviews: 20 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 11', text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.", price: "$110.00", salePrice: "$105.00", rating: 4, reviews: 10 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 12', text: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.", price: "$120.00", salePrice: "$115.00", rating: 3, reviews: 28 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 13', text: "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Quod maxime placeat facere possimus, omnis voluptas assumenda est.", price: "$130.00", salePrice: "$125.00", rating: 5, reviews: 10 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 14', text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.", price: "$140.00", salePrice: "$135.00", rating: 4, reviews: 12 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 15', text: "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.", price: "$150.00", salePrice: "$145.00", rating: 3, reviews: 18 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 16', text: "Explicabo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.", price: "$160.00", salePrice: "$155.00", rating: 4, reviews: 14 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 17', text: "Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.", price: "$170.00", salePrice: "$165.00", rating: 5, reviews: 20 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 18', text: "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quod autem ossibus esse cillum dolore eu fugiat nulla pariatur.", price: "$180.00", salePrice: "$175.00", rating: 4, reviews: 25 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 19', text: "Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.", price: "$190.00", salePrice: "$185.00", rating: 5, reviews: 30 },
        { img: 'https://via.placeholder.com/150', title: 'Mahsulot 20', text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.", price: "$200.00", salePrice: "$195.00", rating: 3, reviews: 35 },
    ];
    

      const carouselData = [
        'https://via.placeholder.com/800x300',
        'https://via.placeholder.com/800x300',
        'https://via.placeholder.com/800x300',
      ];

      setCards(productData);
      setCarouselImages(carouselData);
    };

    fetchData();
  }, []);

  const showMoreCards = () => {
    setVisibleCards(visibleCards + 10); // Yana 10 ta card ko'rsatish
  };

  const showSlide = (n) => {
    if (n >= carouselImages.length) setIndex(0);
    else if (n < 0) setIndex(carouselImages.length - 1);
    else setIndex(n);

    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => showSlide(index + 1), 3000);
    return () => clearInterval(interval);
  }, [index]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      showSlide(index + 1); // O'ngga siljitish
    } else if (deltaX < -50) {
      showSlide(index - 1); // Chapga siljitish
    }
  };
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return `${words.slice(0, limit).join(' ')}...`;
  };
  

  return (

    
    <div className="main-page">
      <div className="container">
      <div className="carousel">
          <div className="carousel-inner" ref={carouselInnerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {carouselImages.map((image, i) => (
              <div className="carousel-item" key={i}>
                <img src={image} alt={`Carousel ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <span key={i} className={`carousel-indicator ${i === index ? 'active' : ''}`} onClick={() => showSlide(i)}></span>
            ))}
          </div>
        </div>
        <div className="cards-container">
  {cards.slice(0, visibleCards).map((card, index) => (
    <div className="card" key={index}>
      <img src={card.img} alt={card.title} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className='card-text'>{truncateText(card.text, 7)}</p>
        <div className="card-price">
          <span className="sale-price">{card.salePrice}</span>
          <span className="original-price">{card.price}</span>
        </div>
        <div className="card-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < card.rating ? 'filled' : ''}`}>★</span>
          ))}
          <span className="reviews">({card.reviews} ta sharh)</span>
        </div>
      </div>
    </div>
  ))}
</div>

        {visibleCards < cards.length && (
          <button className="load-more" onClick={showMoreCards}>Yana ko'proq ko'rsatish</button>
        )}
        <div className="carousel">
          <div className="carousel-inner" ref={carouselInnerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {carouselImages.map((image, i) => (
              <div className="carousel-item" key={i}>
                <img src={image} alt={`Carousel ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselImages.map((_, i) => (
              <span key={i} className={`carousel-indicator ${i === index ? 'active' : ''}`} onClick={() => showSlide(i)}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
