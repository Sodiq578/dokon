import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the path if necessary

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products'); // Use the custom Axios instance
        setProducts(response.data);
      } catch (error) {
        console.error('Mahsulotlarni olishda xato:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Mahsulotlar</h1>
      <div className="category-list">
        {products.map(product => (
          <div key={product.id} className="category-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
