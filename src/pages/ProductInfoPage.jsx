import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductInfoPage = () => {
  const { id } = useParams(); // URL dan mahsulot ID sini olish
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.example.com/products/${id}`); // Bu yerda o'z API URL manzilingizni ishlating
        setProduct(response.data);
      } catch (error) {
        console.error('Mahsulot ma\'lumotlarini olishda xato:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductInfoPage;
