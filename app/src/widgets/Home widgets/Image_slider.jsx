import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Image_slider.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Reservation_bar from "./Reservation_bar";
import Dots from "../Dots";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MyContext } from "../../App";


function Image_slider({ images }) {

  const {isLoading} = useContext(MyContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    const nextIndex = currentImageIndex - 1;
    setCurrentImageIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
  };


  return (
    <>
      {!isLoading ? <div className="main dim_overlay">

        <img src={images[currentImageIndex]} alt=""/>

        <div className="main_info">
          <h1>The Greatest Outdoors</h1>
          <p>Wishlists Created by Roomsy</p>
          <Link to={"/places"} className="black_btn">Discover</Link>
        </div>
        <Reservation_bar></Reservation_bar>
        <Dots slides={images} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />
        <button className="arrow arrow-left" onClick={handlePrevClick}>
          <MdKeyboardArrowLeft />
        </button>
        <button className="arrow arrow-right" onClick={handleNextClick}>
          <MdKeyboardArrowRight />
        </button>
      </div> : <div className="main"><Skeleton  height={"500px"} /></div>}
    </>
  );
}





export default Image_slider;