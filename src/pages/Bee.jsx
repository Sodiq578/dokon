import React from 'react';
import './BeeAnimation.css';  // CSS kodni alohida Bee.css faylga joylashtirishingiz mumkin

const Bee = () => {
  return (
    <div className="container">
      <div className="wings front">
        <div className="wing w1"></div>
        <div className="wing w2"></div>
      </div>
      <div className="body">
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="eyes">
          <div className="eye">
            <div className="pupil"></div>
          </div>
          <div className="eye">
            <div className="pupil"></div>
          </div>
        </div>
        <div className="mouth"></div>
      </div>
      <div className="gadd"></div>
    </div>
  );
};

export default Bee;
