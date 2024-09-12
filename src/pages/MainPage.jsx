import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <Link to="/categories">Browse Categories</Link>
    </div>
  );
};

export default MainPage;
