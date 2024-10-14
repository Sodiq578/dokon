import React from "react";
import "./ImageModal.css"; // Import the CSS for modal styling

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={image} alt="Product" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;
