import React, { useContext, useState } from "react";
import "./Image_info_slider.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Dots from "../../widgets/Dots";
import AddPlace from "./AddPlace";
import { MyContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Image_info_slider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setIsEdit } = useContext(MyContext);


  const handleNextClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    const nextIndex = currentImageIndex - 1;
    setCurrentImageIndex(nextIndex < 0 ? images.length - 1 : nextIndex);
  };

  const [modelOpen, setmodelOpen] = useState(false);

  const id = localStorage.getItem("userID");

  const handleAddplaceClick = () => {
    if (!id) {
      toast.error('Log in first');
    } else {
      setmodelOpen(true);
      setIsEdit(false);
    }
  }

  return (
    <section className="slider_container dim_overlay">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="slider_section">
        <AddPlace opened={modelOpen} setOpened={setmodelOpen}></AddPlace>
        <div className="info_container">
          <h1>A space to share, a world to gain</h1>
          <p>
            hosting can help you turn your extra space into extra income and
            pursue more of what you love
          </p>
          <button onClick={handleAddplaceClick} className="info_container_btn">Get Started</button>

          <div className="info_container_navigation">
            <Dots
              slides={images}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />

            <div className="arrows">
              {" "}
              <button className="arrow" onClick={handlePrevClick}>
                <MdKeyboardArrowLeft />
              </button>
              <button className="arrow" onClick={handleNextClick}>
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="image_container">
          <div className="layer"></div>
          <img src={images[currentImageIndex]} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Image_info_slider;
