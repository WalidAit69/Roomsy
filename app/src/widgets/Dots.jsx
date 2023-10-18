import React from 'react'

const Dots = ({ slides, currentImageIndex , setCurrentImageIndex}) => {
    return (
      <div className="dots">
        {slides.map((slide, index) => (
          <span
            key={index}
            className={index === currentImageIndex ? "dot active" : "dot"}
            onClick={() => setCurrentImageIndex(index)}
          ></span>
        ))}
      </div>
    );
  };
  
export default Dots