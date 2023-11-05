import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Image_carousel.css";


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
          <img src={"https://ucarecdn.com/587ac5d9-6055-41c3-921c-6c84b76214b0/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="Slide 1" loading="lazy"/>
          <h3>Why host on Roomsy?</h3>
          <p>
            Hosts reveal what they love about sharing their space on Roomsy.
          </p>
        </SplideSlide>
        <SplideSlide>
          <img src={"https://ucarecdn.com/80eff90a-457a-4c83-b618-ae3feb9566e3/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="Slide 2" loading="lazy"/>
          <h3>Get started on Roomsy</h3>
          <p>
            From creating your listing to prepping your space, learn how to
            start hosting.
          </p>
        </SplideSlide>
        <SplideSlide>
          <img src={"https://ucarecdn.com/722caac7-4796-4bf7-980d-d917b1566026/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="Slide 3" loading="lazy"/>
          <h3>Earn money on Roomsy</h3>
          <p>Here's what every host needs to know about pricing and payouts</p>
        </SplideSlide>
        <SplideSlide>
          <img src={"https://ucarecdn.com/76ca9ca5-c90c-46b1-a58e-f388048318ad/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="Slide 4" loading="lazy"/>
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
