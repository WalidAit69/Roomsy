import React, { useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "./Info_carousel.css"

const InfoCarousel = ({ items }) => {
  const splideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY || event.detail || event.wheelDelta;

    if (delta < 0) {
      splideRef.current.go('prev');
    } else if (delta > 0) {
      splideRef.current.go('next');
    }
  };


  const handleSplideMoved = (splide) => {
    setCurrentIndex(splide.index);
  };

  return (
    <div onWheel={handleMouseWheel} className='info_carousel'>
      <Splide
      className='info_splide'
        options={{
          type: 'slide',
          rewind: true,
          perPage: 1,
          arrows: false,
          gap: '1rem',
          padding: {
            left: '1rem',
            right: '1rem',
          },
        }}
        ref={splideRef}
        onMoved={handleSplideMoved}
      >
        {items.map((item, index) => (
          <SplideSlide className='info_splide_slide' key={index}>
            <div>
              <h1>{item.title}</h1>
              <p>{item.host},</p>
              <p>{item.place}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>

    </div>
  );
};

export default InfoCarousel;