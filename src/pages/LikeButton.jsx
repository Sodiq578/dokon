import React from 'react';
import { FaHeart } from 'react-icons/fa';

const LikeButton = ({ isActive, onClick }) => {
  return (
    <button className={`like-button ${isActive ? 'active' : ''}`} onClick={onClick}>
      <FaHeart />
    </button>
  );
};

export default LikeButton;
