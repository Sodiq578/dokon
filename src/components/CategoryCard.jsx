import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div>
      <img src={category.image} alt={category.name} />
      <h2>{category.name}</h2>
      <Link to={`/product/${category.id}`}>View Products</Link>
    </div>
  );
};

export default CategoryCard;
