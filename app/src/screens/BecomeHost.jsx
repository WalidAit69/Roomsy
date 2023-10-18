import React, { useContext, useEffect } from 'react';
import { MyContext } from '../App';
import Image_info_slider from '../components/BecomeHost Components/Image_info_slider';
import img from "../assets/Host/1.jpg";
import img1 from "../assets/Host/2.jpg";
import img2 from "../assets/Host/3.jpg";
import img3 from "../assets/Host/4.jpg";
import Host_Info from '../components/BecomeHost Components/Host_Info';
import Host_form from '../components/BecomeHost Components/Host_form';
import RegisterWidget from '../widgets/Home widgets/RegisterWidget';



function BecomeHost() {
  
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [])

  const images = [img, img1, img2, img3];
  const { showPopup , setisHomepage } = useContext(MyContext);

  useEffect(() => {
    setisHomepage(false);
  }, [])
  

  return (
    <>
      <Image_info_slider images={images}></Image_info_slider>
      <Host_Info></Host_Info>
      <Host_form></Host_form>
      {showPopup && <RegisterWidget></RegisterWidget>}
    </>
  )
}

export default BecomeHost