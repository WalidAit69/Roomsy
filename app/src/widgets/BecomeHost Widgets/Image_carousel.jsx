import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Image_carousel.css";
import img1 from "../../assets/become_host/1.png";
import img2 from "../../assets/become_host/2.png";
import img3 from "../../assets/become_host/3.png";
import img4 from "../../assets/become_host/4.png";

const Imagecarousel = () => {

  const options = {
    type: "loop",
    arrows: false,
    perPage: 4,
    perMove:1,
    gap: "0rem",
    speed: 500,
    autoplay: true,
    pauseOnHover: true,
    pagination:false,
    breakpoints: {
      1450: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1.5,
      },
      390: {
        perPage: 1.2,
      },
    },
  };

  return (
    <div className="carousel-container">
      <Splide className="image-carousel" options={options}>
        <SplideSlide>
          <img src={img1} alt="Slide 1" />
          <h3>Why host on Roomsy?</h3>
          <p>
            Hosts reveal what they love about sharing their space on Roomsy.
          </p>
        </SplideSlide>
        <SplideSlide>
          <img src={img2} alt="Slide 2" />
          <h3>Get started on Roomsy</h3>
          <p>
            From creating your listing to prepping your space, learn how to
            start hosting.
          </p>
        </SplideSlide>
        <SplideSlide>
          <img src={img3} alt="Slide 3" />
          <h3>Earn money on Roomsy</h3>
          <p>Here's what every host needs to know about pricing and payouts</p>
        </SplideSlide>
        <SplideSlide>
          <img src={img4} alt="Slide 4" />
          <h3>Is my space a good fit?</h3>
          <p>
            There's a perfect guest for every space the key is setting guest
            expectations.
          </p>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Imagecarousel;
