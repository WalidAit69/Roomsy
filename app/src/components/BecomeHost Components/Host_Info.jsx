import React, { useContext, useState } from "react";
import Info_Widget from "../../widgets/BecomeHost Widgets/Info_Widget";
import "./Host_Info.css";
import InfoCarousel from "../../widgets/BecomeHost Widgets/Info_carousel";
import SupportCarousel from "../../widgets/BecomeHost Widgets/Support_carousel";
import Imagecarousel from "../../widgets/BecomeHost Widgets/Image_carousel";
import AddPlace from "./AddPlace";
import { MyContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Host_Info() {
  const { setIsEdit } = useContext(MyContext);

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

  const items = [
    {
      title:
        "Hosting has enabled me to be my own person, and dictate howI spend my time and what I do.",
      host: "Kelly",
      place: "Host in Los Angeles, CA",
    },
    {
      title: "Item 2",
      host: "This is the second item",
      place: "Host in Los Angeles, CA",
    },
    {
      title: "Item 3",
      host: "This is the third item",
      place: "Host in Los Angeles, CA",
    },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <section className="Host_Info">
        <h1>Your next chapter, made possible by Hosting</h1>

        <div className="Host_Info_div">
          <Info_Widget
            title={"Welcome what's next"}
            description={
              "Enjoy the flexibility of being your own boss, earn extra income, and make lifelong connections through hosting."
            }
            link={"Explore the world of hosting"}
          ></Info_Widget>

          <Info_Widget
            title={"Host with confidence"}
            description={
              "From 24/7 support and our helpful Host community, to custom tools, insights, and education, we're invested in your success."
            }
            link={"How we support Hosts"}
          ></Info_Widget>
        </div>
      </section>

      <section className="Host_Details">
        <div className="Host_Info_img">
          <img src={"https://ucarecdn.com/01df7f4f-165f-49b4-937f-b3c6c792af22/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="img" loading="lazy"/>
          <div className="layer"></div>
          <div className="Host_Details_info">
            <InfoCarousel items={items}></InfoCarousel>
          </div>
        </div>

        <div className="Host_Support">
          <h1>How we support you</h1>
          <SupportCarousel></SupportCarousel>
        </div>

        <div className="Host_img_carousel">
          <h1>How hosting works</h1>
          <Imagecarousel></Imagecarousel>
        </div>
      </section>

      <section className="Host_Banner">
        <AddPlace opened={modelOpen} setOpened={setmodelOpen}></AddPlace>

        <img src={"https://ucarecdn.com/2ac32437-10d3-44d0-9226-c17e754a0260/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="" loading="lazy"/>
        <div className="Host_Banner_info">
          <h1>Start your <br /> hosting journey</h1>
          <p>Let's get your listing set up, together.</p>
          <button onClick={handleAddplaceClick} className="info_container_btn">Get started</button>
        </div>
      </section>
    </>
  );
}

export default Host_Info;
