import React from 'react';
import './Loader.css'; // Import the CSS file for the loader styles

const Loader = () => {
  return (
    <div className="loader-container">
      <svg id="poly" width="200px" height="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 250 250" style={{ enableBackground: 'new 0 0 250 250' }} xmlSpace="preserve">
        <g id="XMLID_9_">
          <polygon id="XMLID_22_" className="st0 polygon-1" points="194,123.9 160.3,123.4 140.3,92.6 160.3,61.5 194,61.3 214,92.6"/>
          <polygon id="XMLID_21_" className="st0 polygon-2" points="197,186.9 163.3,186.4 143.3,155.6 163.3,124.5 197,124.3 217,155.6"/>
          <polygon id="XMLID_20_" className="st0 polygon-3" points="139,93.9 105.3,93.4 85.3,62.6 105.3,31.5 139,31.3 159,62.6"/>
          <polygon id="XMLID_19_" className="st0 polygon-4" points="142,156.9 108.3,156.4 88.3,125.6 108.3,94.5 142,94.3 162,125.6"/>
          <polygon id="XMLID_18_" className="st0 polygon-5" points="87,125.9 53.3,125.4 33.3,94.6 53.3,63.5 87,63.3 107,94.6"/>
          <polygon id="XMLID_17_" className="st0 polygon-6" points="144,218.9 110.3,218.4 90.3,187.6 110.3,156.5 144,156.3 164,187.6"/>
          <polygon id="XMLID_10_" className="st0 polygon-7" points="89,188.9 55.3,188.4 35.3,157.6 55.3,126.5 89,126.3 109,157.6"/>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
