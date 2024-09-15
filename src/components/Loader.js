import React from 'react';
import './Loader.css'; // Import the CSS file for the loader styles

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="bee">
        <div className="body">
          <div className="line"></div>
          <div className="wing-right"></div>
          <div className="wing-left"></div>
        </div>
        <div className="path">
          {Array.from({ length: 12 }).map((_, i) => (
            <div className="pollen" key={i}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
