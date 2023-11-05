import React, { useContext, useEffect } from "react";
import Image_slider from "../widgets/Home widgets/Image_slider";
import Categories from "../components/Home Components/categories.jsx";
import Explore from "../components/Home Components/Explore";
import Become_host_Widget from "../widgets/Home widgets/Become_host_Widget";
import RegisterWidget from "../widgets/Home widgets/RegisterWidget";
import { MyContext } from "../App";


const images = [
  "https://ucarecdn.com/8f592115-2f13-4d33-a9c9-329e6f9cb43d/-/preview/1000x1000/-/quality/smart/-/format/auto/",
  "https://ucarecdn.com/9ec94e33-520f-4b61-a91d-32f6e75da850/-/preview/1000x1000/-/quality/smart/-/format/auto/",
  "https://ucarecdn.com/fe7e590a-54c9-4a81-ae94-e562c2458c85/-/preview/1000x1000/-/quality/smart/-/format/auto/",
  "https://ucarecdn.com/738052be-25d1-430e-b7e4-67be3013bb33/-/preview/1000x1000/-/quality/smart/-/format/auto/"
];


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
