import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Info_Widget from "./Info_Widget";
import "./Support_carousel.css";

const SupportCarousel = () => {
  const options = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "5rem",
    autoplay: false,
    pagination: true,
    arrows: false,
    drag: true,
    swipeDistanceThreshold: 100,
    breakpoints: {
      800: {
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
    <div className="Support_splide_container">
      <Splide className="Support_splide" options={options}>
        <SplideSlide>
          <Info_Widget
            title={"Host protection programs"}
            description={
              "To support you in the rare event of an incident, most Roomsy bookings include property damage protection and liability insurance of up to $1M USD."
            }
            link={"Explore the world of hosting"}
          ></Info_Widget>
        </SplideSlide>
        <SplideSlide>
          <Info_Widget
            title={"High guest standards"}
            description={
              "To give Hosts peace of mind, we offer guest identification and let you check out reviews of guests before they book. Our new Guest Standards Policy sets higher expectations."
            }
            link={"Steps we take to help Hosts feel confident"}
          ></Info_Widget>
        </SplideSlide>
        <SplideSlide className="last_slide">
          <Info_Widget
            title={"Welcome what's next"}
            description={
              "Enjoy the flexibility of being your own boss, earn extra income, and make lifelong connections through hosting."
            }
            link={"Explore the world of hosting"}
          ></Info_Widget>
        </SplideSlide>
      </Splide>
      <div className="Support_splide_overlay"></div>
    </div>
  );
};

export default SupportCarousel;
