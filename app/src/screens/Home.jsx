import React, { useContext, useEffect } from "react";
import Image_slider from "../widgets/Home widgets/Image_slider";
import img from "../assets/main.jpg";
import img1 from "../assets/main4.jpg";
import img2 from "../assets/main2.jpg";
import img3 from "../assets/main3.jpg";
import Categories from "../components/Home Components/categories.jsx";
import Explore from "../components/Home Components/Explore";
import Become_host_Widget from "../widgets/Home widgets/Become_host_Widget";
import RegisterWidget from "../widgets/Home widgets/RegisterWidget";
import { MyContext } from "../App";


const images = [img3, img2, img, img1];


function Home() {

  const { showPopup, setisHomepage } = useContext(MyContext);

  useEffect(() => {
    setisHomepage(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      <Image_slider images={images}></Image_slider>
      <Categories></Categories>
      <Explore></Explore>
      <Become_host_Widget></Become_host_Widget>
      {showPopup && <RegisterWidget></RegisterWidget>}
    </>
  );
}

export default Home;
