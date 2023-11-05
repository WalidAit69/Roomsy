import React, { useContext, useEffect } from 'react';
import { MyContext } from '../App';
import Image_info_slider from '../components/BecomeHost Components/Image_info_slider';
import Host_Info from '../components/BecomeHost Components/Host_Info';
import Host_form from '../components/BecomeHost Components/Host_form';
import RegisterWidget from '../widgets/Home widgets/RegisterWidget';



function BecomeHost() {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  const images = [
    "https://ucarecdn.com/ad4efd40-f7ec-485c-8781-ca6762edf2b6/-/preview/500x500/-/quality/smart/-/format/auto/",
    "https://ucarecdn.com/a7cde4cc-4ed2-4832-af8d-79e5c614ba25/-/preview/500x500/-/quality/smart/-/format/auto/",
    "https://ucarecdn.com/5e8414e3-91f4-4007-9956-71542399840c/-/preview/500x500/-/quality/smart/-/format/auto/",
    "https://ucarecdn.com/dbab0d6d-10a8-474d-a41d-67eff7c24f82/-/preview/500x500/-/quality/smart/-/format/auto/"
  ];
  const { showPopup, setisHomepage } = useContext(MyContext);

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